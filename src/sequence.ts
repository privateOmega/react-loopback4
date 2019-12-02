import {inject} from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
  HttpErrors,
} from '@loopback/rest';
import {
  AuthenticationBindings,
  AuthenticateFn,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';

import {
  AuthorizationBindings,
  AuthorizeFn,
  UserPermissionsFn,
  Permission,
} from './authorization';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
    @inject(AuthorizationBindings.USER_PERMISSIONS)
    protected fetchUserPermissions: UserPermissionsFn,
    @inject(AuthorizationBindings.AUTHORIZE_ACTION)
    protected checkAuthorization: AuthorizeFn,
  ) {}

  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const route = this.findRoute(request);

      const authenticatedUser = await this.authenticateRequest(request);

      if (authenticatedUser) {
        const permissions: Permission[] = await this.fetchUserPermissions(
          authenticatedUser,
        );

        const isAccessAllowed: boolean = await this.checkAuthorization(
          permissions,
        );

        if (!isAccessAllowed) {
          throw new HttpErrors.Forbidden('Not Allowed Access');
        }
      }

      // After successful authentication
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (error) {
      // Strategy resolver throws a non-http error if it cannot resolve strategy or strategy.authenticate(request) cannot find a valid user profile.
      if (
        [AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND].includes(
          error.code,
        )
      ) {
        Object.assign(error, {
          statusCode: 401,
        });
      }
      this.reject(context, error);
      return;
    }
  }
}
