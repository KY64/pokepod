export interface AccountURL {
  github: AccountURLType;
  medium: AccountURLType;
  able: AccountURLType;
  source_code: AccountURLType;
}

type AccountURLType = {
  link_type: string;
  url: string;
};

export interface ColorProps {
  color: {
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
}

export type DOMEvent = {
  target: any;
};

/* dreamworld key is the same as image key
 * since dreamworld is the return of
 * pokeAPI query using graphQL
 */

export type Pokemon = {
  image: string;
  name: string;
  data: any;
};
