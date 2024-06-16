"use client";
import React, { ChangeEvent, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

interface IInputProps {
  type: string;
  placeholder?: string;
  value: string;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  labelStyle?: string;
}

const InputComponent = ({
  type,
  placeholder,
  value,
  name,
  handleChange,
  label,
  className,
  labelStyle,
  disabled,
}: IInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="relative">
      <label htmlFor={name} className={`mb-3 ${labelStyle} block`}>
        {label}
      </label>
      <input
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        onChange={handleChange}
        datatype=""
        className={`${className} w-[100%]  border-[#D1D5DB] rounded-[8px] outline-[#7c4be6] py-[14px] px-[20px] border ${
          disabled ? "cursor-not-allowed bg-[#F9FAFB]" : "bg-[#f9fafb]"
        }`}
      />
      {type === "password" && (
        <div
          className="absolute right-7 cursor-pointer bottom-10 top-12"
          onClick={togglePasswordVisibility}
        >
          <>
            {showPassword ? (
              <FaRegEyeSlash size={25} />
            ) : (
              <IoEyeOutline size={25} />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default InputComponent;
