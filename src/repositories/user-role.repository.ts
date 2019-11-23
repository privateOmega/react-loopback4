import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';

import {UserRole, UserRoleRelations} from '../models';
import {PgDataSource} from '../datasources';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id,
  UserRoleRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(UserRole, dataSource);
  }
}
