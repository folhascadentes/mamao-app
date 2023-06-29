import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";

function ConfirmSignUp(): JSX.Element {
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

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setError(
        error.response?.data?.message ||
          "Houve um problema ao tentar confirmar seu registro, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">
          Confirmar cadastro!{" "}
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
            {loading ? <Spinner /> : "Confirmar Registro"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmSignUp;
