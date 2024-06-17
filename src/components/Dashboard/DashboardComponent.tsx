import React from "react";
import CustomCard from "../base/CustomCards/CustomCard";
import DashboardLayout from "../Layout/DashboardLayout";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
    text: "Actions",
  },
];

const tableBodyData = [
  {
    id: 1,
    budgetName: "Subscribe for mobile data",
    category: "INTERNET",
    amount: 5000,
  },
  {
    id: 2,
    budgetName: "Subscribe for DSTV",
    category: "ENTERTAINMENT",
    amount: 10000,
  },
  {
    id: 3,
    budgetName: "Travel to Ghana",
    category: "VACATION",
    amount: 200000,
  },
];

const DashboardComponent = () => {
  return (
    <DashboardLayout>
      <div className="flex gap-5 items-center mt-10 flex-wrap">
        <CustomCard title="Balance" amount={5000} />
        <CustomCard title="Monthly Limit" amount={5000} />
        <CustomCard title="Spent" amount={5000} />
      </div>

      <section className="mt-8">
        <table className="w-full border">
          <thead className="border">
            <tr className="rounded-sm text-left bg-[#ebe5ef]">
              {tableHeaderData.map((item) => {
                return (
                  <th key={item.id} className="p-2 text-[16px] font-normal ">
                    {item.text}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="">
            {tableBodyData.map((item) => {
              return (
                <tr key={item.id} className="border">
                  <td className="py-[12px] px-2">{item.budgetName}</td>
                  <td className="py-[12px] px-2">{item.category}</td>
                  <td className="py-[12px] px-2">
                    {" "}
                    &#8358;{item.amount.toLocaleString()}
                  </td>
                  <td>
                    <CiEdit
                      size={25}
                      className="inline-block mr-3 cursor-pointer"
                    />
                    <MdOutlineDeleteOutline
                      size={25}
                      className="inline-block cursor-pointer text-[#eb4646]"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
};

export default DashboardComponent;
