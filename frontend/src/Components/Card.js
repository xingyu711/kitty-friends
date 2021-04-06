import React, { useState } from 'react';
import { SuitHeart, SuitHeartFill } from 'react-bootstrap-icons';

export default function Card(props) {
  const cat = props.cat;
  const catId = props.id;

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
      console.log('successfully saved! ');
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
      console.log('successfully unsaved! ');
      setIsSaved(!isSaved);
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
        <div className="card-text">default@gmail.com</div>
        <div className="card-text">Phone: 666-777-8888</div>
        {isSaved ? (
          <SuitHeartFill
            className="me-1 float-end heart heart-fill"
            onClick={unSaveCat}
          />
        ) : (
          <SuitHeart className="me-1 float-end heart" onClick={saveCat} />
        )}
      </div>
    </div>
  );
}
