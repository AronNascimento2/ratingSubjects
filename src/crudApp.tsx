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
import { Angry, Annoyed, Frown, Laugh, Meh, Smile } from "lucide-react";
import LoginModal from "./loginModal";

const SubjectRatings = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [comment, setComment] = useState("");
  const [activeRating, setActiveRating] = useState(null);
  const subjectsCollectionRef = collection(db, "disciplinas");
  const [rating, setRating] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
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
  // const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center", // Centraliza o conteúdo horizontalmente
        alignItems: "center", // Centraliza o conteúdo verticalmente
        position: "relative", // Permite a posição do Login no canto superior direito
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {Object.keys(iconColorMap).map((key) => {
                const i = parseInt(key);
                const { icon, color, nota } = iconColorMap[i];
                const isActive = i === activeRating;

                return (
                  <div
                    key={nota}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      key={nota}
                      onClick={() => {
                        setActiveRating(i);
                        setRating(i);
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
                    </div>
                    <p>{nota}</p>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                backgroundColor: iconColorMap[activeRating]?.color || "#fff",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: isChecked ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
              onClick={() => {
                setRating(activeRating);
                setActiveRating(activeRating);
              }}
            >
              {iconColorMap[activeRating]?.icon}
            </div>
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
            <button
              disabled={loading}
              className="button-send"
              onClick={submitRating}
            >
              Enviar Avaliação
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>

      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "16px",
        }}
      >
        <button className="button-send login" onClick={openModal}>
          Login 
        </button>
      </div>

      {/* Modal de Login */}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default SubjectRatings;
