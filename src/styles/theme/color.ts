import { Colors } from "@chakra-ui/react";

/* Reference for type
 * https://github.com/chakra-ui/chakra-ui/blob/be28abf78957787e0efdabe567443f44985dc1e0/packages/theme/src/theme.types.ts#L36-L38
 */

type CustomColors = Colors & {
  dark: {
    background: string;
    contrast: {
      color: string;
      hover: string;
      inverted: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
  light: {
    background: string;
    contrast: {
      color: string;
      hover: string;
      inverted: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
  };
};

const colors: CustomColors = {
  dark: {
    background: "#333",
    contrast: {
      color: "#ffb380",
      hover: "#ffccaa",
      inverted: "black"
    },
    text: {
      primary: "#e6e6e6",
      secondary: "white"
    }
  },
  light: {
    background: "#F0F0F0",
    contrast: {
      color: "#ff5252",
      hover: "#ff1744",
      inverted: "white"
    },
    text: {
      primary: "#555",
      secondary: "black"
    }
  }
};

export default colors;
