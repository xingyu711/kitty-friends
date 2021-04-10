import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import env from 'react-dotenv';
import Navigation from '../Components/Navigation.js';

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

// connect to AWS S3 for uploading cat images
const config = {
  bucketName: 'kitty-friends-bucket',
  dirName: 'media' /* optional */,
  region: 'us-west-1',
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_ACCESS_KEY,
};

const ReactS3Client = new S3(config);

export default function PostCatPage() {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState({});
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  function handlePost() {
    if (breed && age && size && gender && email && phone && photo) {
      // TODO: Validate email and phone number

      // upload photo to aws s3 and store to db
      ReactS3Client.uploadFile(photo)
        .then(async (data) => {
          const photoUrl = data.location;
          const resRaw = await fetch('/postCat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              breed: breed,
              age: age,
              size: size,
              gender: gender,
              email: email,
              phone: phone,
              photo: photoUrl,
            }),
          });

          if (resRaw.ok) {
            setShowSuccessMsg(true);
          }
        })
        .catch((err) => console.error(err));
    } else {
      setShowErrMsg(true);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="post-container">
        <div className="post-content cat-input">
          <h4 id="post-info-title">Post a cat for adoption</h4>

          <div className="input-group mb-4">
            <label htmlFor="breedInput" className="form-label post-label">
              Breed
            </label>
            <select
              className="form-select"
              name="breed"
              id="breedInput"
              onChange={(evt) => {
                setBreed(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            >
              <option value=""> </option>
              {catBreeds.map((breed) => (
                <option value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="ageInput" className="form-label post-label">
              Age
            </label>
            <select
              className="form-select"
              name="age"
              id="ageInput"
              onChange={(evt) => {
                setAge(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            >
              <option value=""> </option>
              {catAges.map((age) => (
                <option value={age}>{age}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="sizeInput" className="form-label post-label">
              Size
            </label>
            <select
              className="form-select"
              name="size"
              id="sizeInput"
              onChange={(evt) => {
                setSize(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            >
              <option value=""> </option>
              {catSizes.map((size) => (
                <option value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="genderInput" className="form-label post-label">
              Gender
            </label>
            <select
              className="form-select"
              name="gender"
              id="genderInput"
              onChange={(evt) => {
                setGender(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            >
              <option value=""> </option>
              {catGenders.map((gender) => (
                <option value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="emailInput" className="form-label post-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="emailInput"
              onChange={(evt) => {
                setEmail(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            />
          </div>

          <div className="input-group mb-4">
            <label htmlFor="phoneInput" className="form-label post-label">
              Phone
            </label>
            <input
              className="form-control"
              type="phone"
              name="phone"
              id="phoneInput"
              onChange={(evt) => {
                setPhone(evt.target.value);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            />
          </div>

          <div className="input-group mb-4">
            <label className="form-label post-label" htmlFor="catPhotoFile">
              Cat Photo
            </label>
            <input
              type="file"
              className="form-control"
              id="catPhotoFile"
              onChange={(evt) => {
                setPhoto(evt.target.files[0]);
                setShowErrMsg(false);
                setShowSuccessMsg(false);
              }}
            />
          </div>

          <button className="btn btn-primary post-button" onClick={handlePost}>
            Submit
          </button>

          {showErrMsg && (
            <div className="m-3 error-msg">Please fill in all the fields.</div>
          )}

          {showSuccessMsg && <div className="m-3">Successfully uploaded!</div>}
        </div>
      </div>
    </div>
  );
}
