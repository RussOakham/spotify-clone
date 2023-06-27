'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
// eslint-disable-next-line import/no-extraneous-dependencies
import { DevTool } from '@hookform/devtools'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import uniqid from 'uniqid'

import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import Button from '../Button/Button'
import Input from '../Form/Input'

import Modal from './Modal'

interface SongFormValues {
  title: string
  author: string
  image?: FileList
  song?: FileList
}

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const { control, register, handleSubmit, reset } = useForm<SongFormValues>({
    defaultValues: {
      author: '',
      title: '',
      song: undefined,
      image: undefined,
    },
    mode: 'onChange',
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<SongFormValues> = async (values) => {
    try {
      setIsLoading(true)

      if (!values.image || !values.song) {
        toast.error('Please select a song and an image')
        return
      }

      const imageFile: File = values.image?.[0]
      const songFile: File = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error('Please select a song and an image')
        return
      }
      const uniqueID = uniqid()

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        toast.error('Failed to upload song')
        return
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

      if (imageError) {
        toast.error('Failed to upload image')
        return
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        })

      if (supabaseError) {
        toast.error(supabaseError.message)
        return
      }

      router.refresh()
      toast.success('Song created successfully')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload and mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
      <DevTool control={control} />
    </Modal>
  )
}

export default UploadModal
