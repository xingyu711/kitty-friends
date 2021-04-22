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
  }, [currentPage, history]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleDelete(catId) {
    const newCats = [];
    postedCats.forEach((cat) => {
      if (cat._id !== catId) {
        newCats.push(cat);
      }
    });
    setPostedCats(newCats);

    // if we remove the last one on the current page, direct to the previous page
    if (newCats.length === 0) {
      // current page is the first page = we remove the last item, show the empty page placeholder
      if (currentPage === 0) {
        setNumPages(0);
        setShowPlaceholder(true);
      } else {
        setCurrentPage(currentPage - 1);
        setNumPages(0);
      }
    }
  }

  return (
    <div>
      <Navigation />
      <div className="content-container" role="main">
        {showPlaceholder && (
          <EmptyPagePlaceholder
            msg="You haven't posted any furry friends yet."
            linkTo="/postCat"
            linkToMsg="Post A Cat"
          />
        )}
        <h1 className="content-title">My Posts</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {postedCats.map((cat) => (
            <Card
              cat={cat}
              key={cat._id}
              id={cat._id}
              parentPage={'MyPostsPage'}
              handleDelete={handleDelete}
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
