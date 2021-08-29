import React from "react";

import Logo from "@/components/svg/Pokepod";
import ToggleTheme from "@/components/ToggleTheme";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid
} from "@chakra-ui/react";

import useMobileView from "@/lib/hooks/MobileView";

import { FaSearch } from "react-icons/fa";

import type { ColorProps } from "@/config/type";

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
    <Box aria-label="Pokepod logo" marginLeft={3} role="logo">
      <Logo width="120px" />
    </Box>
    <Box justifySelf="center">
      <InputGroup>
        <InputRightElement
          children={<FaSearch color={props.color.text.primary} />}
          pointerEvents="none"
        />
        <Input
          border=".5px solid #eee"
          borderRadius="7px"
          placeholder="Find pokemon"
          width="300px"
        />
      </InputGroup>
    </Box>
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
    position="fixed"
    width="100%"
    zIndex={100}
  >
    <Box>Hello</Box>
    <Box>Hello</Box>
    <Box>Hello</Box>
  </HStack>
);

const Navbar = (props: ColorProps) => {
  const isMobile = useMobileView();
  return <nav>{isMobile ? <Mobile {...props} /> : <Desktop {...props} />}</nav>;
};

export default Navbar;
