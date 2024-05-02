"use client"

import TextareaAutosize from "react-textarea-autosize"

type InputTitleProps = {
  title?: string
  placeholder?: string
  name: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const InputTitle: React.FunctionComponent<InputTitleProps> = ({
  placeholder = "",
  name,
  onChange,
  onBlur,
  ...props
}: InputTitleProps) => {
  return (
    <div className="w-full">
      <TextareaAutosize
        {...props}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="text-stale-700 h-16 w-full rounded-md border border-none border-gray-300 bg-white px-3 py-2 text-4xl font-bold"
      />
    </div>
  )
}

export default InputTitle
