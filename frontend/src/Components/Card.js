import React, { useState } from 'react';
import { SuitHeart, SuitHeartFill, Trash } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card(props) {
  const cat = props.cat;
  const catId = props.id;
  const handleUnsave = props.handleUnsave;
  const handleDelete = props.handleDelete;
  const parentPage = props.parentPage;

  const [isSaved, setIsSaved] = useState(props.isSaved);

  async function saveCat() {
    const resRaw = await fetch('/saveCat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cat_id: catId,
      }),
    });

    if (resRaw.ok) {
      setIsSaved(!isSaved);
    }
  }

  async function unSaveCat() {
    const resRaw = await fetch('/unsaveCat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cat_id: catId,
      }),
    });

    if (resRaw.ok) {
      setIsSaved(!isSaved);

      if (parentPage === 'MyCollectionsPage') {
        handleUnsave(catId);
      }
    }
  }

  async function deleteCat() {
    const resRaw = await fetch('/deletePost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cat_id: catId,
      }),
    });

    if (resRaw.ok) {
      if (parentPage === 'MyPostsPage') {
        handleDelete(catId);
      }
    }
  }

  return (
    <div className="card border-light m-3">
      <img src={cat.photo} className="card-img-top cat-pic" alt="..." />
      <div className="card-body shadow">
        <div className="card-text">Age: {cat.age}</div>
        <div className="card-text">Gender: {cat.gender}</div>
        <div className="card-text">Size: {cat.size}</div>
        <div className="card-text">Breed: {cat.breed}</div>
        <div className="card-text">
          Email: {cat.email ? cat.email : 'default@gmail.com'}
        </div>
        <div className="card-text">
          Phone: {cat.phone ? cat.phone : '666-777-8888'}
        </div>
        {parentPage === 'MyPostsPage' && (
          <Trash
            className="me-1 float-end action-icon trash"
            onClick={deleteCat}
          />
        )}
        {parentPage !== 'MyPostsPage' && isSaved && (
          <SuitHeartFill
            className="me-1 float-end action-icon heart-fill"
            onClick={unSaveCat}
          />
        )}

        {parentPage !== 'MyPostsPage' && !isSaved && (
          <SuitHeart
            className="me-1 float-end action-icon heart"
            onClick={saveCat}
          />
        )}
      </div>
    </div>
  );
}

Card.propTypes = {
  cat: PropTypes.object,
  catId: PropTypes.string,
  parentPage: PropTypes.string,
  handleUnsave: PropTypes.func,
  handleDelete: PropTypes.func,
};
