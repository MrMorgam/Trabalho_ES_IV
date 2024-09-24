import React, { useState, useEffect } from 'react';

interface Disciplina {
  nome: string;
  codigo: string;
}

interface DisciplinaFormProps {
  onAdd: (disciplina: Disciplina) => void;
  onUpdate: (disciplina: Disciplina, index: number) => void;
  editDisciplina: Disciplina | null;
  editIndex: number | null;
}

const DisciplinaForm: React.FC<DisciplinaFormProps> = ({ onAdd, onUpdate, editDisciplina, editIndex }) => {
  const [nome, setNome] = useState<string>('');
  const [codigo, setCodigo] = useState<string>('');

  useEffect(() => {
    if (editDisciplina) {
      setNome(editDisciplina.nome);
      setCodigo(editDisciplina.codigo);
    }
  }, [editDisciplina]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const disciplina = { nome, codigo };

    if (editIndex !== null) {
      onUpdate(disciplina, editIndex);
    } else {
      onAdd(disciplina);
    }

    setNome('');
    setCodigo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editDisciplina ? 'Editar Disciplina' : 'Adicionar Disciplina'}</h2>
      <label>Nome da Disciplina:</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <br />
      <label>Código:</label>
      <input type="text" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
      <br />
      <button type="submit">{editDisciplina ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default DisciplinaForm;
