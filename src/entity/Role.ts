import { Entity } from 'typeorm';
import { NameableEntity } from './NameableEntity';

@Entity()
export class Role extends NameableEntity {}
