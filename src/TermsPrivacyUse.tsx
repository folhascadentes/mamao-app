import React from "react";
import TermsContent from "./modals/terms-content";

function TermsPrivacyUse(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center space-x-8 xl:space-x-16 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col mx-6 md:mx-0 space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "560px" }}
      >
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Termos de Privacidade e Uso
        </h1>
        <TermsContent />{" "}
      </div>
    </div>
  );
}

export default TermsPrivacyUse;
