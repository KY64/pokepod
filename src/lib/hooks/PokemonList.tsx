import { gql, useQuery } from "@apollo/client";

const usePokemonList = (limit: number, offset: number) => {
  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        results {
          name
          dreamworld
        }
      }
    }
  `;

  const variables = {
    limit,
    offset
  };

  return useQuery(GET_POKEMONS, {
    variables
  });
};

export default usePokemonList;
