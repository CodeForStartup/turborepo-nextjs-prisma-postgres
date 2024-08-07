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
        className="h-16 w-full scroll-m-20 rounded-md border border-none bg-transparent py-2 text-4xl font-extrabold tracking-tight focus-visible:ring-ring focus-visible:ring-offset-2 focus:focus-visible:outline-none lg:text-5xl"
      />
    </div>
  )
}

export default InputTitle
