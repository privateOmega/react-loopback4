import {repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {TokenService, UserService} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';
import * as isEmail from 'isemail';

import {User} from '../models';
import {UserRepository, Credentials} from '../repositories';
import {PasswordHasher} from '../services/hash.password.bcrypt';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {
              exclude: ['password'],
            }),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      description: 'User details',
      required: true,
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            exclude: ['id', 'emailVerified'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<Omit<User, 'password'>> {
    if (!isEmail.validate(user.email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid Email');
    }
    if (await this.userRepository.exists(user.email)) {
      throw new HttpErrors.UnprocessableEntity('Email already exists');
    }
    if (user.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must be minimum 8 characters',
      );
    }

    // eslint-disable-next-line require-atomic-updates
    user.password = await this.passwordHasher.hashPassword(user.password);

    // eslint-disable-next-line require-atomic-updates
    user.emailVerified = false;
    try {
      const userResponse = await this.userRepository.create(user);
      delete userResponse.password;

      return userResponse;
    } catch (error) {
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {
              exclude: ['password'],
            }),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      description: 'Login request body',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                minLength: 8,
              },
            },
          },
        },
      },
    })
    credentials: Credentials,
  ): Promise<Omit<UserProfile, 'password'>> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);

    return {...userProfile, token};
  }
}
