import {Provider} from '@loopback/context';
import {UserProfile} from '@loopback/security';
import {repository} from '@loopback/repository';

import {UserPermissionsFn, Permission} from '../types';
import {UserRoleRepository, PermissionRepository} from '../../repositories';

function merge(rolePermissions: Permission[], userPermissions: Permission[]) {
  if (!rolePermissions) {
    return userPermissions;
  } else if (!userPermissions) {
    return rolePermissions;
  }
  const reduced = rolePermissions.filter(
    rolePermissionObject =>
      !userPermissions.find(
        userPermissionObject =>
          rolePermissionObject['property'] === userPermissionObject['property'],
      ),
  );
  return reduced.concat(userPermissions);
}

export class UserPermissionsProvider implements Provider<UserPermissionsFn> {
  constructor(
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
    @repository(PermissionRepository)
    private permissionRepository: PermissionRepository,
  ) {}

  async value(): Promise<UserPermissionsFn> {
    return async userProfile =>
      this.action(
        userProfile,
        this.userRoleRepository,
        this.permissionRepository,
      );
  }

  async action(
    userProfile: UserProfile,
    userRoleRepository: UserRoleRepository,
    permissionRepository: PermissionRepository,
  ) {
    const userRoles = await userRoleRepository.find({
      where: {
        userId: userProfile.id,
      },
    });
    const roleIds = userRoles.map(userRole => userRole.id);

    const rolePermissions = await permissionRepository.find({
      where: {
        principalType: 'ROLE',
        principalId: {
          inq: roleIds,
        },
      },
      fields: {
        property: true,
        permission: true,
      },
    });

    const userPermissions = await permissionRepository.find({
      where: {
        principalType: 'USER',
        principalId: userProfile.id,
      },
      fields: {
        property: true,
        permission: true,
      },
    });

    const permissions: Permission[] = merge(rolePermissions, userPermissions);

    return permissions;
  }
}
