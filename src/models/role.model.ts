import {model, property} from '@loopback/repository';

import {BaseEntity} from './base.entity';

@model({
  settings: {
    idInjection: false,
    postgresql: {
      schema: 'public',
      table: 'role',
    },
  },
})
export class Role extends BaseEntity {
  @property({
    name: 'name',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  name: string;

  @property({
    name: 'code',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'code_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  code: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
