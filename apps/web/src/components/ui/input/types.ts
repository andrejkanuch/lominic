import { ReactElement, ReactNode } from 'react'
import { Accept } from 'react-dropzone'
import { VariantProps } from 'class-variance-authority'
import { inputWrapperVariants } from './variants'

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  VariantProps<typeof inputWrapperVariants> & {
    rightAddon?: ReactNode
    icon?: ReactNode
    clearable?: boolean
    errorMessage?: string
    required?: boolean
    helperText?: string | React.ReactNode
  }

export type InputWithLabelProps = InputProps & {
  label: string
  tooltip?: { title?: string; text: string }
  tag?: string
}

export type FileUploadInputProps = InputWithLabelProps & {
  defaultFiles?: Array<{ name: string; url: string; mimeType: string }>
  onFilesSelected?: (files: File[]) => void
  onFilesClear?: () => void
  acceptFiles?: Accept
  isMultiple?: boolean
  isInvalid?: boolean
  isLoading?: boolean
  rightButton?: ReactNode
  rightAddon?: ReactNode
}

export type FileUploadInputWithDescriptionProps = FileUploadInputProps & {
  description: string | ReactElement
}
