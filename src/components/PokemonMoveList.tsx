import React from "react";

import PokemonMove from "@/components/PokemonMove";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

import usePokemonMove from "@/lib/hooks/PokemonMove";

import type { ColorProps } from "@/config";

type Move = {
  move: {
    name: string;
  };
};

interface PropTypes {
  moves: Move[];
}

const PokemonMoveList = (props: ColorProps & PropTypes) => {
  let query = { query: "" };
  props.moves.forEach((val: any) => {
    query.query += `
      ${val.move.name.replace(/-/g, "_")}: move(move: "${val.move.name}") {
        response
      }
      `;
  });

  const { data, error, loading } = usePokemonMove(query);
  if (loading)
    return (
      <>
        <Flex>
          <Skeleton height={5} margin={1} width={12} />
          <Skeleton height={5} margin={1} width={16} />
          <Skeleton height={5} margin={1} width={12} />
          <Skeleton height={5} margin={1} width={8} />
          <Skeleton height={5} margin={1} width={12} />
          <Skeleton height={5} margin={1} width={10} />
          <Skeleton height={5} margin={1} width={16} />
        </Flex>
        <Flex>
          <Skeleton height={5} margin={1} width={16} />
          <Skeleton height={5} margin={1} width={12} />
          <Skeleton height={5} margin={1} width={8} />
          <Skeleton height={5} margin={1} width={12} />
        </Flex>
      </>
    );
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <>
      {props.moves.map((val: any, index: number) => (
        <PokemonMove
          detail={data[val.move.name.replace(/-/g, "_")].response}
          key={`${val.move.name}-${index}`}
          move={val.move.name.replace(/-/g, " ")}
        />
      ))}
    </>
  );
};

export default PokemonMoveList;
