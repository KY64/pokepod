import React, { useState } from "react";

import Image from "next/image";
import PokemonMoveList from "@/components/PokemonMoveList";
import PromptCatchingPokemon from "@/components/PromptCatchingPokemon";
import {
  Box,
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure
} from "@chakra-ui/react";

import { getElementImage } from "@/lib/utils";

import type { ColorProps, Pokemon } from "@/config";

interface PropTypes {
  isOpen: boolean;
  isWild?: boolean;
  onClose: () => void;
  pokemon: Pokemon;
  state?: boolean;
  update?: any;
}

const Content = (props: ColorProps & PropTypes) => {
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

  const closeModal = (props: any) => {
    props.onClose();
    onCloseCatchPokemon();
  };

  return (
    <>
      <ModalBody>
        <Box textAlign="center">
          <Image height={150} src={props.pokemon.image} width={150} />
        </Box>
        <SimpleGrid columns={2}>
          <Text>
            <b>Height:</b> {props.pokemon.data.height}
          </Text>
          <Text>
            <b>Weight:</b> {props.pokemon.data.weight}
          </Text>
        </SimpleGrid>
        <SimpleGrid columns={2}>
          <Box>
            <Text>
              <b>Element:</b>
            </Text>
            {props.pokemon.data.types.map((val: any, index: number) => (
              <Image
                height={24}
                key={`${val.type.name}-${index}`}
                src={getElementImage(val.type.name)}
                width={24}
              />
            ))}
          </Box>
          <Box>
            <Text>
              <b>Abilities:</b>
            </Text>
            <List>
              {props.pokemon.data.abilities.map((val: any, index: number) => (
                <ListItem key={`${val.ability.name}-${index}`}>
                  {val.ability.name.replace(/-/g, " ")}
                </ListItem>
              ))}
            </List>
          </Box>
        </SimpleGrid>
        <Text>
          <b>Moves:</b>
        </Text>
        <PokemonMoveList color={props.color} moves={props.pokemon.data.moves} />
      </ModalBody>

      <ModalFooter>
        <Button
          _hover={{
            background: props.color.background
          }}
          background={props.color.contrast.inverted}
          border="1.5px solid"
          borderColor={props.color.contrast.color}
          color={props.color.contrast.color}
          marginRight={2}
          onClick={props.onClose}
          size="sm"
          variant="ghost"
        >
          Close
        </Button>
        {props.isWild ? (
          <Button
            _hover={{ background: props.color.contrast.hover }}
            background={props.color.contrast.color}
            color={props.color.contrast.inverted}
            onClick={() => {
              onOpenCatchPokemon();
              setPokemon({
                data: props.pokemon.data,
                image: props.pokemon.image,
                name: props.pokemon.name
              });
            }}
            size="sm"
          >
            Catch pokemon
          </Button>
        ) : (
          ""
        )}
      </ModalFooter>
      {props.isWild ? (
        <PromptCatchingPokemon
          color={props.color}
          isOpen={isOpenCatchPokemon}
          onClose={() => closeModal(props)}
          pokemon={pokemon}
          state={props.state}
          update={props.update}
        />
      ) : (
        ""
      )}
    </>
  );
};

const PokemonDetail = (props: PropTypes & ColorProps) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent height="560px" overflow="scroll">
          <ModalHeader textTransform="capitalize">
            {props.pokemon.name}
          </ModalHeader>
          <Content {...props} />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default PokemonDetail;
