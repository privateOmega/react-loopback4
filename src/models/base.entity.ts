import {Entity, property} from '@loopback/repository';

export abstract class BaseEntity extends Entity {
  @property({
    type: 'date',
    default: () => new Date(),
    name: 'created_on',
  })
  createdOn?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    name: 'modified_on',
  })
  modifiedOn?: Date;

  @property({
    type: 'boolean',
    default: false,
  })
  deleted?: boolean;
}
