import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={twMerge(
          `w-full rounded-full border border-transparent bg-green-500 px-3 py-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
