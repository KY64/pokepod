import React, { useState } from "react";

import Image from "next/image";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWildPokemon,
    onClose: onCloseWildPokemon,
    onOpen: onOpenWildPokemon
  } = useDisclosure();
  const { data, error, loading } = usePokemonDetail(query_detail);
  const [pokemon, setPokemon] = useState<Pokemon>({
    data: {},
    image: "",
    name: ""
  });

  const insertPokemon = (pokemon) => {
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
      store.add({ id: crypto.randomUUID(), pokemon });
      console.log("storing", pokemon);
    };
  };

  if (loading) return <Box>"Loading..."</Box>;
  if (error) return <Box>Error! {error.message}</Box>;

  return (
    <>
      {props.list.map((val: any, index: number) => (
        <Box key={`${index}-${val.name}`}>
          <Container
            boxShadow="0 0 2px rgba(0 0 0 / 40%)"
            centerContent
            padding={4}
          >
            <Image
              alt={`${val.name} image`}
              height={100}
              src={val.dreamworld}
              width={100}
            />
            <Heading
              as="h5"
              color={props.color.text.secondary}
              fontSize="md"
              marginY={3}
              textTransform="capitalize"
            >
              {val.name}
            </Heading>
            {props.isWild ? (
              <>
                <Button
                  _hover={{
                    background: props.color.background,
                    textDecoration: "underline"
                  }}
                  background={props.color.contrast.inverted}
                  border="1.5px solid"
                  borderColor={props.color.contrast.color}
                  color={props.color.contrast.color}
                  marginBottom={2}
                  onClick={() => {
                    onOpenWildPokemon();
                    setPokemon({
                      data: data[val.name],
                      image: val.dreamworld,
                      name: val.name
                    });
                  }}
                  padding={1}
                  size="sm"
                  variant="link"
                >
                  View Details
                </Button>
                <Button
                  _hover={{ background: props.color.contrast.hover }}
                  background={props.color.contrast.color}
                  color={props.color.contrast.inverted}
                  onClick={() => insertPokemon(val)}
                  size="sm"
                >
                  Catch pokemon
                </Button>
              </>
            ) : (
              <Button
                _hover={{ background: props.color.contrast.hover }}
                background={props.color.contrast.color}
                color={props.color.contrast.inverted}
                onClick={() => {
                  onOpen();
                  setPokemon({
                    data: data[val.name],
                    image: val.dreamworld,
                    name: val.name
                  });
                }}
                size="sm"
              >
                View details
              </Button>
            )}
          </Container>
        </Box>
      ))}

      {/* My Pokemon Modal */}
      <PokemonDetail
        color={props.color}
        isOpen={isOpen}
        onClose={onClose}
        pokemon={pokemon}
      />

      {/* Wild Pokemon Modal */}
      <PokemonDetail
        color={props.color}
        isOpen={isOpenWildPokemon}
        isWild
        onClose={onCloseWildPokemon}
        pokemon={pokemon}
      />
    </>
  );
};

export default PokemonList;
