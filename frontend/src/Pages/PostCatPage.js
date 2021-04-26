import React, { useState } from 'react';
import S3 from 'react-aws-s3';
import Navigation from '../Components/Navigation.js';
import { catBreeds, catAges, catSizes, catGenders } from '../constants.js';
import validator from 'validator';
import './PostCatPage.css';
import { useToasts } from 'react-toast-notifications';

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
  const [file, setFile] = useState('');

  // using Toast to show error/success messages
  const { addToast } = useToasts();

  function handlePost() {
    if (breed && age && size && gender && email && phone && photo) {
      // Validate email
      if (!validator.isEmail(email)) {
        addToast('Please enter a valid email', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
      // validate phone
      else if (!validator.isMobilePhone(phone, 'en-US')) {
        addToast('Please enter a valid phone number', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
      // validate file type
      else if (
        photo.type !== 'image/jpg' &&
        photo.type !== 'image/png' &&
        photo.type !== 'image/jpeg'
      ) {
        addToast('Please use a valid image type (png, jpg or jpeg)', {
          appearance: 'warning',
          autoDismiss: true,
        });
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
              addToast('Successfully uploaded!', {
                appearance: 'success',
                autoDismiss: true,
              });
              setBreed('');
              setAge('');
              setSize('');
              setGender('');
              setEmail('');
              setPhone('');
              setPhoto(null);
              setFile('');
            } else {
              addToast('Upload failed. Please try again later.', {
                appearance: 'error',
                autoDismiss: true,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            addToast('Upload failed. Please try again later.', {
              appearance: 'error',
              autoDismiss: true,
            });
          });
      }
    } else {
      addToast('Please fill in all the fields', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
  }

  return (
    <div>
      <Navigation />
      <div className="post-container">
        <div className="post-content cat-input" role="main">
          <h1 className="content-title" id="post-info-title">
            Post a cat for adoption
          </h1>

          <div className="input-group mb-4">
            <label htmlFor="breedInput" className="form-label post-label">
              Breed
            </label>
            <select
              name="breed"
              id="breedInput"
              value={breed}
              onChange={(evt) => {
                setBreed(evt.target.value);
              }}
            >
              <option value=""> </option>
              {catBreeds.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="ageInput" className="form-label post-label">
              Age
            </label>
            <select
              name="age"
              id="ageInput"
              value={age}
              onChange={(evt) => {
                setAge(evt.target.value);
              }}
            >
              <option value=""> </option>
              {catAges.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="sizeInput" className="form-label post-label">
              Size
            </label>
            <select
              name="size"
              id="sizeInput"
              value={size}
              onChange={(evt) => {
                setSize(evt.target.value);
              }}
            >
              <option value=""> </option>
              {catSizes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="genderInput" className="form-label post-label">
              Gender
            </label>
            <select
              name="gender"
              id="genderInput"
              value={gender}
              onChange={(evt) => {
                setGender(evt.target.value);
              }}
            >
              <option value=""> </option>
              {catGenders.map((g) => (
                <option key={g} value={g}>
                  {g}
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
              value={email}
              onChange={(evt) => {
                setEmail(evt.target.value);
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
              value={phone}
              id="phoneInput"
              onChange={(evt) => {
                setPhone(evt.target.value);
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
              value={file}
              onChange={(evt) => {
                setPhoto(evt.target.files[0]);
                setFile(evt.target.value);
              }}
            />
          </div>

          <button className="btn btn-primary post-button" onClick={handlePost}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
