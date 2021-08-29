import React from "react";

import Image from "next/image";
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
} from "@chakra-ui/react";

import { getElementImage } from "@/lib/utils";

const PokemonMoveDetail = (props: any) => {
  return (
    <Popover isOpen>
      <PopoverTrigger>
        <span />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" textTransform="capitalize">
          <Flex alignContent="center">
            <Image
              height={24}
              src={getElementImage(props.detail.type.name)}
              width={24}
            />
            <Text marginLeft={1}>{props.move}</Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PokemonMoveDetail;
