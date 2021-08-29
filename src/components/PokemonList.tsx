import React, { useEffect, useState } from "react";

import Image from "next/image";
import PokemonCard from "@/components/PokemonCard";
import PokemonDetail from "@/components/PokemonDetail";
import {
  Box,
  Button,
  Container,
  Heading,
  useDisclosure
} from "@chakra-ui/react";

import usePokemonDetail from "@/lib/hooks/PokemonDetail";

import { DBNAME, DBVERSION } from "@/config";

import type { ColorProps, Pokemon } from "@/config";

type PokemonList = {
  dreamworld: string;
  name: string;
};

interface PropTypes {
  isWild?: boolean;
  list: PokemonList[];
}

const PokemonList = (props: ColorProps & PropTypes) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const idb = window.indexedDB.open(DBNAME, DBVERSION);
    idb.onerror = (event) => {
      console.error("Failed to initDB", event.target.error);
    };
    idb.onsuccess = (event) => {
      const db = event.target.result;
      let transaction = db.transaction("pokemon", "readwrite");
      transaction.oncomplete = () => {
        console.log("Transaction done!");
      };
      transaction.onerror = (event) => {
        console.error("Error transaction", event.target);
      };
      let store = transaction.objectStore("pokemon");
      store.getAll().onsuccess = (event) => {
        const pokemon = event.target.result;
        pokemon.length !== pokemonList.length ? setPokemonList(pokemon) : {};
      };
    };
    console.log("pokemon list", pokemonList);
  }, [pokemonList]);

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

  return props.isWild ? (
    props.list.map((val: any, index: number) => (
      <PokemonCard
        color={props.color}
        data={data[val.name]}
        image={val.dreamworld}
        isWild
        key={`${val.name}-${index}`}
        name={val.name}
        state={update}
        update={setPokemonList}
      />
    ))
  ) : pokemonList.length > 0 ? (
    pokemonList.map((val: any, index: number) => (
      <PokemonCard
        color={props.color}
        data={data[val.name]}
        image={val.image}
        key={`${val.name}-${index}`}
        name={val.name}
      />
    ))
  ) : (
    <Box> nothing </Box>
  );
};

export default PokemonList;
