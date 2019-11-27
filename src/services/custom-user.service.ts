import {HttpErrors} from '@loopback/rest';
import {UserService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import {repository} from '@loopback/repository';
import {inject} from '@loopback/context';

import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {PasswordHasherBindings} from '../keys';
import {PasswordHasher} from './hash.password.bcrypt';

export class CustomUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRespository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const user = await this.userRespository.findOne({
      where: {
        email: credentials.email,
      },
    });

    if (!user) {
      throw new HttpErrors.NotFound(
        `User with email ${credentials.email} not found.`,
      );
    }

    const passswordMatched = await this.passwordHasher.comparePassword(
      credentials.password,
      user.password,
    );

    if (!passswordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are incorrect');
    }

    return user;
  }

  convertToUserProfile(user: User): UserProfile {
    const name = user.firstName
      ? user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName
      : user.lastName;
    return {
      [securityId]: user.id,
      id: user.id,
      name: name,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
