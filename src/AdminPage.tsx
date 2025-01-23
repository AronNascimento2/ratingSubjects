// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebaseConfig";
import { Angry, Annoyed, Frown, Laugh, Meh, Smile } from "lucide-react";

const AdminPage = () => {
  const [subjectName, setSubjectName] = useState("");

  const subjectsCollectionRef = collection(db, "disciplinas");
  const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(1);
  };
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
  const fetchSubjects = async () => {
    const data = await getDocs(subjectsCollectionRef);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const [subjects, setSubjects] = useState([]);
  const getFaceAndColor = (value) => {
    if (value === 0) return { icon: <Angry />, color: "red" }; // Triste (vermelho)
    if (value === 1) return { icon: <Angry />, color: "red" }; // Triste (vermelho)
    if (value === 2) return { icon: <Frown />, color: "orange" }; // Neutro (laranja)
    if (value === 3) return { icon: <Frown />, color: "orange" }; // Neutro (laranja)
    if (value === 4) return { icon: <Annoyed />, color: "yellow" }; // Levemente feliz (amarelo)
    if (value === 5) return { icon: <Annoyed />, color: "yellow" }; // Levemente feliz (amarelo)
    if (value === 6) return { icon: <Meh />, color: "green" }; // Feliz (verde)
    if (value === 7) return { icon: <Meh />, color: "green" }; // Feliz (verde)
    if (value === 8) return { icon: <Smile />, color: "green" }; // Feliz (verde claro)
    if (value === 9) return { icon: <Smile />, color: "green" }; // Muito feliz (verde claro)
    return { icon: <Laugh />, color: "blue" }; // Extremamente feliz (azul)
  };
  return (
    <div className="container">
      <h1>Administração - Adicionar Disciplinas</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "5px",
        }}
      >
        <input
          type="text"
          placeholder="Nome da disciplina"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={addSubject}>Adicionar</button>
      </div>
      <h2>Disciplinas</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {subjects.map((subject) => (
          <div key={subject.id}>
            <strong>{subject.name}</strong>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <p>Média: {calculateAverage(subject.ratings)} / 10 </p>
              {getFaceAndColor(calculateAverage(subject.ratings)).icon}
            </div>
            <div
              style={{ gap: "10px", display: "flex", flexDirection: "column" }}
            >
              {subject.ratings?.map((rating, index) => {
                const { icon, color } = getFaceAndColor(rating.rating);
                return (
                  <div
                    key={index}
                    style={{
                      color,
                      background: "lightgray",
                      padding: "10px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <p>Nota: {rating.rating}</p> {icon}
                    </span>

                    <span>Comentário: {rating.comment}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
