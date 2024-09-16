import { Disciplina } from "src/disciplina/entities/disciplina.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nota {

    @PrimaryGeneratedColumn(
        'uuid', // tipo de dado do id
        { name: 'id' }, // nome da coluna no banco de dados
    )
    id: string;

    @OneToMany(() => User, (user) => user.id)
    aluno: User

    @OneToMany(() => User, (user) => user.id)
    professor: User

    @OneToMany(() => Disciplina, (disciplina) => disciplina.id)
    disciplina: Disciplina

    @Column({
        default: 0,
        nullable: false,
        type: 'float',
        name: 'nota',
    })
    nota: number


    constructor(nota: Partial<Nota>) {
        Object.assign(this, nota);
    }

}
