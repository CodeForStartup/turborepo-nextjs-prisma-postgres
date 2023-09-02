"use client";

import TextareaAutosize from "react-textarea-autosize";

const InputTitle = () => {
  return (
    <div className="w-full">
      <TextareaAutosize
        autoFocus
        placeholder="Post Title"
        className="w-full h-16 px-3 py-2 text-6xl font-bold text-gray-700 border-none placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none"
      />
    </div>
  );
};

export default InputTitle;
