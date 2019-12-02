import {Getter, inject, Provider} from '@loopback/context';

import {AuthorizationBindings} from '../keys';
import {AuthorizationMetadata, AuthorizeFn, Permission} from '../types';

export class AuthorizeActionProvider implements Provider<AuthorizeFn> {
  constructor(
    @inject.getter(AuthorizationBindings.METADATA)
    private readonly getMetadata: Getter<AuthorizationMetadata>,
  ) {}

  value(): AuthorizeFn {
    return response => this.action(response);
  }

  async action(userPermissions: Permission[]): Promise<boolean> {
    const metadata: AuthorizationMetadata = await this.getMetadata();

    if (!metadata) {
      return false;
    } else if (metadata.permissions.includes('*')) {
      // Return immediately with true, if allowed to all
      // This is for publicly open routes only
      return true;
    }

    const neededPermissions = [...new Set(metadata.permissions)];

    return (
      userPermissions
        .map(userPermission => {
          if (
            userPermission.permission === 'ALLOW' &&
            neededPermissions.includes(userPermission.property)
          ) {
            return userPermission;
          }
        })
        .filter(permission => permission).length > 0
    );
  }
}
