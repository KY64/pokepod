import React, { useState } from "react";

import Image from "next/image";
import PokemonDetail from "@/components/PokemonDetail";
import PromptCatchingPokemon from "@/components/PromptCatchingPokemon";
import { Button, Container, Heading, useDisclosure } from "@chakra-ui/react";

import { DBNAME, DBVERSION } from "@/config";

import type { ColorProps, DOMEvent, Pokemon } from "@/config";

interface PropTypes {
  data: any;
  image: string;
  isWild?: boolean;
  name: string;
  state: boolean;
  update: any;
}

const PokemonList = (props: ColorProps & PropTypes) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWildPokemon,
    onClose: onCloseWildPokemon,
    onOpen: onOpenWildPokemon
  } = useDisclosure();
  const {
    isOpen: isOpenCatchPokemon,
    onClose: onCloseCatchPokemon,
    onOpen: onOpenCatchPokemon
  } = useDisclosure();
  const [pokemon, setPokemon] = useState<Pokemon>({
    data: {},
    image: "",
    name: ""
  });

  const releasePokemon = (pokemonID: string) => {
    const idb = window.indexedDB.open(DBNAME, DBVERSION);
    idb.onerror = (event: DOMEvent) => {
      console.error("Failed to initDB", event.target.error);
    };
    idb.onsuccess = (event: DOMEvent) => {
      const db = event.target.result;
      let transaction = db.transaction("pokemon", "readwrite");
      transaction.onerror = (event: any) => {
        console.error("Error transaction", event.target);
      };
      let store = transaction.objectStore("pokemon");
      store.delete(pokemonID);
      props.update(!props.state);
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
              onClick={() => {
                onOpenCatchPokemon();
                setPokemon({
                  data: props.data,
                  image: props.image,
                  name: props.name
                });
              }}
              size="sm"
            >
              Catch pokemon
            </Button>
          </>
        ) : (
          <>
            <Button
              _hover={{ background: props.color.contrast.hover }}
              background={props.color.contrast.color}
              color={props.color.contrast.inverted}
              marginBottom={2}
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
                releasePokemon(props.data.id);
              }}
              padding={1}
              size="sm"
              variant="link"
            >
              Release
            </Button>
          </>
        )}
      </Container>

      {props.isWild ? (
        <>
          <PokemonDetail
            color={props.color}
            isOpen={isOpenWildPokemon}
            isWild
            onClose={onCloseWildPokemon}
            pokemon={pokemon}
          />
          <PromptCatchingPokemon
            color={props.color}
            isOpen={isOpenCatchPokemon}
            onClose={onCloseCatchPokemon}
            pokemon={pokemon}
            state={props.state}
            update={props.update}
          />
        </>
      ) : (
        <PokemonDetail
          color={props.color}
          isOpen={isOpen}
          onClose={onClose}
          pokemon={pokemon}
        />
      )}
    </>
  );
};

export default PokemonList;
