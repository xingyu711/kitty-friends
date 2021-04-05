import React, { useState } from 'react';

export default function SearchBar() {
  return (
    <div className="container m-auto mt-3">
      <div className="row justify-content-center">
        <div className="mb-3 col-md-4 col-lg-3">
          <select className="form-select" name="breed">
            <option value="">Breed</option>
            <option value="Ragdoll">Ragdoll</option>
            <option value="Domestic Long Hair">Domestic Long Hair</option>
          </select>
        </div>
        <div className="mb-3 col-md-3 col-lg-2">
          <select className="form-select" name="age">
            <option value="">Age</option>
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div className="mb-3 col-md-3 col-lg-2">
          <select className="form-select" name="size">
            <option value="">Size</option>
            <option value="Small">Small</option>
            <option value="Median">Median</option>
            <option value="Adult">Large</option>
            <option value="Extra Large">Extra Large</option>
          </select>
        </div>
        <div className="mb-3 col-md-3 col-lg-2">
          <select className="form-select" name="gender">
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3 col-12 col-md-1 col-lg-1">
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </div>
  );
}
