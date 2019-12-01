import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';

import {Permission, PermissionRelations} from '../models';
import {PgDataSource} from '../datasources';

export class PermissionRepository extends DefaultCrudRepository<
  Permission,
  typeof Permission.prototype.id,
  PermissionRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(Permission, dataSource);
  }
}
