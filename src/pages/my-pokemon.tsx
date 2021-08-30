import React, { useEffect, useState } from "react";

import Head from "next/head";
import Layout from "@/components/Layout";
import PokemonList from "@/components/PokemonList";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import useMobileView from "@/lib/hooks/MobileView";
import usePokemonList from "@/lib/hooks/PokemonList";

import { DBNAME, DBVERSION } from "@/config";

import type { DOMEvent } from "@/config";

const Home = (props: any) => {
  const [myPokemonList, setMyPokemonList] = useState([]);
  const isMobile = useMobileView();
  const pokemonList = usePokemonList(24, 0);

  useEffect(() => {
    if (!("indexedDB" in window)) {
      console.error(
        "This browser doesn't support IndexedDB, which is required for storing your pokemon"
      );
    } else {
      try {
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
            setMyPokemonList(pokemon);
          };
        };
        idb.onupgradeneeded = (event: DOMEvent) => {
          const db = event.target.result;
          const objectStore = db.createObjectStore("pokemon", {
            keyPath: "id"
          });
          objectStore.createIndex("nickname", "nickname", {
            unique: true
          });
        };
      } catch (err) {
        console.error("Failed to connect browser IndexedDB", err);
      }
    }
  }, []);

  if (pokemonList.loading) return <Box>"Loading..."</Box>;
  if (pokemonList.error) return <Box>Error! {pokemonList.error.message}</Box>;

  return (
    <>
      <Head>
        <title>My Pokemon</title>
      </Head>
      <Flex
        border="1px solid black"
        flexDirection="column"
        marginTop={isMobile ? 8 : 24}
        padding={5}
      >
        <Heading as="h2" fontSize="xl">
          My pokemon list
        </Heading>
        <Heading as="h5" fontSize="sm" fontWeight="normal" marginBottom={5}>
          You have {myPokemonList.length} pokemon
        </Heading>
        {myPokemonList.length > 0 ? (
          <>
            <SimpleGrid
              justifyItems="center"
              templateColumns="repeat(auto-fill, minmax(140px, 1fr))"
            >
              <PokemonList
                color={props.color}
                list={myPokemonList}
                update={setMyPokemonList}
              />
            </SimpleGrid>
          </>
        ) : (
          <Text textAlign="center"> You don't have any pokemon yet </Text>
        )}
      </Flex>
    </>
  );
};

const View = (props: any) => {
  return (
    <Layout navigation={{ name: "Find pokemon", url: "/wild-pokemon" }}>
      <Home {...props} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  return {
    props: {}
  };
};

export default View;
