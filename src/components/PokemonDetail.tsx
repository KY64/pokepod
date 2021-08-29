import React from "react";

import Image from "next/image";
import PokemonMoveList from "@/components/PokemonMoveList";
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
  Tooltip
} from "@chakra-ui/react";

import { getElementImage } from "@/lib/utils";

import type { ColorProps, Pokemon } from "@/config";

interface ElementList {
  type: {
    name: string;
  };
}

interface PropTypes {
  isOpen: boolean;
  isWild?: boolean;
  onClose: () => void;
  pokemon: Pokemon;
  query: string;
}

const queryElement = (data: ElementList[]): string => {
  let element: string = "";
  if (data.length > 1) {
    data.forEach((val: any, index: number) => {
      if (index === data.length - 1) {
        element += val.type.name;
      } else {
        element += `${val.type.name}, `;
      }
    });
    return element;
  }

  return data[0].type.name;
};

const Desktop = (props: ColorProps & PropTypes) => (
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
          size="sm"
        >
          Catch pokemon
        </Button>
      ) : (
        ""
      )}
    </ModalFooter>
  </>
);

const PokemonDetail = (props: PropTypes & ColorProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent height="560px" overflow="scroll">
        <ModalHeader textTransform="capitalize">
          {props.pokemon.name}
        </ModalHeader>
        <Desktop {...props} />
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default PokemonDetail;
