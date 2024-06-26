"use client";
import React, { useState } from "react";
import InputComponent from "../base/CustomInput/CustomInput";
import "./style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";

const SignUpComponent = () => {
  const [inputData, setInputData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const disable = !inputData.email || !inputData.password || loading;
  const router = useRouter();
  const supabase = createClient();
  const { email, password } = inputData;

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error("Please ensure you have an account", {
          style: {
            background: "red",
            color: "#ffffff",
          },
        });
        setLoading(false);
        return;
      } else {
        toast.success("Successful", {
          style: {
            background: "#31ef31",
            color: "#ffffff",
          },
        });
        router.push("/dashboard");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-img-component w-[50%] p-10 lg:flex hidden"></div>
      <div className="flex justify-center items-center flex-col lg:w-[50%] w-[100%] p-10">
        <div className="text-center w-[100%] mb-10">
          <h1 className="text-[#7c4be6] mb-3 text-[2rem]">Brydge</h1>
          <p className="text">Sign up now!</p>
        </div>
        <form
          className="w-[100%]"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
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
              type={"submit"}
              disabled={disable}
              className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[100%] font-semibold flex justify-center items-center gap-3 `}
              style={{
                opacity: disable ? 0.5 : 1,
                cursor: disable ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>
        <div className="w-[100%] mt-5 flex justify-end">
          <p>
            Already have an account ?{" "}
            <Link href={"/"} className=" text-[#7c4be6]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
