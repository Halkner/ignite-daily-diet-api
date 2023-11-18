import { randomUUID } from 'node:crypto'

import { BaseProps, PrivateBase } from './types';

export abstract class Base {
  protected base: PrivateBase;

  constructor(props: BaseProps) {
    const currentDate = new Date();

    this.base = {
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? currentDate,
      updatedAt: currentDate,
    };
  }

  public get id() {
    return this.base.id;
  }

  public get createdAt() {
    return this.base.createdAt;
  }

  public get updatedAt() {
    return this.base.updatedAt;
  }
}
