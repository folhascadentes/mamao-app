import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
import pluto from "./assets/pluto.png";
import { HotkeyContext } from "./reducers/hotkeys.reducer";

function ForgetPassword(): JSX.Element {
  const hotkeyContext = useContext(HotkeyContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgetPassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/forget-password`,
        {
          email,
        }
      );

      if (response.status === 201) {
        navigate("/confirm-forget-password?email=" + email);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message?.join?.("\n") ||
          "Não foi possível recuperar sua senha, verifique o e-mail indicado e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        E: () => navigate("/sign-in"),
        R: (e) => handleForgetPassword(e),
      },
    });

    return () => {
      hotkeyContext.dispatch({
        type: "UNSET_HOTKEY",
        delete: ["E", "R"],
      });
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">
          Recuperar minha senha{" "}
        </h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleForgetPassword}
        >
          <FormControl id="email">
            <FormLabel>E-mail *</FormLabel>
            <Input
              autoFocus
              type={"email"}
              size="lg"
              focusBorderColor="orange.200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Recuperar [R]"}
          </button>
        </form>
        <div className="text-center pt-4">
          Lembrou sua senha?{" "}
          <button
            className="cursor-pointer hover:text-indigo-600 text-indigo-500 font-bold"
            onClick={() => navigate("/sign-in")}
          >
            Entrar [E]
          </button>
        </div>
      </div>
      <div>
        <img src={pluto} style={{ height: "460px" }} alt="" />
      </div>
    </div>
  );
}

export default ForgetPassword;
