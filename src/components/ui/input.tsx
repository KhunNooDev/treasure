import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className='relative flex items-center'>
        {startIcon && <span className='absolute left-3'>{startIcon}</span>}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-10' : '',
            endIcon ? 'pr-10' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <span className='absolute right-3'>{endIcon}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
