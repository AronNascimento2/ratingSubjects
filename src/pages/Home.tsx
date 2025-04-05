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
import { db } from "../config/firebaseConfig";
import { Angry, Annoyed, Frown, Laugh, Meh, Smile } from "lucide-react";
import LoginModal from "../components/LoginModal";
import "./homePage.css";

const SubjectRatings = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [comment, setComment] = useState("");
  const [activeRating, setActiveRating] = useState(null);
  const subjectsCollectionRef = collection(db, "disciplinas");
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = async () => {
    const q = query(subjectsCollectionRef, orderBy("name"));
    const data = await getDocs(q);
    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const submitRating = async () => {
    try {
      setLoading(true);
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
      setActiveRating(null);
      setSelectedSubject("");
    } catch (e) {
      toast.error(e);
    } finally {
      setTimeout(() => {
        setLoading(false); // Libera o botão após 3 segundos
      }, 2000);
    }
  };
  const iconColorMap = {
    0: { nota: 0, icon: <Angry />, color: "#fa0419" },
    1: { nota: 1, icon: <Angry />, color: "#f51427" },
    2: { nota: 2, icon: <Frown />, color: "#FF7F11" },
    3: { nota: 3, icon: <Frown />, color: "#FF7F11" },
    4: { nota: 4, icon: <Annoyed />, color: "#e0bc09" },
    5: { nota: 5, icon: <Annoyed />, color: "#f0c909" },
    6: { nota: 6, icon: <Meh />, color: "#80ED99" },
    7: { nota: 7, icon: <Meh />, color: "#80ED99" },
    8: { nota: 8, icon: <Smile />, color: "#38B000" },
    9: { nota: 9, icon: <Smile />, color: "#38B000" },
    10: { nota: 10, icon: <Laugh />, color: "#4361EE" },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="main-container">
      <div className="card">
        <h1>Avaliação de Disciplinas</h1>

        <div style={{ width: "100%" }}>
          <select
            className="select-subject"
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

        <div className="rating-container">
          <h3>Escolha sua avaliação:</h3>
          <div className="rating-options">
            {Object.keys(iconColorMap).map((key) => {
              const i = parseInt(key);
              const { icon, color, nota } = iconColorMap[i];
              const isActive = i === activeRating;

              return (
                <div key={nota} className="rating-box">
                  <div
                    className={`rating-icon ${isActive ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setActiveRating(i);
                      setRating(i);
                    }}
                  >
                    {icon}
                  </div>
                  <p>{nota}</p>
                </div>
              );
            })}
          </div>

          <div
            style={{
              width: "50px",
              backgroundColor: iconColorMap[activeRating]?.color || "#fff",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease, background-color 0.2s ease",
            }}
            onClick={() => {
              setRating(activeRating);
              setActiveRating(activeRating);
            }}
          >
            {iconColorMap[activeRating]?.icon}
          </div>
          <textarea
            className="comment-box"
            placeholder="Comentário"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            disabled={loading}
            className="button-send"
            onClick={submitRating}
          >
            Enviar Avaliação
          </button>
        </div>
        <ToastContainer />
      </div>

      <button className="button-send login" onClick={openModal}>
        Login
      </button>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SubjectRatings;
