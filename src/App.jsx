import { useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";

function App() {
  const API_KEY = "40190153-1f7ba2f721d69c0d589a95a2c";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async function (query) {
    try {
      const res = await fetch(
        `https://pixabay.com/api/?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await res.json();
      setResults(data.hits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (query) => {
    await fetchData(query);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery results={results} />
    </>
  );
}

export default App;
