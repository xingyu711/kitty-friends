import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../Components/Navigation.js';
import Card from '../Components/Card.js';
import SearchBar from '../Components/SearchBar.js';
import Pagination from '../Components/Pagination.js';

export default function Homepage() {
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [savedCats, setSavedCats] = useState([]);

  // states for search cats
  const [queryBreed, setQueryBreed] = useState('');
  const [queryAge, setQueryAge] = useState('');
  const [querySize, setQuerySize] = useState('');
  const [queryGender, setQueryGender] = useState('');
  const [reload, setReload] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getSavedCats = async () => {
      const resRaw = await fetch('/getSavedIds');
      const res = await resRaw.json();

      if (resRaw.status === 401) {
        history.push('/');
      }

      setSavedCats(res.savedIds);
    };

    getSavedCats();
  }, [currentPage, history]);

  useEffect(() => {
    const getCats = async () => {
      const resRaw = await fetch(
        `/getCats?page=${currentPage}&breed=${queryBreed}&age=${queryAge}&size=${querySize}&gender=${queryGender}`
      );
      const res = await resRaw.json();

      if (resRaw.status === 401) {
        history.push('/');
      }

      setCats(res.cats);
      setNumPages(res.numPages);

      // automatically scroll to the top of the page
      window.scrollTo(0, 0);
    };

    getCats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, reload, history]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleQueryBreed(breed) {
    setQueryBreed(breed);
  }

  function handleQueryAge(age) {
    setQueryAge(age);
  }

  function handleQuerySize(size) {
    setQuerySize(size);
  }

  function handleQueryGender(gender) {
    setQueryGender(gender);
  }

  function handleSearchButtonClick() {
    setReload(reload + 1);
  }

  return (
    <div>
      <Navigation />
      <div className="content-container">
        <SearchBar
          handleQueryBreed={handleQueryBreed}
          handleQueryAge={handleQueryAge}
          handleQuerySize={handleQuerySize}
          handleQueryGender={handleQueryGender}
          handleSearchButtonClick={handleSearchButtonClick}
        />

        <div className="d-flex flex-wrap justify-content-center">
          {cats.map((cat) => (
            <Card
              cat={cat}
              key={cat._id}
              id={cat._id}
              isSaved={savedCats.includes(cat._id)}
            />
          ))}
        </div>

        {numPages > 1 && (
          <Pagination
            numPages={numPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
