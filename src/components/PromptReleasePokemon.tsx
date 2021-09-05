import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

import { DBNAME, DBVERSION } from "@/config";

import type { DOMEvent } from "@/config";

const PromptReleasePokemon = (props: any) => {
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
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to release <b>{props.pokemon.name}</b>?
          </ModalBody>

          <ModalFooter>
            <Button
              background={props.color.contrast.color}
              color={props.color.contrast.inverted}
              mr={3}
              onClick={props.onClose}
            >
              No
            </Button>
            <Button
              background={props.color.contrast.inverted}
              border="1px solid"
              borderColor={props.color.contrast.color}
              color={props.color.contrast.color}
              onClick={() => {
                releasePokemon(props.pokemon.data.id);
                props.onClose();
              }}
              variant="ghost"
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PromptReleasePokemon;
