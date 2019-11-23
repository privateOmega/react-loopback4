import {Entity, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

export abstract class BaseEntity extends Entity {
  @property({
    name: 'id',
    type: 'string',
    default: () => uuid(),
  })
  id: string;

  @property({
    name: 'created_on',
    type: 'date',
    default: () => new Date(),
  })
  createdOn?: Date;

  @property({
    name: 'modified_on',
    type: 'date',
    default: () => new Date(),
  })
  modifiedOn?: Date;

  @property({
    name: 'deleted',
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;
}
