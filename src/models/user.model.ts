import {model, property} from '@loopback/repository';

import {UserModifiableEntity} from './user-modifiable.entity';

@model({
  settings: {
    idInjection: false,
    postgresql: {
      schema: 'public',
      table: 'user',
    },
    hidden: ['password'],
  },
})
export class User extends UserModifiableEntity {
  @property({
    name: 'first_name',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'first_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  firstName: string;

  @property({
    name: 'middle_name',
    type: 'string',
    required: false,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'middle_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  middleName?: string;

  @property({
    name: 'last_name',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'last_name',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  lastName: string;

  @property({
    name: 'username',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'username',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  username: string;

  @property({
    name: 'email',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'email',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  email: string;

  @property({
    name: 'phone',
    type: 'string',
    required: false,
    length: 10,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'phone',
      dataType: 'character varying',
      dataLength: 10,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  phone?: string;

  @property({
    name: 'password',
    type: 'string',
    required: true,
    length: 50,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'password',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  password: string;

  @property({
    name: 'email_verified',
    type: 'boolean',
    default: false,
    required: true,
    length: null,
    precision: null,
    scale: null,
    postgresql: {
      columnName: 'email_verified',
      dataType: 'boolean',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'NO',
    },
  })
  emailVerified: boolean;

  @property({
    name: 'verification_token',
    type: 'string',
    required: false,
    length: 50,
    precision: null,
    scale: null,
    postgresql: {
      columnName: 'verification_token',
      dataType: 'character varying',
      dataLength: 50,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  verificationToken?: string;

  @property({
    name: 'last_login',
    type: 'date',
    required: false,
    length: null,
    precision: null,
    scale: null,
    postgres: {
      columnName: 'last_login',
      dataType: 'timestamp with time zone',
      dataLength: null,
      dataPrecision: null,
      dataScale: null,
      nullable: 'YES',
    },
  })
  lastLogin?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
