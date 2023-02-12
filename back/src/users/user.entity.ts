import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'user_id',
  })
  id: number;

  @Column()
  login: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;
}
