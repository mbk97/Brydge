import React from "react";

type IProps = {
  title: string;
  amount: number;
  isNegative?: boolean;
};

const CustomCard = ({ title, amount, isNegative }: IProps) => {
  return (
    <div className="h-[100px] w-[100%] lg:w-[250px] bg-white shadow-md border rounded-sm p-3">
      <h2 className="text-[1.5rem]{ text-[#7c4be6]} font-semibold">{title}</h2>
      <p
        className={`text-[1rem] font-semibold ${
          title === "Spent"
            ? "text-[#e6624b]"
            : title === "Balance"
            ? isNegative
              ? "text-[#e6624b]"
              : "text-[#4be68e]"
            : "text-[#7c4be6]"
        }`}
      >
        &#8358; {amount ? Number(amount)?.toLocaleString() : "0"}
      </p>
    </div>
  );
};

export default CustomCard;
