import React from 'react'

interface ErrorMessageProps {
  errorMessage: string
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => (
  <div className="mt-[4px] h-5">
    <p className="text-xs text-rose-800">{errorMessage}</p>
  </div>
)
