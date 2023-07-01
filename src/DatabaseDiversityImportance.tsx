import React from "react";
import diversity from "./assets/diversity.webp";

function DatabaseDiversityImportance(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center space-x-8 xl:space-x-16 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col mx-6 md:mx-0 space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "560px" }}
      >
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Por que precisamos de diferentes tipos de dados para fazer um bom
          tradutor de <span className="text-orange-400">Língua de Sinais</span>
        </h1>
        <p>
          Estamos criando coletivamente uma ferramenta para traduzir a língua de
          sinais. Para isso, precisamos de muitas imagens e informações para
          ensinar nosso programa a fazer isso direito. Assim como você precisa
          aprender com livros diferentes para entender bem um assunto, nosso
          programa também precisa de muitas informações diferentes para
          aprender.
        </p>
        <h2 className="text-xl md:text-2xl font-black mb-2">
          Por que precisamos de diferentes tipos de dados?
        </h2>
        <ol className="list-decimal text-left ml-4 mt-4 mb-10">
          <li>
            <span className="font-bold">Sinais diferentes</span>: As pessoas
            fazem os sinais de maneira um pouco diferente. Como se fossem
            sotaques diferentes na fala. Por isso, nosso programa precisa ver
            muitos tipos de sinais para aprender direito.
          </li>
          <li>
            <span className="font-bold">Pessoas diferentes</span>: Pessoas de
            todas as idades, de todos os gêneros, de diferentes tamanhos e
            formas, e de todas as cores de pele usam a língua de sinais.
            Queremos que nosso programa aprenda com todas essas pessoas para
            entender todas que usam língua de sinais.
          </li>
          <li>
            <span className="font-bold">Para todos</span>: Queremos que nosso
            tradutor possa ajudar todos que usam língua de sinais. Por isso, é
            importante que ele aprenda com todos os tipos de pessoas.
          </li>
        </ol>
        <h2 className="text-xl md:text-2xl font-black mb-2">
          Por que estamos pedindo informações sobre você?
        </h2>
        <p>
          Pedimos algumas informações sobre você, como sua idade, seu gênero,
          seu peso, altura e cor da pele. Isso nos ajuda a garantir que nosso
          programa aprenda com todos os tipos de pessoas. Mas, se você não
          quiser compartilhar essas informações, tudo bem. É sua escolha.
        </p>
        <h2 className="text-xl md:text-2xl font-black mb-2">
          Seus dados estão seguros
        </h2>
        <p>
          Nós cuidamos muito bem dos seus dados. Só usamos as informações para
          fazer nosso tradutor de língua de sinais melhor. Prometemos proteger
          suas informações e manter seguras.
        </p>
        <p>
          Resumindo, quanto mais diferentes tipos de dados tivermos, melhor
          nosso tradutor de língua de sinais será. Se você quiser, pode nos
          ajudar dando algumas informações sobre você. Isso nos ajudará a fazer
          um tradutor que pode ajudar todas as pessoas.
        </p>
        <h2 className="text-xl md:text-2xl font-black mb-2">
          Uso de suas informações
        </h2>
        <p>
          Usaremos as informações que você compartilhar conosco para mapear e
          garantir que nossa base de dados de vídeos represente a diversidade de
          pessoas que usam a língua de sinais. Cada sinal na língua de sinais
          pode ser apresentado de forma ligeiramente diferente por diferentes
          pessoas. Portanto, é importante que tenhamos uma variedade de exemplos
          de cada sinal realizados por pessoas com diferentes características.
        </p>
        <p>
          Além disso, iremos disponibilizar nossos dados publicamente e de forma
          gratuita para que qualquer pessoa possa contribuir para a criação de
          tradutores de língua de sinais. Para proteger a sua privacidade,
          forneceremos os dados de três formas:
        </p>
        <ol className="list-decimal text-left ml-4 mt-4 mb-10">
          <li>
            <span className="font-bold">
              Marcos de estimativa de pose dos vídeos coletados
            </span>
            : Esses são pontos marcados em uma imagem que representam partes
            específicas do corpo, como os cotovelos ou os joelhos. Isso permite
            que as pessoas estudem os sinais sem ver o vídeo completo.
          </li>
          <li>
            <span className="font-bold">
              Vídeos coletados com o rosto ofuscado
            </span>
            : Nesses vídeos, ocultaremos o rosto para proteger sua identidade.
            Isso permite que as pessoas vejam como os sinais são feitos sem
            saber quem está fazendo os sinais.
          </li>
          <li>
            <span className="font-bold">Vídeos sem nenhum tipo de filtro</span>:
            Estes são os vídeos completos, que mostram o sinal completo sem
            ocultar nada. Esses vídeos oferecem a imagem mais clara de como os
            sinais são feitos, mas também são os que mais mostram sobre a pessoa
            que está fazendo o sinal.
          </li>
        </ol>
        <p>
          Cada tipo de dados oferece um nível diferente de privacidade e
          anonimato. No entanto, não podemos garantir que todos que usam esses
          dados terão a mesma seriedade que nós sobre a proteção da sua
          privacidade. Por isso, exigiremos que todas as pessoas que baixem os
          dados assinem um acordo prometendo usar os dados de forma adequada.
        </p>
        <p>
          Além disso, manteremos uma lista de todas as pessoas que baixaram os
          dados e para que pretendem usá-los. Isso ajuda a garantir
          transparência e permite que todos saibam quem está usando os dados e
          para quê.
        </p>
        <p>
          Em resumo, suas informações nos ajudarão a criar um tradutor de língua
          de sinais que seja útil para todas as pessoas. E nos comprometemos a
          proteger sua privacidade enquanto fazemos isso.
        </p>
      </div>
      <div className="hidden md:flex">
        <img src={diversity} style={{ height: "567px" }} alt="" />
      </div>
    </div>
  );
}

export default DatabaseDiversityImportance;
