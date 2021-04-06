import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Components/Card.js';
import Navigation from '../Components/Navigation.js';
import Pagination from '../Components/Pagination.js';

export default function MyCollectionsPage() {
  const [savedCats, setSavedCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const getSavedCats = async () => {
      const resRaw = await fetch(`/getCollections?page=${currentPage}`);
      const res = await resRaw.json();

      if (resRaw.status === 401) {
        history.push('/');
      }

      setSavedCats(res.cats);
      setNumPages(res.numPages);

      // automatically scroll to the top of the page
      window.scrollTo(0, 0);
    };

    getSavedCats();
  }, [currentPage]);

  function handleUnsave(catId) {
    const newCats = [];
    savedCats.forEach((cat) => {
      if (cat._id !== catId) {
        newCats.push(cat);
      }
    });
    setSavedCats(newCats);

    // if we remove the last one on the current page, direct to the previous page
    if (newCats.length === 0) {
      setCurrentPage(currentPage - 1);
      setNumPages(0);
    }
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <Navigation />
      <div className="content-container">
        <div className="d-flex flex-wrap justify-content-center">
          {savedCats.map((cat) => (
            <Card
              cat={cat}
              key={cat._id}
              id={cat._id}
              isSaved={true}
              handleUnsave={handleUnsave}
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
