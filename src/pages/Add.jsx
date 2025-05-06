import React, { useState } from 'react';
import upload_image from '../assets/upload.jpeg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';


const Add = ({ token }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("All");

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      if (image) formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container-fluid">
      <div className="row">
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ paddingTop: '30px' }}
        >
          <div className="card shadow p-3 w-100" style={{ maxWidth: '400px', width: '90%' }}>
            <h5 className="text-center mb-3">Add New Food</h5>

            <label htmlFor="image" className="form-label d-flex justify-content-center">
              <img
                src={image ? URL.createObjectURL(image) : upload_image}
                alt="Preview"
                style={{
                  height: '80px',
                  width: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="form-control d-none"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                value={name}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                rows="2"
                value={description}
                required
              ></textarea>
            </div>

            <div className="mb-2">
              <label className="form-label">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="form-select"
              >
                <option value="All">All</option>
                <option value="Pizza">Pizza</option>
                <option value="Rice">Rice</option>
                <option value="Chicken">Chicken</option>
                <option value="Noodles">Noodles</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Price (Rs)</label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="form-control"
                value={price}
                required
                min="0"
                step="0.01"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .container-fluid {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </form>
  );
};

export default Add;
