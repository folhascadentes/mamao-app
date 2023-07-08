import React, { useEffect, useState } from "react";

function Profile(): JSX.Element {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
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
        setProfile(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-6 xl:p-6 flex justify-center xl:text-lg font-normal">
      <div style={{ width: "720px" }}>
        <h1 className="text-3xl xl:text-4xl mb-6 md:mb-10 text-center ">Perfil</h1>
        <div className="flex flex-col">
          <p>Usuário: {profile?.sub}</p>
          <p>Sinalizações: {profile?.signs}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
