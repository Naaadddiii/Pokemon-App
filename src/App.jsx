import "./App.css";
import "./components/styles.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Main from "./components/Main";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import Favourites from "./components/Favourites/Favourites";

function App() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/:category" element={<PokemonDetail />} />
          <Route exact path="/favourites" element={<Favourites  />} />
        </Routes>
      </>
    </HashRouter>
  );
}

export default App;
