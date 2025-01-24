// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  orderBy,
  query,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebaseConfig";
import { getFaceAndColor } from "./getFaceAndColor";

const SubjectRatings = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [activeRating, setActiveRating] = useState(null);
  const subjectsCollectionRef = collection(db, "disciplinas");

  const fetchSubjects = async () => {
    const q = query(subjectsCollectionRef, orderBy("name"));
    const data = await getDocs(q);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const submitRating = async () => {
    if (!selectedSubject || rating === null || !comment) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const subjectDoc = doc(db, "disciplinas", selectedSubject);

    await updateDoc(subjectDoc, {
      ratings: arrayUnion({ rating, comment }),
    });

    toast.success("Avaliação registrada com sucesso!");
    setRating(null);
    setComment("");
    fetchSubjects();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          borderRadius: "8px",
          width: "600px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          padding: "24px",
        }}
      >
        <h1>Avaliação de Disciplinas</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <select
            style={{ padding: "8px", borderRadius: "8px" }}
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h3>Escolha sua avaliação:</h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {[...Array(11)].map((_, i) => {
              const { icon, color } = getFaceAndColor(i);
              const isActive = activeRating === i;

              return (
                <button
                  className="emoji"
                  key={i}
                  onClick={() => {
                    setRating(i);
                    setActiveRating(i);
                  }}
                  style={{
                    backgroundColor: color,
                    border: isActive ? "2px solid #000" : "none",
                    borderRadius: "8px",
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                    transition:
                      "transform 0.2s ease, background-color 0.2s ease",
                  }}
                >
                  {icon}
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <textarea
              style={{
                height: "200px",
                padding: "5px",
                width: "100%",
                resize: "none",
              }}
              placeholder="Comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className="button-send" onClick={submitRating}>
              Enviar Avaliação
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SubjectRatings;
