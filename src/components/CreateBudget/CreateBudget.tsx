import React, { useState } from "react";
import InputComponent from "../base/CustomInput/CustomInput";
import { getMonth } from "@/util/getMonth";
import { createClient } from "@/utils/supabase/client";
import { useStore } from "@/store/strore";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

type IProps = {
  fetchData: () => void;
  userDetails: any;
  monthLimit: string;
};

const CreateBudget = ({
  userDetails,
  fetchData,
  monthLimit: defaultMonthLimitValue,
}: IProps) => {
  const {
    updateData,
    setOpenModal,
    setUpdateData,
    startUpdate,
    setStartUpdate,
  } = useStore();
  const [inputData, setInputData] = useState({
    month: startUpdate ? updateData.month : "",
    monthLimit: startUpdate ? updateData.monthLimit : defaultMonthLimitValue,
    budgetName: startUpdate ? updateData.budgetName : "",
    budgetAmount: startUpdate ? updateData.budgetAmount : "",
    budgetCategory: startUpdate ? updateData.budgetCategory : "",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate);
  const supabase = createClient();

  console.log(defaultMonthLimitValue);

  const { monthLimit, budgetName, budgetAmount, budgetCategory } = inputData;

  const postData = async () => {
    if (!monthLimit || !budgetName || !budgetAmount || !budgetCategory) {
      toast.error("Please fill all the fields", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    try {
      setCreateLoading(true);
      const { data, error, status } = await supabase
        .from("expense")
        .insert([
          {
            user_id: userDetails?.id,
            month: currentMonth,
            monthLimit: inputData.monthLimit,
            budgetName: inputData.budgetName,
            budgetAmount: inputData.budgetAmount,
            budgetCategory: inputData.budgetCategory,
          },
        ])
        .select();
      if (status === 201) {
        fetchData();
        setOpenModal(false);
        setCreateLoading(false);
        toast.success("Successful", {
          style: {
            background: "green",
            color: "white",
          },
        });
      }
      console.log(error);
    } catch (error) {
      console.log(error);
    } finally {
      setCreateLoading(false);
    }
  };
  const handleUpdateData = async () => {
    if (!monthLimit || !budgetName || !budgetAmount || !budgetCategory) {
      toast.error("Please fill all the fields", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return;
    }
    try {
      setUpdateLoading(true);
      const { data, error, status } = await supabase
        .from("expense")
        .update({
          user_id: userDetails?.id,
          month: currentMonth,
          monthLimit: inputData.monthLimit,
          budgetName: inputData.budgetName,
          budgetAmount: inputData.budgetAmount,
          budgetCategory: inputData.budgetCategory,
        })
        .eq("id", updateData?.id)
        .select();
      if (status === 200) {
        setUpdateData({});
        setStartUpdate(false);
        fetchData();
        setOpenModal(false);
        setUpdateLoading(false);
        toast.success("Successful", {
          style: {
            background: "green",
            color: "white",
          },
        });
      }
      console.log(error);
    } catch (error) {
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[1.4rem] font-semibold text-[#7c4be6]">
          {startUpdate ? "Update budget" : "Create a budget"}
        </h1>
        <MdClose
          size={25}
          className="text-[#ea6464] cursor-pointer"
          onClick={() => setOpenModal(false)}
        />
      </div>
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
        {defaultMonthLimitValue && (
          <p className="text-[#e47979] text-[12px]">
            Your last monthly limit value was{" "}
            {defaultMonthLimitValue?.toLocaleString()}, you can change this if
            you wish
          </p>
        )}
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
        {startUpdate ? (
          <button
            type={"submit"}
            disabled={updateLoading}
            onClick={handleUpdateData}
            className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 `}
          >
            {updateLoading ? "Updating..." : "Update"}
          </button>
        ) : (
          <button
            type={"submit"}
            onClick={postData}
            disabled={createLoading}
            className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 `}
          >
            {createLoading ? "Creating..." : "Create"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBudget;
