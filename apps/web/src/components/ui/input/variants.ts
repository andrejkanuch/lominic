import { cva } from 'class-variance-authority'

export const inputWrapperVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: 'h-[37px] text-sm',
      md: 'h-[42px] text-sm',
      lg: 'h-[50px] text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
