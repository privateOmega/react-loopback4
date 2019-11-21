import {model, belongsTo} from '@loopback/repository';

import {BaseEntity} from './base.entity';
import {User} from './user.model';
import {Role} from './role.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {
      schema: 'public',
      table: 'user_role',
    },
  },
})
export class UserRole extends BaseEntity {
  @belongsTo(() => User, undefined, {
    postgresql: {
      columnName: 'user_id',
    },
  })
  userId: string;

  @belongsTo(() => Role, undefined, {
    postgresql: {
      columnName: 'role_id',
    },
  })
  roleId: string;

  constructor(data?: Partial<UserRole>) {
    super(data);
  }
}

export interface UserRoleRelations {
  // describe navigational properties here
}

export type UserRoleWithRelations = UserRole & UserRoleRelations;
