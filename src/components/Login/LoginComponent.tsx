"use client";
import React, { useState } from "react";
import { login } from "@/app/login/action";
import "./style.css";
import InputComponent from "../base/CustomInput/CustomInput";
import Link from "next/link";

const LoginComponent = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const disable = !inputData.email || !inputData.password;

  return (
    <div className="flex h-screen">
      <div className="bg-img-component w-[50%] p-10 lg:flex hidden"></div>
      <div className="flex justify-center items-center flex-col lg:w-[50%] w-[100%] p-10">
        <div className="text-center w-[100%] mb-10">
          <h1 className="text-[#7c4be6] mb-3 text-[2rem]">Brydge</h1>
          <p className="text">Welcome back!</p>
        </div>
        <form className="w-[100%]">
          <div className="w-[100%] mb-7">
            <InputComponent
              value={inputData.email}
              name="email"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }));
              }}
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
          <div className="w-[100%]">
            <InputComponent
              value={inputData.password}
              name="password"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }));
              }}
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
          </div>
          <div className="w-[100%] mt-7">
            <button
              formAction={login}
              disabled={disable}
              type={"submit"}
              className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 `}
              style={{
                opacity: disable ? 0.5 : 1,
                cursor: disable ? "not-allowed" : "pointer",
              }}
            >
              Login
            </button>
          </div>
        </form>

        <div className="w-[100%] mt-5 flex justify-end">
          <p>
            Don't have an account ?{" "}
            <Link href={"/signup"} className=" text-[#7c4be6]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
