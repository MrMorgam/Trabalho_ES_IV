import React, { useState, useEffect } from 'react';

interface Professor {
  nome: string;
  email: string;
}

interface ProfessorFormProps {
  onAdd: (professor: Professor) => void;
  onUpdate: (professor: Professor, index: number) => void;
  editProfessor: Professor | null;
  editIndex: number | null;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ onAdd, onUpdate, editProfessor, editIndex }) => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (editProfessor) {
      setNome(editProfessor.nome);
      setEmail(editProfessor.email);
    }
  }, [editProfessor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const professor = { nome, email };

    if (editIndex !== null) {
      onUpdate(professor, editIndex);
    } else {
      onAdd(professor);
    }
    
    setNome('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editProfessor ? 'Editar Professor' : 'Adicionar Professor'}</h2>
      <label>Nome:</label>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <button type="submit">{editProfessor ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default ProfessorForm;
