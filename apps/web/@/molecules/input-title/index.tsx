"use client";

import TextareaAutosize from "react-textarea-autosize";

type InputTitleProps = {
  title?: string;
  placeholder?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const InputTitle: React.FunctionComponent<InputTitleProps> = ({
  placeholder = "",
  name,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <div className="w-full">
      <TextareaAutosize
        {...props}
        autoFocus
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full h-16 px-3 py-2 text-4xl font-bold text-gray-700 border-none placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
};

export default InputTitle;
