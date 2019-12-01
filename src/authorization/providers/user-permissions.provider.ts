import {Provider} from '@loopback/context';
import {UserProfile} from '@loopback/security';
import {repository} from '@loopback/repository';

import {UserPermissionsFn} from '../types';
import {UserRoleRepository, PermissionRepository} from '../../repositories';

export class UserPermissionsProvider implements Provider<UserPermissionsFn> {
  constructor(
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
    @repository(PermissionRepository)
    private permissionRepository: PermissionRepository,
  ) {}

  value(): Promise<UserPermissionsFn> {
    return async userProfile => {
      return this.action(
        userProfile,
        this.userRoleRepository,
        this.permissionRepository,
      );
    };
  }
  II;
  async action(
    userProfile: UserProfile,
    userRoleRepository: UserRoleRepository,
    permissionRepository: PermissionRepository,
  ): Promise<string[]> {
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
    });

    const userPermissions = await permissionRepository.find({
      where: {
        principalType: 'USER',
        principalId: userProfile.id,
      },
    });

    // TODO: Find Logic to allow/deny based on its priority

    const permissions: string[] = [];

    return permissions;
  }
}
