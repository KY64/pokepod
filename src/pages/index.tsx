import React, { useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import NextLink from "next/link";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import useMobileView from "@/lib/hooks/MobileView";
import usePokemonList from "@/lib/hooks/PokemonList";

import { DBNAME, DBVERSION } from "@/config";

import type { DOMEvent } from "@/config";

const Home = (props: any) => {
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
        <title> Pokepod </title>
      </Head>
      <SimpleGrid
        columns={isMobile ? 1 : 2}
        gap={5}
        justifyItems="center"
        marginTop={isMobile ? 4 : 28}
      >
        <NextLink href="/wild-pokemon">
          <Box
            _hover={{
              background: "white",
              cursor: "pointer",
              transition: ".4s"
            }}
            as="a"
            background={props.color.background}
            border="1px solid"
            boxShadow="0 0 5px rgba( 0 0 0 / 40% )"
            color={props.color.text.primary}
            padding={16}
            textAlign="center"
            width="100%"
          >
            <Heading paddingY={isMobile ? 3 : 10}> Find Pokemon </Heading>
            <Image height={200} src="/wild-pokemon.png" width={400} />
          </Box>
        </NextLink>
        <NextLink href="my-pokemon">
          <Box
            _hover={{
              background: "white",
              cursor: "pointer",
              transition: ".4s"
            }}
            as="a"
            background={props.color.background}
            border="1px solid"
            boxShadow="0 0 5px rgba( 0 0 0 / 40% )"
            color={props.color.text.primary}
            padding={16}
            textAlign="center"
            width="100%"
          >
            <Heading paddingY={isMobile ? 3 : 10}>My Pokemon</Heading>
            <Image height={150} src="/poke-ball.png" width={150} />
          </Box>
        </NextLink>
      </SimpleGrid>
    </>
  );
};

const View = (props: any) => {
  return (
    <Layout navigation={{ name: "/", url: "/" }}>
      <Home {...props} />
    </Layout>
  );
};

export default View;
