import React from "react";

import { Box, Flex, Switch, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

import type { ColorProps } from "@/config/type";

const ToggleTheme = (props: ColorProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center" marginRight={4}>
      <FaMoon color={props.color.text.primary} fontSize="16pt" />
      <Box marginX={3}>
        <Switch
          defaultChecked={colorMode === "light"}
          onChange={toggleColorMode}
          size="md"
        />
      </Box>
      <FaSun color={props.color.text.primary} fontSize="20pt" />
    </Flex>
  );
};

export default ToggleTheme;
