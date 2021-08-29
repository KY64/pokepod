import { gql, useQuery } from "@apollo/client";

interface Query {
  query: string;
}

const usePokemonDetail = (name: string | Query) => {
  let query = gql`
      query pokemon {
        pokemon(name: "${name}") {
          name
          types {
            type {
              name
            }
          }
        }
      }
  `;

  if (typeof name === "object") {
    query = gql`
     query pokemon {
       ${name.query}
     }
   `;
  }

  return useQuery(query);
};

export default usePokemonDetail;
