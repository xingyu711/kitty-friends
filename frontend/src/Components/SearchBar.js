import React from 'react';
import { catBreeds, catAges, catSizes, catGenders } from '../constants.js';
import PropTypes from 'prop-types';
import './SearchBar.css';

export default function SearchBar(props) {
  const handleQueryBreed = props.handleQueryBreed;
  const handleQueryAge = props.handleQueryAge;
  const handleQuerySize = props.handleQuerySize;
  const handleQueryGender = props.handleQueryGender;
  const handleSearchButtonClick = props.handleSearchButtonClick;

  return (
    <div className="search-container">
      <div className="row justify-content-center">
        <div className="mb-3 col-md-4 col-lg-3">
          <select
            name="breed"
            aria-label="breed"
            onChange={(evt) => {
              handleQueryBreed(evt.target.value);
            }}
          >
            <option value="">Breed</option>
            {catBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            name="age"
            aria-label="age"
            onChange={(evt) => {
              handleQueryAge(evt.target.value);
            }}
          >
            <option value="">Age</option>
            {catAges.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            name="size"
            aria-label="size"
            onChange={(evt) => {
              handleQuerySize(evt.target.value);
            }}
          >
            <option value="">Size</option>
            {catSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            name="gender"
            aria-label="gender"
            onChange={(evt) => {
              handleQueryGender(evt.target.value);
            }}
          >
            <option value="">Gender</option>
            {catGenders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 col-12 col-md-1 col-lg-1">
          <button className="btn btn-primary" onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  handleQueryBreed: PropTypes.func,
  handleQueryAge: PropTypes.func,
  handleQuerySize: PropTypes.func,
  handleQueryGender: PropTypes.func,
  handleSearchButtonClick: PropTypes.func,
};
