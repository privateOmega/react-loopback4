import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';

import {User, UserRelations} from '../models';
import {PgDataSource} from '../datasources';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.pg') dataSource: PgDataSource) {
    super(User, dataSource);
  }
}
