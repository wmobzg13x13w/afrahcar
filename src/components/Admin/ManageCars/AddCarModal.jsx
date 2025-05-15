import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";

const AddCarModal = ({ isOpen, onClose, onSave, fetchCars, category }) => {
  const [car, setCar] = useState({
    title: "",
    matricules: [{ left: "", right: "", available: true }], // Array of matricules
    description: "",
    carType: "",
    isNewCar: "",
    price: "",
    gear: "",
    fuel: "",
    doors: "",
    seats: "",
    images: [],
    category: category,
    garantie: "",
    airConditionner: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [carTypes, setCarTypes] = useState([]);

  // Handle matricule input changes
  const handleMatriculeChange = (index, part, value) => {
    const updatedMatricules = [...car.matricules];
    updatedMatricules[index][part] = value;
    setCar({ ...car, matricules: updatedMatricules });
  };

  // Add new matricule field
  const addMatriculeField = () => {
    setCar({
      ...car,
      matricules: [...car.matricules, { left: "", right: "", available: true }],
    });
  };

  // Remove matricule field
  const removeMatriculeField = (index) => {
    const updatedMatricules = car.matricules.filter((_, i) => i !== index);
    setCar({ ...car, matricules: updatedMatricules });
  };

  // Sync category prop with local state
  useEffect(() => {
    setCar((prev) => ({ ...prev, category }));
  }, [category]);

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

  // Category options
  const categoryOptions = [
    { value: "courteduree", label: "Courte durée" },
    { value: "longueduree", label: "Longue durée" },
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("matricule")) {
      const matriculePart = name.split(".")[1]; // Extract 'left' or 'right'
      setCar((prevCar) => ({
        ...prevCar,
        matricule: {
          ...prevCar.matricule,
          [matriculePart]: value,
        },
      }));
    } else {
      setCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (selectedOption, { name }) => {
    setCar({ ...car, [name]: selectedOption.value });
  };

  // Handle file changes
  const handleFileChange = (e) => {
    setCar({ ...car, images: e.target.files });
  };

  const { token } = useContext(AuthContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formattedMatricules = car.matricules.map((m) => ({
      value: `${m.left}-TUN-${m.right}`,
      available: m.available,
    }));

    const formData = new FormData();
    formData.append("matricules", JSON.stringify(formattedMatricules));

    // Append other fields...
    for (const key in car) {
      if (key === "images") {
        for (let i = 0; i < car.images.length; i++) {
          formData.append("images", car.images[i]);
        }
      } else if (key !== "matricules") {
        formData.append(key, car[key]);
      }
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "cars/add",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add car");
      }

      const newCar = await response.json();
      onSave(newCar);
      onClose();
      setCar({
        title: "",
        matricule: { left: "", right: "" }, // Reset matricule
        description: "",
        carType: "",
        price: "",
        gear: "",
        fuel: "",
        doors: "",
        seats: "",
        images: [],
        category: category,
        garantie: "",
        airConditionner: false,
      });
      fetchCars();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Options for select fields
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

  const isNewCarOptions = [
    { value: true, label: "Nouvelle" },
    { value: false, label: "Ancienne" },
  ];

  const airConditionner = [
    { value: true, label: "Oui" },
    { value: false, label: "Non" },
  ];

  const doorOptions = [
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 my-8 overflow-y-auto max-h-full'>
        <h2 className='text-2xl font-bold mb-4'>
          Ajouter une Nouvelle Voiture
        </h2>
        {error && <div className='text-red-500 mb-4'>{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Category Select Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Catégorie</label>
            <Select
              name='category'
              value={categoryOptions.find(
                (option) => option.value === car.category
              )}
              onChange={handleSelectChange}
              options={categoryOptions}
              className='w-full border rounded-md'
              required
            />
          </div>

          {/* Title Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Titre</label>
            <input
              type='text'
              name='title'
              value={car.title}
              onChange={handleChange}
              className='w-full border rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Matricule Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Matricules</label>
            {car.matricules.map((matricule, index) => (
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
                    onClick={() => removeMatriculeField(index)}
                    className='text-red-500 hover:text-red-700'>
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type='button'
              onClick={addMatriculeField}
              className='text-darkBlue hover:text-darkBlue-dark text-sm mt-2'>
              + Ajouter un autre matricule
            </button>
          </div>

          {/* Description Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Description</label>
            <textarea
              name='description'
              value={car.description}
              onChange={handleChange}
              className='w-full border rounded-md py-2 px-4'
              required
            />
          </div>

          {/* Car Type Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Type de Voiture</label>
            <Select
              name='carType'
              value={carTypes.find((option) => option.value === car.carType)}
              onChange={handleSelectChange}
              options={carTypes}
              className='w-full border rounded-md'
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
                (option) => option.value === car.isNewCar
              )}
              onChange={handleSelectChange}
              options={isNewCarOptions}
              className='w-full border rounded-md'
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
              value={gearOptions.find((option) => option.value === car.gear)}
              onChange={handleSelectChange}
              options={gearOptions}
              className='w-full border rounded-md'
              required
            />
          </div>

          {/* Fuel Type Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Carburant</label>
            <Select
              name='fuel'
              value={fuelOptions.find((option) => option.value === car.fuel)}
              onChange={handleSelectChange}
              options={fuelOptions}
              className='w-full border rounded-md'
              required
            />
          </div>

          {/* Doors Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Portes</label>
            <Select
              name='doors'
              value={doorOptions.find((option) => option.value === car.doors)}
              onChange={handleSelectChange}
              options={doorOptions}
              className='w-full border rounded-md'
              required
            />
          </div>

          {/* Seats Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Sièges</label>
            <Select
              name='seats'
              value={seatOptions.find((option) => option.value === car.seats)}
              onChange={handleSelectChange}
              options={seatOptions}
              className='w-full border rounded-md'
              required
            />
          </div>

          {/* Air Conditioning Field */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Climatisation</label>
            <Select
              name='airConditionner'
              value={airConditionner.find(
                (option) => option.value === car.airConditionner
              )}
              onChange={handleSelectChange}
              options={airConditionner}
              className='w-full border rounded-md'
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
              value={car.price}
              onChange={handleChange}
              className='w-full border rounded-md py-2 px-4'
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
              value={car.garantie}
              onChange={handleChange}
              className='w-full border rounded-md py-2 px-4'
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
              className='w-full border rounded-md py-2 px-4'
              required
            />
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

AddCarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  fetchCars: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default AddCarModal;
