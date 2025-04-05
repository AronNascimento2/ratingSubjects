import { Angry, Annoyed, Frown, Laugh, Meh, Smile } from "lucide-react";

export const getFaceAndColor = (value: number) => {
  const roundedValue = Math.round(value);
  if (roundedValue === 0) return { icon: <Angry />, color: "#fa0419" }; // Triste (vermelho vibrante)
  if (roundedValue === 1) return { icon: <Angry />, color: "#f51427" }; // Triste (vermelho vibrante)
  if (roundedValue === 2) return { icon: <Frown />, color: "#FF7F11" }; // Neutro (laranja vibrante)
  if (roundedValue === 3) return { icon: <Frown />, color: "#FF7F11" }; // Neutro (laranja vibrante)
  if (roundedValue === 4) return { icon: <Annoyed />, color: "#e0bc09" }; // Levemente feliz (amarelo vibrante)
  if (roundedValue === 5) return { icon: <Annoyed />, color: "#f0c909" }; // Levemente feliz (amarelo vibrante)
  if (roundedValue === 6) return { icon: <Meh />, color: "#80ED99" }; // Feliz (verde claro vibrante)
  if (roundedValue === 7) return { icon: <Meh />, color: "#80ED99" }; // Feliz (verde claro vibrante)
  if (roundedValue === 8) return { icon: <Smile />, color: "#38B000" }; // Muito feliz (verde forte)
  if (roundedValue === 9) return { icon: <Smile />, color: "#38B000" }; // Muito feliz (verde forte)
  return { icon: <Laugh />, color: "#4361EE" }; // Extremamente feliz (azul vibrante)
};
