'use client'

import { FieldValues, useForm } from 'react-hook-form'

import useUploadModal from '@/hooks/useUploadModal'

import Modal from './Modal'

const UploadModal = () => {
  const uploadModal = useUploadModal()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  })

  const onChange = (open: boolean) => {
    // TODO: Reset the form
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  return (
    <Modal
      title="Add a song"
      description="Upload and mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      Form
    </Modal>
  )
}

export default UploadModal
