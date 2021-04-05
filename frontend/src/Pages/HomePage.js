import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation.js';
import Card from '../Components/Card.js';
import SearchBar from '../Components/SearchBar.js';
import Pagination from '../Components/Pagination.js';

export default function Homepage() {
  const [cats, setCats] = useState([]);
  const numPages = 5;
  const currentPage = 4;

  useEffect(() => {
    const getCats = async () => {
      const resRaw = await fetch('/getCats');
      const res = await resRaw.json();

      setCats(res.cats);
    };

    getCats();
  }, []);

  return (
    <div>
      <Navigation />
      <SearchBar />

      <div className="d-flex flex-wrap justify-content-center">
        {cats.map((cat) => (
          <Card cat={cat} />
        ))}
      </div>
      <Pagination numPages={numPages} currentPage={currentPage} />
    </div>
  );
}
