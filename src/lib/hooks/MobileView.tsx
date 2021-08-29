import { useBreakpointValue } from "@chakra-ui/react";

const useMobileView = () => useBreakpointValue({ base: true, md: false });

export default useMobileView;
