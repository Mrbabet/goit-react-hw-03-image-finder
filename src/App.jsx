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
  const [showLoadMore, setShowLoadMore] = useState(false);

  const fetchData = async function (query, page) {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      setResults(res.data.hits);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (query) => {
    await fetchData(query);
  };
  const handleModalOpen = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results.map((result) => (
            <ImageGalleryItem
              onClick={() => handleModalOpen(result.largeImageURL)}
              key={result.id}
              src={result.webformatURL}
              description={result.description}
            />
          ))}
        </ImageGallery>
      )}

      {showLoadMore && <Button type="button" label="Load more" />}
      {isModalOpen && (
        <Modal
          imageURL={selectedImage}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default App;
