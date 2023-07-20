import React, { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";

function Profile(): JSX.Element {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACK_END_API}/profile`,
          {
            headers: {
              Authorization: localStorage.getItem("token") ?? "",
            },
          }
        );
        const data = await response.json();

        if (data.statusCode === 403) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setProfile(data);

          if (data.signs > 1000) {
            localStorage.setItem("batchSecond", "true");
          }
        }
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 xl:p-6 flex flex-col justify-center xl:text-lg font-normal mb-10">
      <div className="flex flex-wrap md:space-x-24 justify-center">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl xl:text-4xl mb-4">Meu Perfil</h1>
          <label className="font-black">identificador</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.sub}
          </Skeleton>
          <label className="font-black">E-mail</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.email}
          </Skeleton>
          <label className="font-black">Etinia</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.ethnicity}
          </Skeleton>
          <label className="font-black">Deficiência</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.deficiency}
          </Skeleton>
          <label className="font-black">Idade</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.age} anos
          </Skeleton>
          <label className="font-black">Altura</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.height} cm
          </Skeleton>
          <label className="font-black">Peso</label>
          <Skeleton height="24px" rounded={"md"} isLoaded={!isLoading}>
            {profile?.weight} Kg
          </Skeleton>
        </div>
        <div className="flex flex-col space-y-4 mb-6 w-100 md:w-1/3">
          <label className="text-lime-500 text-3xl md:text-6xl font-bold">
            Minhas sinalizações
          </label>
          <Skeleton
            height="128px"
            rounded={"md"}
            isLoaded={!isLoading}
            className="text-6xl md:text-9xl text-orange-500 font-black"
          >
            {(profile?.signs ?? "0")?.toLocaleString("en-DE")}
          </Skeleton>
          <h2 className="text-xl font-black">Gerenciar conta</h2>
          <button
            className="disabled:bg-opacity-80 bg-red-500 hover:bg-red-600 text-white py-3 xl:py-4 px-6 text-lg xl:text-xl rounded-xl"
            disabled={true}
          >
            Apagar dados
          </button>
          <p className="text-sm w-86">
            Caso deseje você tem todo o direito de apagar seus dados sempre
            quiser e mudar de ideia. Respeitamos sua decisão e queremos que se
            sinta o mais confortável possível.
          </p>
          <p className="text-sm w-86 font-bold">
            No beta fechado ainda não é possível apagar seus dados pela
            plataforma. Caso deseje entre em contato com
            renantashiro@hotmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
