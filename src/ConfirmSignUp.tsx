import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import { Input, SL } from "./components";
import sun from "./assets/sun.webp";
import { HotkeyContext } from "./reducers/hotkeys.reducer";
import { MdInfoOutline } from "react-icons/md";

function ConfirmSignUp(): JSX.Element {
  const hotkeyContext = useContext(HotkeyContext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/confirm-sign-up`,
        {
          email,
          code,
        }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      setError("Verifique se o código de confirmação está correto.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hotkeyContext.dispatch({
      type: "SET_HOTKEY",
      payload: {
        U: (e) => handleConfirm(e),
      },
    });

    return () => {
      hotkeyContext.dispatch({
        type: "UNSET_HOTKEY",
        delete: ["U"],
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
          Confirme seu cadastro
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
              bg="gray.200"
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
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-sm font-bold">
            Foi enviado um código de confirmação no e-mail cadastrado. Caso não
            recebeu aguarde um momento e verifique a caixa de Spam.
          </p>
          <div className="text-sm font-bold">
            <MdInfoOutline size={24} className="mb-2" />
            Olá, agradecemos o seu interesse em participar do nosso projeto.
            Atualmente estamos em fase beta fechado de testes, caso queria
            continuar a verificação do seu cadastro será feita manualmente,
            entre em contato no e-mail renantashiro@hotmail.com para solicitar o
            seu acesso.
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl disabled:opacity-80"
            disabled={loading || !code}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                Confirmar <SL bg="indigo-800">U</SL>
              </>
            )}
          </button>
        </form>
      </div>
      <div className="hidden md:flex">
        <img src={sun} style={{ height: "460px" }} alt="" />
      </div>
    </div>
  );
}

export default ConfirmSignUp;
