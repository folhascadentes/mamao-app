import React from "react";

function DatabaseDiversityImportance(): JSX.Element {
  return (
    <div className="flex flex-wrap justify-center space-x-24 mt-8 xl:mt-16 mb-24">
      <div
        className="flex flex-col space-y-4"
        style={{ width: window.innerWidth <= 500 ? "auto" : "720px" }}
      >
        <h1 className="text-3xl md:text-4xl font-black mb-2">
          Por que Precisamos de Diferentes Tipos de Dados para Fazer um Bom
          Tradutor de Língua de Sinais
        </h1>
        <p>
          Estamos criando uma ferramenta para traduzir a língua de sinais. Para
          isso, precisamos de muitas imagens e informações para ensinar nosso
          programa a fazer isso direito. Assim como você precisa aprender com
          livros diferentes para entender bem um assunto, nosso programa também
          precisa de muitas informações diferentes para aprender.
        </p>
        <h2 className="text-xl md:text-2xl font-black mb-2">
          Por que precisamos de diferentes tipos de dados?
        </h2>
        <ol className="list-decimal text-left ml-4 mt-4 mb-10">
          <li>
            <span className="font-bold">Sinais diferentes</span>: As pessoas fazem os sinais de
            maneira um pouco diferente. Como se fossem sotaques diferentes na
            fala. Por isso, nosso programa precisa ver muitos tipos de sinais
            para aprender direito.
          </li>
          <li>
            <span className="font-bold">Pessoas diferentes</span>: Pessoas de todas as idades, de
            todos os gêneros, de diferentes tamanhos e formas, e de todas as
            cores de pele usam a língua de sinais. Queremos que nosso programa
            aprenda com todas essas pessoas para entender todas que usam língua
            de sinais.
          </li>
          <li>
            <span className="font-bold">Para todos</span>: Queremos que nosso tradutor possa ajudar
            todos que usam língua de sinais. Por isso, é importante que ele
            aprenda com todos os tipos de pessoas.
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
      </div>
    </div>
  );
}

export default DatabaseDiversityImportance;
