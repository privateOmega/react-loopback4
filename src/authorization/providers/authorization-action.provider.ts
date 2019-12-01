import {Getter, inject, Provider} from '@loopback/context';

import {AuthorizationBindings} from '../keys';
import {AuthorizationMetadata, AuthorizeFn} from '../types';

export class AuthorizeActionProvider implements Provider<AuthorizeFn> {
  constructor(
    @inject.getter(AuthorizationBindings.METADATA)
    private readonly getMetadata: Getter<AuthorizationMetadata>,
  ) {}

  value(): AuthorizeFn {
    return response => this.action(response);
  }

  async action(userPermissions: string[]): Promise<boolean> {
    const metadata: AuthorizationMetadata = await this.getMetadata();

    if (!metadata) {
      return false;
    } else if (metadata.permissions.includes('*')) {
      // Return immediately with true, if allowed to all
      // This is for publicly open routes only
      return true;
    }

    const neededPermissions = metadata.permissions;
    return (
      [...new Set(neededPermissions)].filter(element =>
        new Set(userPermissions).has(element),
      ).length > 0
    );
  }
}
