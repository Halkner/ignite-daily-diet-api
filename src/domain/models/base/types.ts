import { Replace } from "../../helpers/replace";


export type PrivateBase = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BaseProps = Replace<
  PrivateBase,
  {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
