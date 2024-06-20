"use client";
import React, { useEffect, useState } from "react";
import CustomCard from "../base/CustomCards/CustomCard";
import DashboardLayout from "../Layout/DashboardLayout";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@mui/material";
import { ImSpinner } from "react-icons/im";
import { useStore } from "@/store/strore";
import CustomModal from "../base/CustomModal/CustomModal";
import CreateBudget from "../CreateBudget/CreateBudget";
import { toast } from "react-toastify";
import withAuth from "../ProtectedRoute/Protected";

const tableHeaderData = [
  {
    id: 1,
    text: "Budget Name",
  },
  {
    id: 2,
    text: "Budget Category",
  },
  {
    id: 3,
    text: "Budget Amount",
  },
  {
    id: 4,
    text: "Month",
  },
  {
    id: 5,
    text: "Actions",
  },
];

const DashboardComponent = ({ user }: any) => {
  const supabase = createClient();
  const [deleteId, setDeleteId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteloading, setDeleteLoading] = useState<boolean>(false);
  const [expenseData, setExpense] = useState<any>([]);
  const { openModal, setOpenModal, setUpdateData, setStartUpdate } = useStore();
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdateData({});
  };

  const handleSetUpdateData = (item: any) => {
    setUpdateData(item);
    setOpenModal(true);
    setStartUpdate(true);
  };
  const userId = user?.id;
  const handleDelete = async (id: string) => {
    setDeleteId(id);
    setDeleteLoading(true);
    try {
      const { error, data, status } = await supabase
        .from("expense")
        .delete()
        .eq("id", id);
      if (status == 204) {
        fetchData();
        setDeleteLoading(false);
        toast.success("Successful", {
          style: {
            background: "green",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      let { data: expense, error } = await supabase
        .from("expense")
        .select()
        .eq("user_id", userId);
      setExpense(expense);
      console.log(error);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lastUpdateMonthlyLimit =
    expenseData && expenseData[expenseData?.length - 1];
  const totalSpent = expenseData
    ?.filter(
      (expense: any) =>
        expense?.budgetAmount !== undefined && expense?.budgetAmount !== null,
    )
    .map((expense: any) => Number(expense.budgetAmount));

  const totalSpentValue =
    totalSpent?.length !== 0
      ? totalSpent?.reduce((a: number, b: number) => a + b)
      : [];

  const balanceValue =
    Number(lastUpdateMonthlyLimit?.monthLimit) - totalSpentValue;

  const isNegative =
    totalSpentValue > Number(lastUpdateMonthlyLimit?.monthLimit);
  return (
    <DashboardLayout user={user}>
      <div>
        <div className="flex gap-5 items-center mt-10 flex-wrap">
          <CustomCard
            title="Balance"
            amount={balanceValue}
            isNegative={isNegative}
          />
          <CustomCard
            title="Monthly Limit"
            amount={lastUpdateMonthlyLimit?.monthLimit}
          />
          <CustomCard title="Spent" amount={totalSpentValue} />
        </div>
        {loading ? (
          <Skeleton animation="wave" height={200} width={"100%"} />
        ) : (
          <>
            {expenseData && expenseData.length > 0 ? (
              <section className="mt-8  overflow-x-auto">
                <table className="w-full border ">
                  <thead className="border">
                    <tr className="rounded-sm text-left bg-[#ebe5ef]">
                      {tableHeaderData.map((item) => (
                        <th
                          key={item.id}
                          className="p-2 text-[16px] font-normal whitespace-nowrap"
                        >
                          {item.text}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((expense: any) => (
                      <tr key={expense.id} className="border">
                        <td className="py-[12px] px-2">{expense.budgetName}</td>
                        <td className="py-[12px] px-2">
                          {expense.budgetCategory}
                        </td>
                        <td className="py-[12px] px-2">
                          &#8358;
                          {Number(expense.budgetAmount)?.toLocaleString()}
                        </td>
                        <td className="py-[12px] px-2">{expense.month}</td>
                        <td>
                          <CiEdit
                            size={25}
                            className="inline-block mr-3 cursor-pointer"
                            onClick={() => handleSetUpdateData(expense)}
                          />
                          {expense.id === deleteId ? (
                            <ImSpinner
                              size={25}
                              className="animate-spin inline-block mr-3 cursor-pointer text-[#eb4646]"
                            />
                          ) : (
                            <MdOutlineDeleteOutline
                              size={25}
                              className="inline-block cursor-pointer text-[#eb4646]"
                              onClick={() => handleDelete(expense.id)}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ) : (
              <p className="text-[1.4rem] my-10">
                You have no Budget Created at the moment
              </p>
            )}
          </>
        )}

        <CustomModal open={openModal} handleClose={handleCloseModal}>
          <CreateBudget
            userDetails={user}
            fetchData={fetchData}
            monthLimit={lastUpdateMonthlyLimit?.monthLimit}
          />
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardComponent);
