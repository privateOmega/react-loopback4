import {model, property} from '@loopback/repository';

import {BaseEntity} from './base.entity';

@model({
  settings: {
    idInjection: false,
    postgresql: {
      schema: 'public',
      table: 'permission',
    },
  },
})
export class Permission extends BaseEntity {
  @property({
    name: 'principal_type',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'principal_type',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  principalType: string;

  @property({
    name: 'principal_id',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'principal_id',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  principalId: string;

  @property({
    name: 'property',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'property',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  property: string;

  @property({
    name: 'permission',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'permission',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  permission: string;

  constructor(data?: Partial<Permission>) {
    super(data);
  }
}

export interface PermissionRelations {
  // describe navigational properties here
}

export type PermissionWithRelations = Permission & PermissionRelations;
