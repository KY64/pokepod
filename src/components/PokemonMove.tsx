import React, { useState } from "react";

import Image from "next/image";
import PokemonMoveDetail from "@/components/PokemonMoveDetail";
import { Tag, TagLabel } from "@chakra-ui/react";

import { getElementImage } from "@/lib/utils";

const PokemonMove = (props: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <>
      <Tag
        cursor="help"
        margin={1}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        size="md"
        variant="solid"
      >
        <Image
          height={18}
          src={getElementImage(props.detail.type.name)}
          width={18}
        />
        <TagLabel marginLeft={1}>{props.move}</TagLabel>
      </Tag>
      {isOpen ? <PokemonMoveDetail {...props} /> : ""}
    </>
  );
};

export default PokemonMove;
