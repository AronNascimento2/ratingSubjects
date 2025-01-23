// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebaseConfig";
import { Angry, Annoyed, Frown, Laugh, Meh, Smile } from "lucide-react";

const SubjectRatings = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const subjectsCollectionRef = collection(db, "disciplinas");

  // Ler disciplinas do Firestore
  const fetchSubjects = async () => {
    const data = await getDocs(subjectsCollectionRef);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Submeter avaliação
  const submitRating = async () => {
    if (!selectedSubject || rating === null || !comment) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const subjectDoc = doc(db, "disciplinas", selectedSubject);

    // Atualizar a disciplina com nova avaliação
    await updateDoc(subjectDoc, {
      ratings: arrayUnion({ rating, comment }),
    });

    toast.success("Avaliação registrada com sucesso!");
    setRating(null);
    setComment("");
    fetchSubjects();
  };

  // Calcular média de avaliações
  const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Gerar carinhas e cores com base na nota
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
      <h1>Avaliação de Disciplinas</h1>

      {/* Seleção de disciplinas */}
      <div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Selecione uma disciplina</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Formulário de avaliação */}
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <h3>Escolha sua avaliação:</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {[...Array(11)].map((_, i) => {
            const { icon, color } = getFaceAndColor(i);
            return (
              <button
                key={i}
                onClick={() => setRating(i)}
                style={{
                  backgroundColor: color,
                  border: "1px solid #ccc",

                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span> {icon}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <textarea
            style={{ height: "200px" }}
            placeholder="Comentário"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button onClick={submitRating}>Enviar Avaliação</button>
        </div>
      </div>

      {/* Listagem de disciplinas */}
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

export default SubjectRatings;
