import * as React from 'react'
import { Label } from '../label'
import { Input } from './input'
import { InputWithLabelProps } from './types'

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, tooltip, required, tag, ...props }, ref) => {
    const inputId = React.useId()

    return (
      <>
        <Label
          className="font-medium"
          required={required}
          htmlFor={inputId}
          tooltip={tooltip}
          tag={tag}
        >
          {label}
        </Label>

        <Input ref={ref} {...props} />
      </>
    )
  },
)
InputWithLabel.displayName = 'InputWithLabel'

export { InputWithLabel }
