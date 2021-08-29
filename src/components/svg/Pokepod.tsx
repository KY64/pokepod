import React from "react";

import { chakra } from "@chakra-ui/react";

interface PropTypes {
  width?: string;
}

const Pokepod = (props: PropTypes) => (
  <chakra.svg
    id="svg5"
    version="1.1"
    viewBox="0 0 85.856926 28.927355"
    width={props.width ? props.width : "85.856926mm"}
    xmlns="http://www.w3.org/2000/svg"
    xmlnssvg="http://www.w3.org/2000/svg"
  >
    <defs id="defs2" />
    <g id="layer1" transform="translate(-48.493579,-66.73753)">
      <text
        id="text2386"
        style={{
          fill: "#ffcb05",
          fillOpacity: 1,
          fontFamily: "sans-serif",
          fontSize: "22.5778px",
          letterSpacing: "0px",
          lineHeight: 1.25,
          stroke: "#3a5ba7",
          strokeDasharray: "none",
          strokeMiterlimit: 4,
          strokeOpacity: 1,
          strokeWidth: 1.565
        }}
        x="50.180073"
        xmlSpace="preserve"
        y="91.090019"
      >
        <tspan
          id="tspan2384"
          style={{
            fill: "#ffcb05",
            fillOpacity: 1,
            fontFamily: "Pokemon Solid",
            fontSize: "22.5778px",
            fontStretch: "normal",
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "normal",
            stroke: "#3a5ba7",
            strokeDasharray: "none",
            strokeMiterlimit: 4,
            strokeOpacity: 1,
            strokeWidth: 1.565
          }}
          x="50.180073"
          y="91.090019"
        >
          PokePod
        </tspan>
      </text>
    </g>
  </chakra.svg>
);

export default Pokepod;
