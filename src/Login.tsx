import { Input } from "@chakra-ui/react";
import world from "./assets/world.png";
import React from "react";

export function Login(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center space-x-16 mt-24">
      <div
        className="flex flex-col justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">
          Bem vindo!{" "}
          <span className="text-orange-500 md:font-light">Voluntário</span>
        </h1>
        <label>E-mail</label>
        <Input
          placeholder="e-mail"
          type={"email"}
          size="lg"
          focusBorderColor="orange.200"
        />
        <label>Senha</label>
        <Input
          placeholder="senha"
          type={"password"}
          size="lg"
          focusBorderColor="orange.200"
        />
        <a className="text-right cursor-pointer text-indigo-500 font-bold">
          Recuperar senha [R]
        </a>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl"
        >
          Entrar <span className="text-base">[E]</span>
        </button>
        <div className="text-gray-800 text-center pt-4">
          Não possui cadastro?{" "}
          <a className="cursor-pointer text-indigo-500 font-bold">
            Realizar cadastro [U]
          </a>
        </div>
      </div>
      <div className="flex justify-center pt-16 z-50">
        <img src={world} style={{ height: "350px" }} alt="" />
      </div>
    </div>
  );
}

export default Login;
