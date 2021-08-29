import React, { useState } from "react";

import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text
} from "@chakra-ui/react";

import { DBNAME, DBVERSION } from "@/config";

import type { DOMEvent } from "@/config";

declare const document: any;

const PromptCatchingPokemon = (props: any) => {
  const [progress, setProgress] = useState(false);
  const [isDuplicate, setDuplicate] = useState(false);
  const [isCaught, setCaught] = useState(false);
  const [init, setInit] = useState(false);

  const catchPokemon = (new_pokemon: any) => {
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
      const name = store.index("nickname").get(new_pokemon.nickname);
      name.onsuccess = () => {
        if (name.result) setDuplicate(true);
        else {
          store.add({
            ...new_pokemon
          });
          props.update(!props.state);
          props.onClose();
          resetState();
          setDuplicate(false);
        }
      };
    };
  };

  const resetState = () => {
    setProgress(false);
    setCaught(false);
    setInit(false);
    setDuplicate(false);
  };

  const twistFate = () => {
    return Math.floor(Math.random() * 100 + 1) >= 50;
  };

  return (
    <>
      <Modal
        closeOnEsc={!(init && isCaught)}
        closeOnOverlayClick={!(init && isCaught)}
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
          resetState();
        }}
      >
        <ModalOverlay />
        <ModalContent marginTop={24}>
          <ModalHeader textTransform="capitalize">
            {progress ? "Cathing pokemon. . ." : props.pokemon.name}
          </ModalHeader>
          {progress ? (
            <ModalBody marginY={6}>
              <Center>
                <Spinner size="xl" />
              </Center>
            </ModalBody>
          ) : init && isCaught ? (
            <>
              <ModalBody>
                <Text as="h3" size="xl" textAlign="center">
                  {" "}
                  Hooray!{" "}
                </Text>
                <Text textAlign="center">
                  {" "}
                  You've got <b> {props.pokemon.name} </b>! <br />
                  <br />
                  What would you like to call it?
                  {isDuplicate ? (
                    <>
                      <br />
                      <Text color={props.color.contrast.color} fontSize="sm">
                        Sorry, the nickname already used
                      </Text>
                    </>
                  ) : (
                    ""
                  )}
                </Text>
                <Input
                  id="pokemon-nickname"
                  marginTop={3}
                  maxLength={15}
                  placeholder="Nickname (max: 15 characters)"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  _hover={{ background: props.color.contrast.hover }}
                  background={props.color.contrast.color}
                  color={props.color.contrast.inverted}
                  marginRight={2}
                  onClick={() => {
                    let randint = new Uint32Array(1);
                    catchPokemon({
                      dreamworld: props.pokemon.image,
                      id: window.crypto.getRandomValues(randint)[0],
                      name: props.pokemon.name,
                      nickname:
                        document.getElementById("pokemon-nickname").value
                    });
                  }}
                  variant="ghost"
                  width="100%"
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalCloseButton />
              <ModalBody>
                {init ? "Ouch!! It runs away! You still have" : "You only have"}{" "}
                <b> 50% </b> chance to catch{" "}
                <Text display="inline" textTransform="capitalize">
                  {props.pokemon.name}
                </Text>
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
                  onClick={() => {
                    props.onClose();
                    resetState();
                  }}
                  size="sm"
                  variant="ghost"
                  width="100%"
                >
                  Abort
                </Button>
                <Button
                  _hover={{ background: props.color.contrast.hover }}
                  background={props.color.contrast.color}
                  color={props.color.contrast.inverted}
                  onClick={() => {
                    setInit(true);
                    setProgress(true);
                    setTimeout(() => {
                      if (twistFate()) {
                        setCaught(true);
                      }
                      setProgress(false);
                    }, 2000);
                  }}
                  size="sm"
                  width="100%"
                >
                  {init ? "Try again" : "Catch anyway"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PromptCatchingPokemon;
