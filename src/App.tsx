import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Search from "./components/search";
import Bantuan from "./components/bantuan";
import Tentang from "./components/tentang";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bantuan" element={<Bantuan />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
