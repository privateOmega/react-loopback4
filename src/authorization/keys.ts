import {BindingKey} from '@loopback/context';
import {MetadataAccessor} from '@loopback/metadata';

import {AuthorizeFn, AuthorizationMetadata, UserPermissionsFn} from './types';

export namespace AuthorizationBindings {
  export const AUTHORIZE_ACTION = BindingKey.create<AuthorizeFn>(
    'userAuthorization.actions.authorize',
  );

  export const METADATA = BindingKey.create<AuthorizationMetadata | undefined>(
    'userAuthorization.operationMetadata',
  );

  export const USER_PERMISSIONS = BindingKey.create<UserPermissionsFn>(
    'userAuthorization.actions.userPermissions',
  );
}

export const AUTHORIZATION_METADATA_ACCESSOR = MetadataAccessor.create<
  AuthorizationMetadata,
  MethodDecorator
>('userAuthorization.accessor.operationMetadata');
