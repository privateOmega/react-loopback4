import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {authenticate} from '@loopback/authentication';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {OPERATION_SECURITY_SPEC} from '../utils';
import {authorize} from '../authorization';

/**
 * OpenAPI response
 */
const RESPONSE: ResponseObject = {
  description: 'Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @get('/ping', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': RESPONSE,
    },
  })
  @authenticate('jwt')
  @authorize(['ping'])
  ping(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): object {
    return {
      message: 'ping',
    };
  }

  // Map to `GET /pong`
  @get('/pong', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': RESPONSE,
    },
  })
  @authenticate('jwt')
  @authorize(['*'])
  pong(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): object {
    return {
      message: 'pong',
    };
  }
}
