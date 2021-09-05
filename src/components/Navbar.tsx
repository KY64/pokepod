import React from "react";

import NextImage from "next/image";
import NextLink from "next/link";
import ToggleTheme from "@/components/ToggleTheme";
import { Box, Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";

import { GiLightBackpack } from "react-icons/gi";
import { FaChevronLeft, FaCompass, FaHome } from "react-icons/fa";

import useMobileView from "@/lib/hooks/MobileView";

import type { ColorProps } from "@/config/type";

interface PropTypes {
  navigation: {
    url: string;
    name: string;
  };
}

const Desktop = (props: any) => (
  <SimpleGrid
    alignItems="center"
    background={props.color.contrast.inverted}
    boxShadow="0 6px 4px rgb(0 0 0 / 10%)"
    columns={3}
    padding={2}
    position="fixed"
    top={0}
    width="100%"
    zIndex={100}
  >
    {props.navigation.url !== "/" ? (
      <NextLink href={props.navigation ? props.navigation.url : "#"}>
        <Button
          _hover={{ cursor: "pointer" }}
          as="a"
          background={props.color.contrast.color}
          color={props.color.contrast.inverted}
          leftIcon={<FaChevronLeft />}
          width="max-content"
        >
          {props.navigation ? props.navigation.name : "Go back"}
        </Button>
      </NextLink>
    ) : (
      <Box />
    )}
    <NextLink href="/">
      <Box
        _hover={{ cursor: "pointer" }}
        aria-label="Pokepod logo"
        as="a"
        justifySelf="center"
        marginLeft={3}
        role="logo"
      >
        <NextImage height={40} src="/logo.png" width={140} />
      </Box>
    </NextLink>
    <Box justifySelf="end">
      <ToggleTheme color={props.color} />
    </Box>
  </SimpleGrid>
);

const Mobile = (props: any) => (
  <HStack
    background={props.color.contrast.inverted}
    bottom={0}
    justifyContent="space-around"
    paddingY={2}
    position="fixed"
    width="100%"
    zIndex={100}
  >
    <NextLink href="/wild-pokemon">
      <Box
        alignItems="center"
        as="a"
        color={
          props.navigation.url === "/my-pokemon"
            ? props.color.contrast.color
            : props.color.text.primary
        }
        display="flex"
        flexDirection="column"
        fontSize="sm"
        textAlign="center"
      >
        <FaCompass display="block" fontSize="18pt" />
        <Text>Find pokemon</Text>
      </Box>
    </NextLink>
    <NextLink href="/">
      <Box
        alignItems="center"
        as="a"
        color={
          props.navigation.url === "/"
            ? props.color.contrast.color
            : props.color.text.primary
        }
        display="flex"
        flexDirection="column"
        fontSize="sm"
        textAlign="center"
      >
        <FaHome display="block" fontSize="18pt" />
        <Text>Home</Text>
      </Box>
    </NextLink>
    <NextLink href="/my-pokemon">
      <Box
        alignItems="center"
        as="a"
        color={
          props.navigation.url === "/wild-pokemon"
            ? props.color.contrast.color
            : props.color.text.primary
        }
        display="flex"
        flexDirection="column"
        fontSize="sm"
        textAlign="center"
      >
        <GiLightBackpack display="block" fontSize="18pt" />
        <Text>My pokemon</Text>
      </Box>
    </NextLink>
  </HStack>
);

const Navbar = (props: ColorProps & PropTypes) => {
  const isMobile = useMobileView();
  return <nav>{isMobile ? <Mobile {...props} /> : <Desktop {...props} />}</nav>;
};

export default Navbar;
