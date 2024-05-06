"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col px-6 py-16 lg:px-8 flex flex-col md:items-center md:justify-center h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm md:mb-[50px] mb-[42px]">
        <Image
          className="mx-auto h-10 w-auto md:mb-[105px] mb-[85px]"
          src="/logo.svg"
          alt="Simplestate Logo"
          width={214}
          height={31}
        />
        <h2 className="text-center md:text-xl text-lg font-bold text-primary">
          Iniciar sesión
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[454px]">
        <div className="space-y-7">
          <Input
            id="email"
            type="email"
            required={true}
            label="Correo electrónico"
            onChange={handleChangeEmail}
          />

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-normal leading-3 text-black"
              >
                Contraseña
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className={`block w-full rounded-md h-[40px] border-[1px] py-1.5 text-black border-grey-500 px-6 text-sm font-normal ${
                  showPassword ? "" : "tracking-[6px]"
                }`}
                onChange={handleChangePassword}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Image src="/hidden.svg" alt="eye" width={18} height={18} />
                ) : (
                  <Image src="/show.svg" alt="eye" width={18} height={18} />
                )}{" "}
              </div>
            </div>
            <div className="mt-[10px] text-xs font-semibold">
              <a href="#" className="underline decoration-solid">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div className="md:pt-[72px] pt-[50px] flex md:justify-center justify-start">
            <Button
              label="Ingresar"
              onClick={handleSubmit}
              type={disabled ? "disabled" : "primary"}
            />
          </div>
        </div>

        <p className="md:mt-[36px] mt-[60px] text-center text-xs ">
          ¿Ya tienes cuenta?{" "}
          <a href="#" className="font-semibold underline decoration-solid">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}
