import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Register from "./Components/Register/Register"; // Atualize o caminho se necessário
import Report from "./Components/Report/Report"; // Atualize o caminho se necessário

function App() {
  return (
    <>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
