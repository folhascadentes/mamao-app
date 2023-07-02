import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import { Input, SL } from "./components";
import world from "./assets/world.webp";
import { HotkeyContext } from "./reducers/hotkeys.reducer";

export function SignIn(): JSX.Element {
  const hotkeyContext = useContext(HotkeyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    setLoading(true);
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
      setError("Nome de usuário ou senha incorreto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        E: (e) => handleLogin(e),
        U: (e) => {
          e?.preventDefault();
          navigate("/sign-up");
        },
        R: (e) => {
          e?.preventDefault();
          navigate("/forget-password");
        },
      },
    });

    return () => {
      hotkeyContext.dispatch({
        type: "UNSET_HOTKEY",
        delete: ["E", "U", "R"],
      });
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-8 xl:mt-16">
      <div
        className="flex flex-col mx-6 md:mx-0 justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "612px" }}
      >
        <h1 className="text-3xl md:text-6xl font-black mb-2">
          Bem vindo!{" "}
          <span className="text-orange-400 md:font-light">Voluntário</span>
        </h1>
        <div>
          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input
                placeholder="e-mail"
                type={"email"}
                size="lg"
                focusBorderColor="orange.200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input
                placeholder="senha"
                type={"password"}
                size="lg"
                focusBorderColor="orange.200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <p className="text-red-500">{error}</p>}
            {/* eslint-disable-next-line */}
            <a
              className="cursor-pointer text-left hover:text-indigo-600 text-indigo-500 font-bold"
              onClick={() => navigate("/forget-password")}
            >
              Recuperar senha <SL>R</SL>
            </a>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl disabled:opacity-80"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  Entrar <SL>E</SL>
                </>
              )}
            </button>
          </form>
        </div>
        <div className="text-center pt-4">
          Não possui cadastro? {/* eslint-disable-next-line */}
          <a
            className="cursor-pointer hover:text-indigo-600 text-indigo-500 font-bold"
            onClick={() => navigate("/sign-up")}
          >
            Realizar cadastro <SL>U</SL>
          </a>
        </div>
      </div>
      <div className="hidden md:flex justify-center -m-16 z-50">
        <img src={world} style={{ height: "397px" }} alt="" />
      </div>
    </div>
  );
}

export default SignIn;
