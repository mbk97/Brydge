import React from "react";

type IProps = {
  title: string;
  amount: number;
};

const CustomCard = ({ title, amount }: IProps) => {
  return (
    <div className="h-[100px] w-[100%] lg:w-[250px] bg-white shadow-md border rounded-sm p-3">
      <h2 className="text-[1.5rem] text-[#7c4be6] font-semibold">{title}</h2>
      <p className="text-[1rem] font-semibold">
        &#8358; {amount.toLocaleString()}
      </p>
    </div>
  );
};

export default CustomCard;
