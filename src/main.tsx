import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Container } from "./style";
import { ThreeApp } from "./three-app";

export const App = () => {
  const canvasRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const threeApp = new ThreeApp(canvasRef.current);

    threeApp.createObject();
  }, []);

  return <Container ref={canvasRef} />;
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
