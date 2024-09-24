import React, { useState } from 'react';
import ProfessorForm from './components/ProfessorForms';
import AlunoForm from './components/AlunoForms';
import DisciplinaForm from './components/DisciplinaForms';

interface Professor {
  nome: string;
  email: string;
}

interface Aluno {
  nome: string;
  matricula: string;
}

interface Disciplina {
  nome: string;
  codigo: string;
}

const App: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  const [editProfessor, setEditProfessor] = useState<Professor | null>(null);
  const [editAluno, setEditAluno] = useState<Aluno | null>(null);
  const [editDisciplina, setEditDisciplina] = useState<Disciplina | null>(null);
  const [editIndexProfessor, setEditIndexProfessor] = useState<number | null>(null);
  const [editIndexAluno, setEditIndexAluno] = useState<number | null>(null);
  const [editIndexDisciplina, setEditIndexDisciplina] = useState<number | null>(null);

  // Funções para professores
  const addProfessor = (professor: Professor) => setProfessores([...professores, professor]);

  const updateProfessor = (professor: Professor, index: number) => {
    const updatedProfessores = [...professores];
    updatedProfessores[index] = professor;
    setProfessores(updatedProfessores);
    setEditProfessor(null);
    setEditIndexProfessor(null);
  };

  const removeProfessor = (index: number) => setProfessores(professores.filter((_, i) => i !== index));

  const editProfessorHandler = (professor: Professor, index: number) => {
    setEditProfessor(professor);
    setEditIndexProfessor(index);
  };

  // Funções para alunos
  const addAluno = (aluno: Aluno) => setAlunos([...alunos, aluno]);

  const updateAluno = (aluno: Aluno, index: number) => {
    const updatedAlunos = [...alunos];
    updatedAlunos[index] = aluno;
    setAlunos(updatedAlunos);
    setEditAluno(null);
    setEditIndexAluno(null);
  };

  const removeAluno = (index: number) => setAlunos(alunos.filter((_, i) => i !== index));

  const editAlunoHandler = (aluno: Aluno, index: number) => {
    setEditAluno(aluno);
    setEditIndexAluno(index);
  };

  // Funções para disciplinas
  const addDisciplina = (disciplina: Disciplina) => setDisciplinas([...disciplinas, disciplina]);

  const updateDisciplina = (disciplina: Disciplina, index: number) => {
    const updatedDisciplinas = [...disciplinas];
    updatedDisciplinas[index] = disciplina;
    setDisciplinas(updatedDisciplinas);
    setEditDisciplina(null);
    setEditIndexDisciplina(null);
  };

  const removeDisciplina = (index: number) => setDisciplinas(disciplinas.filter((_, i) => i !== index));

  const editDisciplinaHandler = (disciplina: Disciplina, index: number) => {
    setEditDisciplina(disciplina);
    setEditIndexDisciplina(index);
  };

  return (
    <div>
      <h1>Gerenciador Escolar</h1>
      
      {/* Formulários */}
      <ProfessorForm onAdd={addProfessor} onUpdate={updateProfessor} editProfessor={editProfessor} editIndex={editIndexProfessor} />
      <AlunoForm onAdd={addAluno} onUpdate={updateAluno} editAluno={editAluno} editIndex={editIndexAluno} />
      <DisciplinaForm onAdd={addDisciplina} onUpdate={updateDisciplina} editDisciplina={editDisciplina} editIndex={editIndexDisciplina} />

      {/* Listagens */}
      <h2>Professores</h2>
      <ul>
        {professores.map((prof, index) => (
          <li key={index}>
            {prof.nome} - {prof.email} 
            <button onClick={() => editProfessorHandler(prof, index)}>Editar</button>
            <button onClick={() => removeProfessor(index)}>Remover</button>
          </li>
        ))}
      </ul>

      <h2>Alunos</h2>
      <ul>
        {alunos.map((aluno, index) => (
          <li key={index}>
            {aluno.nome} - {aluno.matricula} 
            <button onClick={() => editAlunoHandler(aluno, index)}>Editar</button>
            <button onClick={() => removeAluno(index)}>Remover</button>
          </li>
        ))}
      </ul>

      <h2>Disciplinas</h2>
      <ul>
        {disciplinas.map((disc, index) => (
          <li key={index}>
            {disc.nome} - {disc.codigo} 
            <button onClick={() => editDisciplinaHandler(disc, index)}>Editar</button>
            <button onClick={() => removeDisciplina(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
