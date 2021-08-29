import { Styles, mode } from "@chakra-ui/theme-tools";

/* Reference for types
 * https://github.com/chakra-ui/chakra-ui/blob/db51ff6063996a834f1880813673953a3ff5c524/packages/theme/src/styles.ts#L1-L23
 */
const styles: Styles = {
  global: (props) => ({
    a: {
      color: "#FFB380",
      hover: {
        color: "#FFE5B0"
      }
    },
    body: {
      bg: mode("#f5f5f5", "#333")(props),
      color: mode("#555", "#E6E6E6")(props),
      fontFamily: "Open Sans, sans-serif"
    },
    html: {
      height: "100%"
    }
  })
};

export default styles;
