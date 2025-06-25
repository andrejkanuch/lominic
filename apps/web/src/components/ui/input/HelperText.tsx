import React from 'react'

interface HelperTextProps {
  helperText: string | React.ReactNode
}

export const HelperText = ({ helperText }: HelperTextProps) => {
  if (React.isValidElement(helperText)) {
    return helperText
  }
  return <p className="text-xs text-slate-400">{helperText}</p>
}
