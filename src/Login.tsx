import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Spinner } from "@chakra-ui/react";
import world from "./assets/world.png";

export function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/sign-in`,
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        localStorage.setItem(
          "token",
          response.data.AuthenticationResult.AccessToken
        );
        navigate("/instructions");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Usuário ou senha incorretos, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-24">
      <div
        className="flex flex-col justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">
          Bem vindo!{" "}
          <span className="text-orange-400 md:font-light">Voluntário</span>
        </h1>
        <label>E-mail</label>
        <Input
          placeholder="e-mail"
          type={"email"}
          size="lg"
          focusBorderColor="orange.200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha</label>
        <Input
          placeholder="senha"
          type={"password"}
          size="lg"
          focusBorderColor="orange.200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="text-right cursor-pointer hover:text-indigo-600 text-indigo-500 font-bold"
          onClick={() => navigate("/recover-password")}
        >
          Recuperar senha [R]
        </button>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Entrar"}{" "}
          <span className="text-base">[E]</span>
        </button>
        <div className="text-center pt-4">
          Não possui cadastro?{" "}
          <button
            className="cursor-pointer hover:text-indigo-600 text-indigo-500 font-bold"
            onClick={() => navigate("/register")}
          >
            Realizar cadastro [U]
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-16 z-50">
        <img src={world} style={{ height: "360px" }} alt="" />
      </div>
    </div>
  );
}

export default Login;
