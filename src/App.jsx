import { useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const API_KEY = "40190153-1f7ba2f721d69c0d589a95a2c";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) toggleModal();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const fetchData = async function (query, page = 1) {
    try {
      setIsLoading(true);
      const res = await axios.get("https://pixabay.com/api/", {
        params: {
          q: query,
          page: page,
          key: API_KEY,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      });
      setResults(res.data.hits);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (query, page) => {
    await fetchData(query, page);
  };
  const toggleModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };
  console.log(page);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results.map((result) => (
            <ImageGalleryItem
              onClick={() => toggleModal(result.largeImageURL)}
              key={result.id}
              src={result.webformatURL}
              description={result.description}
            />
          ))}
        </ImageGallery>
      )}
      {showLoadMore && (
        <Button
          onClick={() => setPage((page) => page + 1)}
          type="button"
          label="Load more"
        />
      )}
      {isModalOpen && (
        <Modal
          imageURL={selectedImage}
          closeModal={toggleModal}
          onClick={toggleModal}
        />
      )}
    </>
  );
}

export default App;
