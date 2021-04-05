import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation.js';
import Card from '../Components/Card.js';
import SearchBar from '../Components/SearchBar.js';
import Pagination from '../Components/Pagination.js';

export default function Homepage() {
  const [cats, setCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const getCats = async () => {
      const resRaw = await fetch(`/getCats?page=${currentPage}`);
      const res = await resRaw.json();

      setCats(res.cats);
      setNumPages(res.numPages);

      // scroll to the top of the page
      window.scrollTo(0, 0);
    };

    getCats();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navigation />
      <SearchBar />

      <div className="d-flex flex-wrap justify-content-center">
        {cats.map((cat) => (
          <Card cat={cat} key={cat.cat_id} />
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
  );
}
