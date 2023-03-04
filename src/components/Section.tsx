import { ReactNode } from "react";

const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

interface ISectionProps {
  children: ReactNode;
}

export default function Section({ children }: ISectionProps) {
  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        color: "white",
        fontSize: 100,
        border: "solid white 1px",
        scrollSnapAlign: "center",
      }}
    >
      {children}
    </section>
  );
}
