import React from "react";

import Navbar from "@/components/Navbar";
import { chakra, useColorMode } from "@chakra-ui/react";

import customTheme from "@/styles/theme";
import { getColor } from "@chakra-ui/theme-tools";

import type { ColorProps } from "@/config/type";

interface PropTypes {
  children: React.ReactNode;
  marginX?: number[];
  navigation: {
    name: string;
    url: string;
  };
}

/*
 * getColor reference https://github.com/chakra-ui/chakra-ui/blob/2418de87ba12cfffda24ebbf32476fb09d3d82bd/packages/theme-tools/src/color.ts#L4-L14
 */
const Layout = (props: PropTypes) => {
  const { colorMode } = useColorMode(); // 'light' or 'dark'
  const color: ColorProps = {
    color: {
      background: getColor(customTheme, `${colorMode}.background`),
      contrast: {
        color: getColor(customTheme, `${colorMode}.contrast.color`),
        hover: getColor(customTheme, `${colorMode}.contrast.hover`),
        inverted: getColor(customTheme, `${colorMode}.contrast.inverted`)
      },
      text: {
        primary: getColor(customTheme, `${colorMode}.text.primary`),
        secondary: getColor(customTheme, `${colorMode}.text.secondary`)
      }
    }
  };

  return (
    <>
      <header>
        <Navbar {...color} navigation={props.navigation} />
      </header>
      <chakra.main
        marginX={props.marginX ? props.marginX : [3, 16]}
        paddingBottom={40}
      >
        {
          // Inherit color to children
          React.Children.map(props.children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, color);
            }
            return child;
          })
        }
      </chakra.main>
    </>
  );
};

export default Layout;
