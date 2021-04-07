import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Components/Card.js';
import Navigation from '../Components/Navigation.js';
import Pagination from '../Components/Pagination.js';
import EmptyPagePlaceholder from '../Components/EmptyPagePlaceholder.js';

export default function MyPostsPage() {
  const [postedCats, setPostedCats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getPostedCats = async () => {
      setShowPlaceholder(false);

      const resRaw = await fetch(`/getPosts?page=${currentPage}`);
      const res = await resRaw.json();

      if (resRaw.status === 401) {
        history.push('/');
      }

      setPostedCats(res.cats);
      setNumPages(res.numPages);

      if (res.cats.length === 0) {
        setShowPlaceholder(true);
      }

      // automatically scroll to the top of the page
      window.scrollTo(0, 0);
    };

    getPostedCats();
  }, [currentPage]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <Navigation />
      <div className="content-container">
        {showPlaceholder && (
          <EmptyPagePlaceholder
            msg="You haven't saved any furry friends yet."
            linkTo="/home"
            linkToMsg="Explore"
          />
        )}
        <div className="d-flex flex-wrap justify-content-center">
          {postedCats.map((cat) => (
            <Card
              cat={cat}
              key={cat._id}
              id={cat._id}
              fromPage={'MyPostsPage'}
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
