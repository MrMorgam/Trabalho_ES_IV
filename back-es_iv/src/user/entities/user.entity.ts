import { BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';
import { Nota } from 'src/nota/entities/nota.entity';
import { Entity, Column, PrimaryGeneratedColumn, EntityManager, OneToMany } from 'typeorm';

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

    @Column(
        {
          default: () => 'CURRENT_TIMESTAMP',
        }
    )
    created_at: Date;

    @Column(
        {
          default: 'Aluno',
          enum: ['Aluno', 'Professor'],
          nullable: false,
        }
    )
    role: string;

    @OneToMany(() => Disciplina, function(disciplina) {
        if (this.role === 'Aluno') {
          return disciplina.alunos;
        }
        return disciplina.professor;
      })
    disciplinas: Disciplina[]

    @OneToMany(() => Nota, function(nota) {
        if (this.role === 'Aluno') {
          return nota.aluno;
        }
        return nota.professor;
      })
    notas: Nota[]

    @InjectEntityManager()
    private readonly entityManager: EntityManager
  
    constructor(usuario: Partial<User>) {
      Object.assign(this, usuario);
    }

    async save() {
      return this.entityManager.save(this);
    }

    async remove() {
      return this.entityManager.remove(this);
    }

    async addDisciplina(disciplina: Disciplina) {
      
        if(this.role === 'Aluno' && this.disciplinas.length > 3){
            throw new BadRequestException('Limite de disciplinas atingido');
        }
      this.disciplinas.push(disciplina);
      return this.save();
    }

    async removeDisciplina(disciplina: Disciplina) {
      this.disciplinas = this.disciplinas.filter(disc => disc.id !== disciplina.id);
      return this.save();
    }

    async addNota(nota: Nota) {
      this.notas.push(nota);
      return this.save();
    }

    async removeNota(nota: Nota) {
      this.notas = this.notas.filter(nota => nota.id !== nota.id);
      return this.save();
    }

    async AlterarNota(nota: Nota) {
      this.notas = this.notas.filter(nota => nota.id !== nota.id);
      return this.save();
    }
}
