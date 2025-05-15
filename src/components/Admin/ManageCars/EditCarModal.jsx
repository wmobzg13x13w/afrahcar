import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";

const EditCarModal = ({ isOpen, onClose, car, onEdit, fetchCars }) => {
  const [updatedCar, setUpdatedCar] = useState({
    ...car,
    matricules: car.matricules?.map((m) => {
      const [left, right] = m.value.split("-TUN-");
      return { left, right, available: m.available };
    }) || [{ left: "", right: "", available: true }],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carTypes, setCarTypes] = useState([]);

  // Category options
  const categoryOptions = [
    { value: "courteduree", label: "Courte durée" },
    { value: "longueduree", label: "Longue durée" },
  ];

  // Initialize matricule and category
  useEffect(() => {
    if (car.matricule) {
      const [left, right] = car.matricule.split("-TUN-");
      setUpdatedCar((prev) => ({
        ...prev,
        matricule: { left, right },
      }));
    }
  }, [car]);

  // Fetch car types
  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}cartypes/getall`
        );
        const carTypeOptions = response.data.map((type) => ({
          value: type.name,
          label: type.name,
        }));
        setCarTypes(carTypeOptions);
      } catch (error) {
        console.error("Failed to fetch car types", error);
      }
    };

    fetchCarTypes();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "matriculeLeft" || name === "matriculeRight") {
      setUpdatedCar((prev) => ({
        ...prev,
        matricule: {
          ...prev.matricule,
          [name === "matriculeLeft" ? "left" : "right"]: value,
        },
      }));
    } else {
      setUpdatedCar({ ...updatedCar, [name]: value });
    }
  };

  // Handle select changes
  const handleSelectChange = (selectedOption, { name }) => {
    setUpdatedCar({ ...updatedCar, [name]: selectedOption.value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    const files = e.target.files;
    setUpdatedCar((prev) => ({
      ...prev,
      newImages: Array.from(files),
      showExistingImages: false, // Add this flag
    }));
  };

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      if (updatedCar.images) {
        Array.from(updatedCar.images).forEach((image) => {
          if (image instanceof File) {
            URL.revokeObjectURL(URL.createObjectURL(image));
          }
        });
      }
    };
  }, [updatedCar.images]);

  const { token } = useContext(AuthContext);

  const handleMatriculeChange = (index, part, value) => {
    const newMatricules = [...updatedCar.matricules];
    newMatricules[index][part] = value;
    setUpdatedCar({ ...updatedCar, matricules: newMatricules });
  };

  // Add new matricule field
  const addMatricule = () => {
    setUpdatedCar({
      ...updatedCar,
      matricules: [
        ...updatedCar.matricules,
        { left: "", right: "", available: true },
      ],
    });
  };

  // Remove matricule field
  const removeMatricule = (index) => {
    const newMatricules = updatedCar.matricules.filter((_, i) => i !== index);
    setUpdatedCar({ ...updatedCar, matricules: newMatricules });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();

      // Format matricules array
      const formattedMatricules = updatedCar.matricules.map((m) => ({
        value: `${m.left}-TUN-${m.right}`,
        available: m.available,
      }));

      formData.append("matricules", JSON.stringify(formattedMatricules));

      // Handle existing images
      if (!updatedCar.newImages) {
        formData.append("existingImages", JSON.stringify(car.images || []));
      } else {
        formData.append("existingImages", JSON.stringify([]));
      }

      // Append other fields
      for (const key in updatedCar) {
        if (key === "newImages" && updatedCar.newImages) {
          updatedCar.newImages.forEach((image) => {
            formData.append("images", image);
          });
        } else if (
          key !== "matricules" &&
          key !== "_id" &&
          key !== "newImages" &&
          key !== "images"
        ) {
          formData.append(key, updatedCar[key]);
        }
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}cars/edit/${car._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onEdit(response.data);
      fetchCars();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Options for select fields
  const isNewCarOptions = [
    { value: true, label: "Nouvelle" },
    { value: false, label: "Ancienne" },
  ];

  const airConditionner = [
    { value: true, label: "Oui" },
    { value: false, label: "Non" },
  ];

  const seatOptions = [
    { value: "5", label: "5" },
    { value: "7", label: "7" },
  ];

  const fuelOptions = [
    { value: "Essence", label: "Essence" },
    { value: "Diesel", label: "Diesel" },
    { value: "Électrique", label: "Électrique" },
    { value: "Hybride", label: "Hybride" },
  ];

  const gearOptions = [
    { value: "Manuelle", label: "Manuelle" },
    { value: "Automatique", label: "Automatique" },
  ];

  const doorOptions = [
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 my-8 overflow-y-auto max-h-full'>
        <h2 className='text-2xl font-bold mb-4'>Modifier voiture</h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Category Select Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Catégorie</label>
            <Select
              name='category'
              value={categoryOptions.find(
                (option) => option.value === updatedCar.category
              )}
              onChange={handleSelectChange}
              options={categoryOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Title Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Titre</label>
            <input
              type='text'
              name='title'
              value={updatedCar.title}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Matricule Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Matricules</label>
            {updatedCar.matricules.map((matricule, index) => (
              <div key={index} className='flex items-center mb-2 gap-2'>
                <input
                  type='text'
                  value={matricule.left}
                  onChange={(e) =>
                    handleMatriculeChange(index, "left", e.target.value)
                  }
                  className='w-1/4 border rounded-md py-2 px-4'
                  maxLength={3}
                  required
                  placeholder='123'
                />
                <span className='mx-2'>-TUN-</span>
                <input
                  type='text'
                  value={matricule.right}
                  onChange={(e) =>
                    handleMatriculeChange(index, "right", e.target.value)
                  }
                  className='w-1/4 border rounded-md py-2 px-4'
                  maxLength={4}
                  required
                  placeholder='4567'
                />
                {index > 0 && (
                  <button
                    type='button'
                    onClick={() => removeMatricule(index)}
                    className='text-red-500 hover:text-red-700'>
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              onClick={addMatricule}
              className='text-darkBlue hover:text-darkBlue-dark text-sm mt-2'>
              + Ajouter un autre matricule
            </button>
          </div>

          {/* Description Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Description</label>
            <textarea
              name='description'
              value={updatedCar.description}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Car Type Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Type de Voiture</label>
            <Select
              name='carType'
              value={carTypes.find(
                (option) => option.value === updatedCar.carType
              )}
              onChange={handleSelectChange}
              options={carTypes}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* New/Old Car Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>
              Nouvelle/Ancienne
            </label>
            <Select
              name='isNewCar'
              value={isNewCarOptions.find(
                (option) => option.value === updatedCar.isNewCar
              )}
              onChange={handleSelectChange}
              options={isNewCarOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Gear Type Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>
              Boîte de Vitesses
            </label>
            <Select
              name='gear'
              value={gearOptions.find(
                (option) => option.value === updatedCar.gear
              )}
              onChange={handleSelectChange}
              options={gearOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Fuel Type Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Carburant</label>
            <Select
              name='fuel'
              value={fuelOptions.find(
                (option) => option.value === updatedCar.fuel
              )}
              onChange={handleSelectChange}
              options={fuelOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Doors Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Portes</label>
            <Select
              name='doors'
              value={doorOptions.find(
                (option) => option.value == updatedCar.doors
              )}
              onChange={handleSelectChange}
              options={doorOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Seats Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Sièges</label>
            <Select
              name='seats'
              value={seatOptions.find(
                (option) => option.value == updatedCar.seats
              )}
              onChange={handleSelectChange}
              options={seatOptions}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Air Conditioning Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Climatisation</label>
            <Select
              name='airConditionner'
              value={airConditionner.find(
                (option) => option.value === updatedCar.airConditionner
              )}
              onChange={handleSelectChange}
              options={airConditionner}
              className='w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          {/* Price Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Prix/Jour</label>
            <input
              min={0}
              type='number'
              name='price'
              value={updatedCar.price}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Guarantee Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>
              Dépôt de garantie
            </label>
            <input
              min={0}
              type='number'
              name='garantie'
              value={updatedCar.garantie}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Images Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Images</label>
            <input
              type='file'
              name='images'
              multiple
              onChange={handleFileChange}
              className='w-full border border-gray-300 rounded-md py-2 px-4'
            />
            <div className='mt-2 grid grid-cols-2 gap-2'>
              {/* Display new images if available, otherwise show existing images */}
              {updatedCar.newImages?.length > 0
                ? updatedCar.newImages.map((image, index) => (
                    <div key={`new-${index}`} className='mb-2'>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`New Car Image ${index + 1}`}
                        className='w-full h-48 object-cover rounded-md'
                      />
                    </div>
                  ))
                : car.images?.map((image, index) => (
                    <div key={`existing-${index}`} className='mb-2'>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}uploads/${image}`}
                        alt={`Existing Car Image ${index + 1}`}
                        className='w-full h-48 object-cover rounded-md'
                      />
                    </div>
                  ))}
            </div>
          </div>
          {/* Form Buttons */}
          <div className='flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='bg-orange text-white py-2 px-4 rounded-md mr-2'>
              Annuler
            </button>
            <button
              type='submit'
              className='bg-darkBlue text-white py-2 px-4 rounded-md'
              disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditCarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  car: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditCarModal;
