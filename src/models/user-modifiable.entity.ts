import {property} from '@loopback/repository';

import {BaseEntity} from './base.entity';

export abstract class UserModifiableEntity extends BaseEntity {
  @property({
    name: 'created_by',
    type: 'string',
  })
  createdBy?: string;

  @property({
    name: 'modified_by',
    type: 'string',
  })
  modifiedBy?: string;
}
