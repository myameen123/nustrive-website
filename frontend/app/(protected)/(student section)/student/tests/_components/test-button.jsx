import { Save } from "lucide-react";
import Image from "next/image";
import React from "react";

function TestButton({ text, Icon, onClick, disable }) {
  return (
    <button
      className="border p-[2px] rounded-[10px] shadow-lg w-16 h-16"
      onClick={onClick}
      disabled={disable}
    >
      <span
        className={`flex flex-col h-full  justify-center items-center py-1 px-2  text-white rounded-[10px] text-xs shadow-xl text-wrap ${
          disable ? " bg-gray-500" : "bg-[#4975EA]"
        }`}
      >
        <Icon
          size={20}
          className={`${text == "Prev" ? "transform rotate-180" : ""}`}
        />
        {/* <Save size={20} /> */}
        {text}
      </span>
    </button>
  );
}

export default TestButton;
