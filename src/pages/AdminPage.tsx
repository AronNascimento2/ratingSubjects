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
import { useNavigate } from "react-router-dom";
import "./admin-page.css";
import { db } from "../config/firebaseConfig";
import { getFaceAndColor } from "../utils/getFaceAndColor";
import { calculateAverage } from "../utils/calculateAverage";

const AdminPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const navigate = useNavigate();

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
  const fetchSubjects = async () => {
    const q = query(subjectsCollectionRef, orderBy("name"));
    const data = await getDocs(q);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("isAuthenticated");
  };
  return (
    <div className="container">
      <div className="card">
        <h1>Administração</h1>
        <p>Adicionar Disciplina</p>
        <div className="container-add-subject">
          <input
            className="input"
            type="text"
            placeholder="Nome da disciplina"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <button className="button-send" onClick={addSubject}>
            Adicionar
          </button>
        </div>
        <p>Disciplinas Avaliadas</p>
        <div className="disciplinas-container">
          {subjects.map((subject) => (
            <div key={subject.id} className="subject-card">
              <strong>{subject.name}</strong>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f0f0f0",
                  marginBottom: "10px",
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
                      <div style={{ fontWeight: "bold", color: "#333" }}>
                        Média:
                      </div>
                      <p style={{ color, margin: 0, fontSize: "18px" }}>
                        {average}
                      </p>
                      <p style={{ color, margin: 0, fontSize: "14px" }}>/ 10</p>
                      <div
                        style={{
                          color,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {icon}
                      </div>
                    </>
                  );
                })()}
              </div>
              <div className="subject-ratings">
                {subject.ratings?.map((rating, index) => {
                  const { icon, color } = getFaceAndColor(rating.rating);
                  return (
                    <div key={index} className="rating-item">
                      <span style={{ color }}>
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
      <div className="logout-button">
        <button onClick={handleLogout} className="button-send login">
          Sair
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
