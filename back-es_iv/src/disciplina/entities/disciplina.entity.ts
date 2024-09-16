import { InjectEntityManager } from "@nestjs/typeorm";
import { Nota } from "src/nota/entities/nota.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, EntityManager, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Disciplina {

    @PrimaryGeneratedColumn(
        'uuid', // tipo de dado do id
        { name: 'id' }, // nome da coluna no banco de dados 
    )
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column(
        {
            default: 0
        }
    )
    qtd_alunos: number;

    @Column(
        {
            default: 30
        }
    )
    limite_alunos: number;

    @ManyToOne(() => User , (user) => user.disciplinas)
    alunos: User[]

    @OneToMany(() => User, function(user) {
        if(user.role === 'Professor') {
            return user.disciplinas;
        }})
    professor: User

    @OneToMany(() => Nota, (nota) => nota.disciplina)
    notas: Nota[]

    @InjectEntityManager()
    private readonly entityManager: EntityManager

    constructor(disciplina: Partial<Disciplina>) {
        Object.assign(this, disciplina);
    }

    save() {
        return this.entityManager.save(Disciplina, this);
    }

    remove() {
        return this.entityManager.remove(Disciplina, this);
    }

    async addAluno(aluno: User) {
        this.alunos.push(aluno);
        return this.save();
    }

    async removeAluno(aluno: User) {
        this.alunos = this.alunos.filter(user => user.id !== aluno.id);
        return this.save();
    }

    async addProfessor(professor: User) {
        this.professor = professor;
        return this.save();
    }

    async removeProfessor(professor: User) {
        this.professor = null;
        return this.save();
    }
}
