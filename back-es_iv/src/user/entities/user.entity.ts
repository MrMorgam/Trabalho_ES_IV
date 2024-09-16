import { InjectEntityManager } from '@nestjs/typeorm';
import { Entity, Column, PrimaryGeneratedColumn, EntityManager } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn(
        'uuid', // tipo de dado do id
        { name: 'id' }, // nome da coluna no banco de dados
      )
    id: string;

    @Column(
        {
          length: 100,
        }
      )
    name: string;

    @Column(
        {
          unique: true,
        }
      )
    email: string;

    @Column()
    password: string;

    @InjectEntityManager()
    private readonly entityManager: EntityManager
  
    constructor(usuario: Partial<User>) {
      Object.assign(this, usuario);
    }
}
