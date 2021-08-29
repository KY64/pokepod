import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import PokemonCard from "@/components/PokemonCard";

import usePokemonDetail from "@/lib/hooks/PokemonDetail";

import { DBNAME, DBVERSION } from "@/config";

import type { ColorProps, DOMEvent } from "@/config";

type PokemonList = {
  dreamworld: string;
  name: string;
};

interface PropTypes {
  isWild?: boolean;
  list: PokemonList[];
  update: any;
}

const PokemonList = (props: ColorProps & PropTypes) => {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const idb = window.indexedDB.open(DBNAME, DBVERSION);
    idb.onerror = (event: DOMEvent) => {
      console.error("Failed to initDB", event.target.error);
    };
    idb.onsuccess = (event: DOMEvent) => {
      const db = event.target.result;
      let transaction = db.transaction("pokemon", "readwrite");
      transaction.onerror = (event: DOMEvent) => {
        console.error("Error transaction", event.target);
      };
      let store = transaction.objectStore("pokemon");
      store.getAll().onsuccess = (event: DOMEvent) => {
        const pokemon = event.target.result;
        props.update(pokemon);
      };
    };
  }, [update]);

  let query_detail = { query: "" };

  props.list.forEach((value: any) => {
    query_detail.query += `
      ${value.name}: pokemon(name: "${value.name}") {
        abilities {
          ability {
            name
          }
        }
        height
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
        weight
      }
      `;
  });

  const { data, error, loading } = usePokemonDetail(query_detail);

  if (loading) return <Box>"Loading..."</Box>;
  if (error) return <Box>Error! {error.message}</Box>;

  return (
    <>
      {props.list.map((val: any, index: number) => {
        let pokemon_data = {
          id: props.isWild ? index : val.id,
          ...data[val.name]
        };
        return (
          <PokemonCard
            color={props.color}
            data={pokemon_data}
            image={val.dreamworld}
            isWild={props.isWild}
            key={`${val.name}-${index}`}
            name={val.name}
            state={update}
            update={setUpdate}
          />
        );
      })}
    </>
  );
};

export default PokemonList;
