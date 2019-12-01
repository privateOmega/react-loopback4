import {UserProfile} from '@loopback/security';

/**
 * User Permission model
 * used for explicit allow/deny any permission
 */
export interface Permission {
  property: string;
  permission: string;
}

/**
 * Authorize action method interface
 */
export interface AuthorizeFn {
  (userPermissions: string[]): Promise<boolean>;
}

/**
 * Authorization metadata interface for the method decorator
 */
export interface AuthorizationMetadata {
  // Array of permissions required at the method level.
  // User need to have at least one of these to access the API method.
  permissions: string[];
}
