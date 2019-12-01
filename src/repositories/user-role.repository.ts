import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
} from '@loopback/repository';
import {inject, Getter} from '@loopback/core';

import {UserRole, UserRoleRelations, User, Role} from '../models';
import {PgDataSource} from '../datasources';
import {UserRepository} from './user.repository';
import {RoleRepository} from './role.repository';

export class UserRoleRepository extends DefaultCrudRepository<
  UserRole,
  typeof UserRole.prototype.id,
  UserRoleRelations
> {
  public readonly user: BelongsToAccessor<User, typeof User.prototype.id>;
  public readonly role: BelongsToAccessor<Role, typeof Role.prototype.id>;

  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
    @repository.getter('UserRepository')
    userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('RoleRepository')
    roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(UserRole, dataSource);

    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
  }
}
