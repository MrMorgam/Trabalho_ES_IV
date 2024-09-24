import React, { useState, useEffect } from 'react';

interface Aluno {
  nome: string;
  matricula: string;
}

interface AlunoFormProps {
  onAdd: (aluno: Aluno) => void;
  onUpdate: (aluno: Aluno, index: number) => void;
  editAluno: Aluno | null;
  editIndex: number | null;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ onAdd, onUpdate, editAluno, editIndex }) => {
  const [nome, setNome] = useState<string>('');
  const [matricula, setMatricula] = useState<string>('');

  useEffect(() => {
    if (editAluno) {
      setNome(editAluno.nome);
      setMatricula(editAluno.matricula);
    }
  }, [editAluno]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const aluno = { nome, matricula };

    if (editIndex !== null) {
      onUpdate(aluno, editIndex);
    } else {
      onAdd(aluno);
    }

    setNome('');
    setMatricula('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editAluno ? 'Editar Aluno' : 'Adicionar Aluno'}</h2>
      <label>Nome:</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <br />
      <label>Matrícula:</label>
      <input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
      <br />
      <button type="submit">{editAluno ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default AlunoForm;
