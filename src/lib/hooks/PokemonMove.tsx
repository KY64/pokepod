import { gql, useQuery } from "@apollo/client";

interface Query {
  query: string;
}

const usePokemonMove = (name: string | Query) => {
  let query = gql`
      query move {
        move(move: "${name}") {
          response
        }
      }
  `;

  if (typeof name === "object") {
    query = gql`
     query move {
       ${name.query}
     }
   `;
  }

  return useQuery(query);
};

export default usePokemonMove;
