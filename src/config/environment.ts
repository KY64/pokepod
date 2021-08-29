export type EnvironmentVars = {
  env: {
    NEXT_PUBLIC_DBNAME: string;
    NEXT_PUBLIC_DBVERSION: string;
    NEXT_PUBLIC_API_ENDPOINT: string;
  };
};

declare const process: EnvironmentVars;

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const DBNAME = process.env.NEXT_PUBLIC_DBNAME;
export const DBVERSION = Number(process.env.NEXT_PUBLIC_DBVERSION);
