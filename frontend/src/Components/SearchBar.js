import React from 'react';

const catBreeds = [
  'Persian',
  'American Shorthair',
  'Siamese',
  'Domestic Long Hair',
  'Domestic Short Hair',
  'Domestic Medium Hair',
  'Snowshoe',
  'Dilute Tortoiseshell',
  'Dilute Calico',
  'Russian Blue',
  'Maine Coon',
  'Calico',
  'Tabby',
  'Tiger',
  'Bengal',
  'Turkish Angora',
  'Turkish Van',
  'Tuxedo',
  'Torbie',
  'Bombay',
  'Devon Rex',
  'Tortoiseshell',
  'Ragdoll',
  'Abyssinian',
  'Havana',
  'Exotic Shorthair',
  'Egyptian Mau',
  'Burmese',
  'Birman',
  'Tonkinese',
  'Balinese',
  'Chausie',
  'Himalayan',
  'American Bobtail',
  'Manx',
  'Ragamuffin',
  'Norwegian Forest Cat',
  'Scottish Fold',
  'Siberian',
];

const catAges = ['Baby', 'Young', 'Adult', 'Senior'];

const catSizes = ['Small', 'Median', 'Large', 'Extra Large'];

const catGenders = ['Female', 'Male'];

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
            className="form-select"
            name="breed"
            onChange={(evt) => {
              handleQueryBreed(evt.target.value);
            }}
          >
            <option value="">Breed</option>
            {catBreeds.map((breed) => (
              <option value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            className="form-select"
            name="age"
            onChange={(evt) => {
              handleQueryAge(evt.target.value);
            }}
          >
            <option value="">Age</option>
            {catAges.map((age) => (
              <option value={age}>{age}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            className="form-select"
            name="size"
            onChange={(evt) => {
              handleQuerySize(evt.target.value);
            }}
          >
            <option value="">Size</option>
            {catSizes.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 col-md-3 col-lg-2">
          <select
            className="form-select"
            name="gender"
            onChange={(evt) => {
              handleQueryGender(evt.target.value);
            }}
          >
            <option value="">Gender</option>
            {catGenders.map((gender) => (
              <option value={gender}>{gender}</option>
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
