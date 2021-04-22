import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import Navigation from '../Components/Navigation.js';
import { catBreeds, catAges, catSizes, catGenders } from '../constants.js';
import validator from 'validator';
import './PostCatPage.css';

// connect to AWS S3 for uploading cat images
const config = {
  bucketName: 'kitty-friends-bucket',
  dirName: 'media' /* optional */,
  region: 'us-west-1',
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY,
};

const ReactS3Client = new S3(config);

export default function PostCatPage() {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showEmptyFieldErr, setShowEmptyFieldErr] = useState(false);
  const [showInvalidEmailErr, setShowInvalidEmailErr] = useState(false);
  const [showInvalidPhoneErr, setShowInvalidPhoneErr] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showUploadFail, setShowUploadFail] = useState(false);

  function handlePost() {
    if (breed && age && size && gender && email && phone && photo) {
      // Validate email
      if (!validator.isEmail(email)) {
        setShowInvalidEmailErr(true);
      }
      // validate phone
      else if (!validator.isMobilePhone(phone, 'en-US')) {
        setShowInvalidPhoneErr(true);
      } else {
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
            } else {
              setShowUploadFail(true);
            }
          })
          .catch((err) => console.error(err));
      }
    } else {
      setShowEmptyFieldErr(true);
    }
  }

  return (
    <div>
      <Navigation />
      <div className="post-container">
        <div className="post-content cat-input">
          <h4 className="content-title" id="post-info-title">
            Post a cat for adoption
          </h4>

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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
              }}
            >
              <option value=""> </option>
              {catBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
              }}
            >
              <option value=""> </option>
              {catAges.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
              }}
            >
              <option value=""> </option>
              {catSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
              }}
            >
              <option value=""> </option>
              {catGenders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
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
                setShowEmptyFieldErr(false);
                setShowInvalidEmailErr(false);
                setShowInvalidPhoneErr(false);
                setShowSuccessMsg(false);
                setShowUploadFail(false);
              }}
            />
          </div>

          <button className="btn btn-primary post-button" onClick={handlePost}>
            Submit
          </button>

          {showEmptyFieldErr && (
            <div className="m-3 error-msg">Please fill in all the fields.</div>
          )}

          {showInvalidEmailErr && (
            <div className="m-3 error-msg">Please enter a valid email.</div>
          )}

          {showInvalidPhoneErr && (
            <div className="m-3 error-msg">
              Please enter a valid phone number.
            </div>
          )}

          {showSuccessMsg && <div className="m-3">Successfully uploaded!</div>}

          {showUploadFail && (
            <div className="m-3 error-msg">
              Fail to upload. Please wait for us to fix the error and try again
              later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
