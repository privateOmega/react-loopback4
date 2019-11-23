import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';

import {Role, RoleRelations} from '../models';
import {PgDataSource} from '../datasources';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(Role, dataSource);
  }
}
