"use client";

import TextareaAutosize from "react-textarea-autosize";

type InputTitleProps = {
  title?: string;
  placeholder?: string;
};

const InputTitle: React.FunctionComponent<InputTitleProps> = ({
  title = "",
  placeholder = "",
}) => {
  return (
    <div className="w-full">
      <TextareaAutosize
        autoFocus
        value={title}
        placeholder={placeholder}
        className="w-full h-16 px-3 py-2 text-4xl font-bold text-gray-700 border-none placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
};

export default InputTitle;
