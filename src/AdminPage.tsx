// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
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
    const q = query(subjectsCollectionRef, orderBy("name"));
    const data = await getDocs(q);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  const [subjects, setSubjects] = useState([]);
  const getFaceAndColor = (value) => {
    const roundedValue = Math.round(value);

    if (roundedValue === 0) return { icon: <Angry />, color: "red" };
    if (roundedValue === 1) return { icon: <Angry />, color: "red" };
    if (roundedValue === 2) return { icon: <Frown />, color: "orange" };
    if (roundedValue === 3) return { icon: <Frown />, color: "orange" };
    if (roundedValue === 4) return { icon: <Annoyed />, color: "yellow" };
    if (roundedValue === 5) return { icon: <Annoyed />, color: "yellow" };
    if (roundedValue === 6) return { icon: <Meh />, color: "green" };
    if (roundedValue === 7) return { icon: <Meh />, color: "green" };
    if (roundedValue === 8) return { icon: <Smile />, color: "green" };
    if (roundedValue === 9) return { icon: <Smile />, color: "green" };
    return { icon: <Laugh />, color: "blue" };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        className="card"
        style={{
          width: "900px",
          maxWidth: "100%",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <h1>Administração - Adicionar Disciplinas</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
          }}
        >
          <input
            className="input"
            type="text"
            placeholder="Nome da disciplina"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            className="button-send"
            onClick={addSubject}
            style={{
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Adicionar
          </button>
        </div>
        <h2>Disciplinas</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "10px",
       
          }}
        >
          {subjects.map((subject) => (
            <div
              key={subject.id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                border: "1px solid gray",
                borderRadius: "8px",
                marginBottom: "10px",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <strong>{subject.name}</strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "gray",
                  padding: "2px",
                  marginBottom: "4px",
                  borderRadius: "8px",
                  width: "200px",
                  gap: "10px",
                }}
              >
                {(() => {
                  const average = calculateAverage(subject.ratings);
                  const { icon, color } = getFaceAndColor(average);

                  return (
                    <>
                      <div style={{ fontWeight: "bold" }}>Média: </div>
                      <p style={{ color, margin: 0 }}>{average}</p>{" "}
                      <p style={{ color, margin: 0 }}>/ 10</p>
                      <div
                        style={{ color, display: "flex", alignItems: "center" }}
                      >
                        {icon}
                      </div>
                    </>
                  );
                })()}
              </div>

              <div
                style={{
                  gap: "10px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  overflow: "auto",
                  height: "300px",                }}
              >
                {subject.ratings?.map((rating, index) => {
                  const { icon, color } = getFaceAndColor(rating.rating);
                  return (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        border: "1px solid gray",
                        padding: "10px",
                        borderRadius: "8px",
                        background: "#f9f9f9",
                        boxSizing: "border-box",
                        wordWrap: "break-word",
                      }}
                    >
                      <span
                        style={{
                          color,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <p>Nota: {rating.rating}</p> {icon}
                      </span>
                      <span>{rating.comment}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminPage;
