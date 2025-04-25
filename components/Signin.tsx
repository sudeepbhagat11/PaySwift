"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function Signin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const router = useRouter();

  const handleSignin = async () => {

    try {

      const res = await signIn("credentials", {
        email,
        number,
        password,
        redirect: false,
      });

      if (res?.error) {
        alert("Failed to log in : " + res.error);
        console.log("Error login: ",res.error);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      alert("Signin failed: " + err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="block w-[30%] h-[100%] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <div className="px-10">
            <div className="text-5xl font-extrabold text-center">Sign In</div>
          </div>
          <div className="pt-5">
            <LabelledInput
              label="email"
              placeholder="sudeep@gmail.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <LabelledInput
              label="Number"
              type="number"
              placeholder="Mobile Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button
              onClick={handleSignin}
              type="button"
              className="mt-10 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-4 me-2 mb-2"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  value,
  onChange,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-lg text-black font-semibold pt-5">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

 