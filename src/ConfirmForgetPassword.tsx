import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import { Input } from "./components";
import jupyter from "./assets/jupyter.png";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import { SL } from "./components";

function ConfirmForgetPassword(): JSX.Element {
  const hotkeyContext = useContext(HotkeyContext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleConfirm = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não correspondem.");
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/confirm-forget-password`,
        {
          email,
          code,
          newPassword: password,
        }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message?.join?.("\n") ||
          "Houve um problema ao tentar confirmar a recuperação da sua senha, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        R: (e) => handleConfirm(e),
      },
    });

    return () => {
      hotkeyContext.dispatch({
        type: "UNSET_HOTKEY",
        delete: ["R"],
      });
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col mx-6 md:mx-0 justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-3xl md:text-6xl font-black mb-2">
          Confirme a recuperação de senha
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleConfirm}>
          <FormControl id="email">
            <FormLabel>E-mail *</FormLabel>
            <Input
              type={"email"}
              size="lg"
              focusBorderColor="orange.200"
              value={email}
              readOnly
            />
          </FormControl>
          <FormControl id="code">
            <FormLabel>Código de Confirmação *</FormLabel>
            <Input
              autoFocus
              placeholder="Código de confirmação"
              type={"text"}
              size="lg"
              focusBorderColor="orange.200"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Nova Senha *</FormLabel>
            <Input
              placeholder="Nova senha"
              type={"password"}
              size="lg"
              focusBorderColor="orange.200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirmar Nova Senha *</FormLabel>
            <Input
              placeholder="Confirmar nova senha"
              type={"password"}
              size="lg"
              focusBorderColor="orange.200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-sm font-bold">
            Foi enviado um código de confirmação no e-mail cadastrado. Caso não
            recebeu aguarde um momento e verifique a caixa de Spam.
          </p>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                Confirmar <SL>R</SL>
              </>
            )}
          </button>
        </form>
      </div>
      <div className="hidden md:flex">
        <img src={jupyter} style={{ height: "460px" }} alt="" />
      </div>
    </div>
  );
}

export default ConfirmForgetPassword;
