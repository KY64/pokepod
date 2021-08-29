import { ChakraTheme, theme as baseTheme, extendTheme } from "@chakra-ui/react";

import colors from "@/styles/theme/color";
import components from "@/styles/theme/components";
import config from "@/styles/theme/config";
import styles from "@/styles/theme/style";

/* List of theme key
 * https://github.com/chakra-ui/chakra-ui/blob/5c6397a318fba95b35b6cfcd9c15fb22820fe579/packages/theme/src/utils.ts#L4-L23
 * [
    "borders",
    "breakpoints",
    "colors",
    "components",
    "config",
    "direction",
    "fonts",
    "fontSizes",
    "fontWeights",
    "letterSpacings",
    "lineHeights",
    "radii",
    "shadows",
    "sizes",
    "space",
    "styles",
    "transition",
    "zIndices",
   ]
 */
const override: ChakraTheme = {
  ...baseTheme,
  colors,
  components,
  config,
  styles
};

export default extendTheme(override);
