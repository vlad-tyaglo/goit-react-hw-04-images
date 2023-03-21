import React, { useState, useEffect} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../api/api";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') return;

    async function findImages() {
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        const loadedPictures = hits.reduce((acc, { id, webformatURL, largeImageURL, tags }) => {
          acc.push({ id, webformatURL, largeImageURL, tags });
          return acc;
        }, []);

        if (loadedPictures.length === 0) {
          throw new Error('Sorry, there are no images with such name');
        };

        if (page === 1) {
          toast[`success`](`${totalHits} images found`)
        };

        setPictures(prevPictures => [...prevPictures, ...loadedPictures]);

        if (page >= Math.ceil(totalHits / 12)) {
          return setShowButton(false);
        };

        setShowButton(true);
      } catch (error) {
        toast['error'](error.message);

      } finally {
        setLoading(false);
      }
    }

    findImages();

  }, [query, page])
  

  const onSearchSubmit = (searchQuery) => {

    if (searchQuery.trim() === '') {
      return toast['error']('Please, type something to find images');
    };
    
    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
    setShowButton(false)
  }

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }

  return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridGap: "16px",
          paddingBottom: "24px",
        }}
      >
        <Searchbar onSubmit={onSearchSubmit}/>
        {pictures.length !== 0 && <ImageGallery pictures={pictures}/>}
        {showButton && <Button onClick={onLoadMore} >Load more</Button>}
        {loading && <Loader/>}
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"></ToastContainer>
      </div>
    );
}
