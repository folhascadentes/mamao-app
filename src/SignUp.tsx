import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import {
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Select,
} from "@chakra-ui/react";
import moon from "./assets/moon.png";

export function SignUp(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [deficiency, setDeficiency] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/sign-up`,
        {
          email,
          password,
          age,
          gender,
          ethnicity,
          deficiency,
          weight,
          height,
        }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Houve um problema ao tentar se registrar, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col justify-center space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "512px" }}
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">
          Bem vindo!{" "}
          <span className="text-orange-400 md:font-light">Novo Voluntário</span>
        </h1>
        <div>
          <form className="flex flex-col space-y-4" onSubmit={handleSignUp}>
            <FormControl id="email">
              <FormLabel>E-mail *</FormLabel>
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
              <FormLabel>Senha *</FormLabel>
              <Input
                placeholder="senha"
                type={"password"}
                size="lg"
                focusBorderColor="orange.200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirmar Senha *</FormLabel>
              <Input
                placeholder="confirmar senha"
                type={"password"}
                size="lg"
                focusBorderColor="orange.200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <div>
              <MdInfoOutline size={24} className="inline mr-2" />
              Estamos coletando as informações a seguir para garantir a criação
              de um conjunto de dados diversificado para o reconhecimento de
              linguagem de sinais, garantindo que o tradutor não exclua ninguém.
              Elas são opcionais caso deseje, porém são de grande ajuda se
              aceitar preencher, se quiser saber mais acesse acesse{" "}
              <a
                className="hover:text-indigo-600 text-indigo-500 font-bold"
                href="/database-diversity-importance"
              >
                porque a diversidade de dados é importante
              </a>
              .
            </div>
            <FormControl id="age">
              <FormLabel>Idade</FormLabel>
              <Input
                placeholder="idade em anos"
                type={"number"}
                size="lg"
                focusBorderColor="orange.200"
                value={age}
                min={2}
                max={150}
                onChange={(e) => setAge(e.target.value)}
              />
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gênero</FormLabel>
              <Select
                placeholder="Selecione seu gênero biológico"
                size="lg"
                value={gender}
                focusBorderColor="orange.200"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </Select>
            </FormControl>
            <FormControl id="ethnicity">
              <FormLabel>Etnia</FormLabel>
              <Select
                placeholder="Selecione sua etnia"
                size="lg"
                focusBorderColor="orange.200"
                value={ethnicity}
                onChange={(e) => setEthnicity(e.target.value)}
              >
                <option value="pardo">Pardo</option>
                <option value="branco">Branco</option>
                <option value="negro">Negro</option>
                <option value="indigena">Indígena</option>
                <option value="amarelo">Amarelo</option>
              </Select>
            </FormControl>
            <FormControl id="weight">
              <FormLabel>Peso</FormLabel>
              <Input
                placeholder="peso em (Kg)"
                type={"number"}
                size="lg"
                focusBorderColor="orange.200"
                min={1}
                max={200}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </FormControl>
            <FormControl id="height">
              <FormLabel>Altura</FormLabel>
              <Input
                placeholder="altura em (cm)"
                type={"number"}
                size="lg"
                focusBorderColor="orange.200"
                min={1}
                max={300}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </FormControl>
            <FormControl id="deficiency">
              <FormLabel>
                Deficiência{" "}
                <span className="text-sm">
                  (Essa informação pode ser utilizada para personalizar o uso da
                  plataforma para suas necessidades)
                </span>
              </FormLabel>
              <Select
                placeholder="Selecione a deficiência"
                size="lg"
                focusBorderColor="orange.200"
                value={deficiency}
                onChange={(e) => setDeficiency(e.target.value)}
              >
                <option value="none">Nenhuma</option>
                <option value="blind">Cego</option>
                <option value="deaf">Surdo</option>
                <option value="cognition">Cognição</option>
                <option value="paralyzed">
                  Paralisado parcial ou total dos membros
                </option>
              </Select>
            </FormControl>
            {error && <p className="text-red-500">{error}</p>}
            <p className="text-sm font-bold">
              Ao realizar o cadastro e usar a plataforma você aceita nosso termo
              de privacidade acessível no rodapé ou pelo atalho [P].
            </p>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg w-full py-3.5 rounded-xl"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Registrar"}{" "}
              <span className="text-base">[E]</span>
            </button>
          </form>
        </div>
        <div className="text-center pt-4">
          Já possui cadastro?{" "}
          <button
            className="cursor-pointer hover:text-indigo-600 text-indigo-500 font-bold"
            onClick={() => navigate("/login")}
          >
            Entrar [U]
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <img src={moon} style={{ height: "460px" }} alt="" />
      </div>
    </div>
  );
}

export default SignUp;