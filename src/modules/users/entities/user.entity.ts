import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EUserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IUser {
  id?: number;
  email: string;
  password: string;
  role: EUserRoles;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: EUserRoles, default: 'user' })
  role: EUserRoles;

  @AfterInsert()
  logInsert() {
    // console.log(this, 'Inserted');
  }

  @AfterRemove()
  logRemove() {
    // console.log(this, 'Removed');
  }

  @AfterUpdate()
  logUpdate() {
    // console.log(this, 'Updated');
  }
}
