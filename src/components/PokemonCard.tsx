import React, { useState } from "react";

import Image from "next/image";
import PokemonDetail from "@/components/PokemonDetail";
import { Button, Container, Heading, useDisclosure } from "@chakra-ui/react";

import { DBNAME, DBVERSION } from "@/config";

import type { ColorProps, Pokemon } from "@/config";

interface PropTypes {
  data: any;
  name: string;
  image: string;
  isWild?: boolean;
}

const PokemonList = (props: ColorProps & PropTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWildPokemon,
    onClose: onCloseWildPokemon,
    onOpen: onOpenWildPokemon
  } = useDisclosure();
  const [pokemon, setPokemon] = useState<Pokemon>({
    data: {},
    image: "",
    name: ""
  });

  const insertPokemon = (new_pokemon) => {
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
      store.add({ id: crypto.randomUUID(), ...new_pokemon });
      store.getAll().onsuccess = (event) => {
        props.update(event.target.result);
        console.log("updated pokemon", event.target.result);
        console.log("state", props.state);
      }
    };
  };

  return (
    <>
      <Container
        boxShadow="0 0 2px rgba(0 0 0 / 40%)"
        centerContent
        padding={4}
      >
        <Image
          alt={`${props.name} image`}
          height={100}
          src={props.image}
          width={100}
        />
        <Heading
          as="h5"
          color={props.color.text.secondary}
          fontSize="md"
          marginY={3}
          textTransform="capitalize"
        >
          {props.name}
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
                  data: props.data,
                  image: props.image,
                  name: props.name
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
              onClick={() =>
                insertPokemon({ image: props.image, name: props.name })
              }
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
                data: props.data,
                image: props.image,
                name: props.name
              });
            }}
            size="sm"
          >
            View details
          </Button>
        )}
      </Container>

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
