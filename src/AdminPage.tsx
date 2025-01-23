import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebaseConfig";

const AdminPage = () => {
  const [subjectName, setSubjectName] = useState("");

  const subjectsCollectionRef = collection(db, "disciplinas");

  const addSubject = async () => {
    if (!subjectName.trim()) {
      toast.error("O nome da disciplina não pode estar vazio!");
      return;
    }

    try {
      await addDoc(subjectsCollectionRef, {
        name: subjectName,
        ratings: [],
      });
      toast.success("Disciplina adicionada com sucesso!");
      setSubjectName("");
    } catch (error) {
      console.error("Erro ao adicionar disciplina: ", error);
      toast.error("Erro ao adicionar disciplina.");
    }
  };

  return (
    <div className="container">
      <h1>Administração - Adicionar Disciplinas</h1>

      <div>
        <input
          type="text"
          placeholder="Nome da disciplina"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={addSubject}>Adicionar</button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminPage;
