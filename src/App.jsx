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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) toggleModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    setShowLoadMore(Math.ceil(total / 12) > 1);
  }, [total, results]);

  const fetchData = async function (query) {
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
      setIsLoading(false);
      setResults((prevResults) => [...res.data.hits, ...prevResults]);
      setTotal(Math.ceil(res.data.totalHits / res.config.params.per_page));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (query) => {
    setLastSearchQuery(query);
    setResults([]);
    await fetchData(query);
  };
  const toggleModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(!isModalOpen);
  };

  const handleLoadMore = async () => {
    await fetchData(lastSearchQuery);
    setPage((prevPage) => prevPage + 1);
  };
  console.log(lastSearchQuery);
  console.log(page);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery>
          {results &&
            results.map((result) => (
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
          nextPage={handleLoadMore}
          className={"load-more"}
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
