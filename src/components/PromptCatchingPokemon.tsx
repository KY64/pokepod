import React, { useEffect, useState } from "react";

import {
  Button,
  Center,
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

const PromptCatchingPokemon = (props: any) => {
  const [progress, setProgress] = useState(false);
  const [isCaught, setCaught] = useState(false);
  const [init, setInit] = useState(false);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    if (isCaught && Object.keys(pokemon).length) {
      const idb = window.indexedDB.open(DBNAME, DBVERSION);
      idb.onerror = (event) => {
        console.error("Failed to initDB", event.target.error);
      };
      idb.onsuccess = (event) => {
        const db = event.target.result;
        let transaction = db.transaction("pokemon", "readwrite");
        transaction.onerror = (event) => {
          console.error("Error transaction", event.target);
        };
        let store = transaction.objectStore("pokemon");
        let randint = new Uint32Array(1);
        console.log("HOORAY!", pokemon);
        store.add({
          id: window.crypto.getRandomValues(randint)[0],
          ...pokemon
        });
        props.update(!props.state);
      };
    }
  }, [isCaught]);

  const resetState = () => {
    setProgress(false);
    setCaught(false);
    setInit(false);
    setPokemon({});
  };

  const twistFate = () => {
    return Math.floor(Math.random() * 100 + 1) >= 50;
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
          resetState();
        }}
      >
        <ModalOverlay />
        <ModalContent>
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
              <ModalCloseButton />
              <ModalBody>
                <Text as="h3" size="xl" textAlign="center">
                  {" "}
                  Hooray!{" "}
                </Text>
                <Text textAlign="center">
                  {" "}
                  You've got <b> {props.pokemon.name} </b>!{" "}
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
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalCloseButton />
              <ModalBody>
                {init ? "Ouch!! It runs away! You still have" : "You only have"} <b> 50% </b> chance to catch{" "}
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
                  onClick={()=> {props.onClose(); resetState();}}
                  size="sm"
                  variant="ghost"
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
                        setPokemon({
                          dreamworld: props.pokemon.image,
                          name: props.pokemon.name
                        });
                        setCaught(true);
                      }
                      setProgress(false);
                    }, 2000);
                  }}
                  size="sm"
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
