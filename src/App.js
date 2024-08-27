import CountriesContext from "./data/useCountriesContext";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <CountriesContext>
      <Header />
      <MainPage />
    </CountriesContext>
  );
}

export default App;
