import React, { useState } from "react";
import InputComponent from "../base/CustomInput/CustomInput";
import { getMonth } from "@/util/getMonth";

const CreateBudget = () => {
  const [inputData, setInputData] = useState({
    month: "",
    monthLimit: "",
    budgetName: "",
    budgetAmount: "",
    budgetCategory: "",
  });
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate);
  console.log(currentMonth);
  return (
    <div>
      <h1 className="text-[1.4rem] font-semibold text-[#7c4be6]">
        Create a budget
      </h1>
      <div className="mt-3">
        <InputComponent
          value={currentMonth}
          disabled
          name="month"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData((prevData) => ({
              ...prevData,
              month: e.target.value,
            }));
          }}
          type="text"
          label="Month"
          placeholder="Enter month"
        />
      </div>
      <div className="mt-3">
        <InputComponent
          value={inputData.monthLimit}
          name="monthLimit"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData((prevData) => ({
              ...prevData,
              monthLimit: e.target.value,
            }));
          }}
          type="text"
          label="Monthly Limit"
          placeholder="Enter monthly limit"
        />
      </div>
      <div className="mt-3">
        <InputComponent
          value={inputData.budgetName}
          name="budgetName"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData((prevData) => ({
              ...prevData,
              budgetName: e.target.value,
            }));
          }}
          type="text"
          label="Budget Name"
          placeholder="Enter budget name"
        />
      </div>
      <div className="mt-3">
        <InputComponent
          value={inputData.budgetAmount}
          name="budgetAmount"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData((prevData) => ({
              ...prevData,
              budgetAmount: e.target.value,
            }));
          }}
          type="number"
          label="Budget amount"
          placeholder="Enter budget amount"
        />
      </div>
      <div className="mt-3">
        <InputComponent
          value={inputData.budgetCategory}
          name="budgetCategory"
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputData((prevData) => ({
              ...prevData,
              budgetCategory: e.target.value,
            }));
          }}
          type="text"
          label="Budget Category"
          placeholder="Enter budget category"
        />
      </div>
      <div className="mt-11">
        <button
          type={"submit"}
          className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 `}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBudget;
