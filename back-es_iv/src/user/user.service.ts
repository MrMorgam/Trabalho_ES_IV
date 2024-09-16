import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { Nota } from 'src/nota/entities/nota.entity';
import { Disciplina } from 'src/disciplina/entities/disciplina.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject()
    private readonly entityManager: EntityManager
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.entityManager.create(User, createUserDto);
    return this.entityManager.save(user);
  }

  findAll() {
    return this.entityManager.find(User);
  }

  findOne(id: string) {
    return this.entityManager.findOne(User, { where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.entityManager.update(User, id, updateUserDto);
  }

  remove(id: string) {
    return this.entityManager.delete(User, id);
  }

  addDisciplina(id: string, disciplina: string) {
    return this.entityManager.update(User, id, { disciplinas: [{ id: disciplina }] });
  }

  removeDisciplina(id: string, disciplina: string) {
    return this.entityManager.delete(User, { id, disciplinas: { id: disciplina } });
  }

  async addNota(idProfessor: string, idAluno: string,disciplina: string, nota: number)  {
    const user: User = await this.entityManager.findOne(User, { where: { id: idProfessor } });
    if(user.role === 'Aluno') {
      throw new UnauthorizedException('Aluno não pode adicionar notas');
    }
    await this.entityManager.insert(Nota, {aluno: {id: idAluno}, disciplina: {id: disciplina}, nota: nota, professor: {id: idProfessor}});
    return this.entityManager.save(user);
  }

  async removeNota(idProfessor: string, idAluno: string, disciplina: string) {
    const user: User = await this.entityManager.findOne(User, { where: { id: idProfessor } });
    if(user.role === 'Aluno') {
      throw new UnauthorizedException('Aluno não pode remover notas');
    }
    return this.entityManager.delete(Nota, {aluno: {id: idAluno}, disciplina: {id: disciplina}, professor: {id: idProfessor}});
  }

  async AlterarNota(idProfessor: string, idAluno: string, disciplina: string, nota: number) {
    const user: User = await this.entityManager.findOne(User, { where: { id: idProfessor } });
    if(user.role === 'Aluno') {
      throw new UnauthorizedException('Aluno não pode alterar nota');
    }
    return this.entityManager.update(Nota, {aluno: {id: idAluno}, disciplina: {id: disciplina}, professor: {id: idProfessor}}, {nota: nota});
  }

  async getAlunos() {
    return this.entityManager.find(User, { where: { role: 'Aluno' }});
  }

  async getProfessores(id: string) {
    return this.entityManager.find(User, { where: { role: 'Professor', disciplinas: { id: id } } });
  }

  async getDisciplinasAluno(id: string) {
    const user: User = await this.entityManager.findOne(User, { where: { id: id } });
    return this.entityManager.find(Disciplina, { where: { alunos: { id: user.id } } });
  }

  async getDisciplinasProfessor(id: string) {
    const user: User = await this.entityManager.findOne(User, { where: { id: id } });
    return this.entityManager.find(Disciplina, { where: { professor: { id: user.id } } });
  }
}
