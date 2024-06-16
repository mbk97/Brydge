"use client";
import { ImSpinner9 } from "react-icons/im";

interface IBtnProps {
  text: string;
  type?: "button" | "reset" | "submit"; // Make type prop more restrictive
  className?: string;
  handleClick?: () => void;
  Icon?: any;
  disabled?: boolean;
  iconStyle?: string;
  isLoading?: boolean;
  pageBtn?: string;
}

const CustomButton = ({
  text,
  type = "submit",
  className,
  handleClick,
  Icon,
  disabled,
  iconStyle,
  isLoading,
  pageBtn,
}: IBtnProps) => {
  return (
    <button
      type={type}
      className={` text-white ${className} cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 ${
        isLoading ? "cursor-not-allowed bg-primary" : "bg-primary"
      }`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {isLoading && pageBtn !== "login" && (
        <ImSpinner9 className="animate-spin" />
      )}
      {isLoading && pageBtn === "login" ? (
        <div className="flex gap-2 items-center">
          <ImSpinner9 className="animate-spin" />
          <span>Logging you in</span>
        </div>
      ) : (
        <>
          {!isLoading && Icon && <Icon size={20} className={`${iconStyle} `} />}
          <span className={`${isLoading ? "hidden" : "block"}`}>{text}</span>
        </>
      )}
    </button>
  );
};

export default CustomButton;
