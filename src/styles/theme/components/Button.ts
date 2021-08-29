import { ComponentStyleConfig } from "@chakra-ui/react";

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/theme.types.ts#L80-L82
 */
const Button: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: () => ({
    _focus: {
      boxShadow: "none"
    }
  })
};

export default Button;
