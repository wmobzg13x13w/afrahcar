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
    price: "", // Legacy price field
    gear: "",
    fuel: "",
    doors: "",
    seats: "",
    images: [],
    category: category, // Legacy category field
    garantie: "",
    airConditionner: false,
    // New multi-category support
    categories: [
      { categoryType: category, type: category, price: "", available: true },
    ],
    multiCategory: false, // Flag to indicate if car is in multiple categories
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
    } else if (name.startsWith("category-price-")) {
      // Handle category price changes
      const categoryIndex = parseInt(name.split("-")[2]);
      const updatedCategories = [...car.categories];
      updatedCategories[categoryIndex].price = value;
      setCar({
        ...car,
        categories: updatedCategories,
        // Also update legacy price field if this is the first/primary category
        price: categoryIndex === 0 ? value : car.price,
      });
    } else {
      setCar((prevCar) => ({
        ...prevCar,
        [name]: value,
      }));
    }
  };

  // Toggle multi-category mode
  const toggleMultiCategory = () => {
    setCar({
      ...car,
      multiCategory: !car.multiCategory,
    });
  };

  // Add a new category
  const addCategory = () => {
    // Don't add if both categories already exist
    if (car.categories.length >= 2) return;

    // Find which category is not already added
    const existingCategory = car.categories[0].categoryType;
    const newCategoryType =
      existingCategory === "courteduree" ? "longueduree" : "courteduree";

    setCar({
      ...car,
      categories: [
        ...car.categories,
        {
          categoryType: newCategoryType,
          type: newCategoryType,
          price: "",
          available: true,
        },
      ],
    });
  };

  // Remove a category
  const removeCategory = (index) => {
    // Don't remove if only one category left
    if (car.categories.length <= 1) return;

    const updatedCategories = car.categories.filter((_, i) => i !== index);
    setCar({
      ...car,
      categories: updatedCategories,
      // Update legacy category field if needed
      category: updatedCategories[0].categoryType,
    });
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

    // Format and append categories
    // Always use the categories array for price information
    // Make sure all categories have prices
    const categoriesToSubmit = car.categories.map((cat) => ({
      ...cat,
      // Ensure price is a number
      price: cat.price ? Number(cat.price) : 0,
      // Add type field which is required by the backend
      type: cat.categoryType,
    }));

    // Ensure we have at least one category
    if (categoriesToSubmit.length === 0) {
      categoriesToSubmit.push({
        categoryType: car.category || "courteduree",
        type: car.category || "courteduree",
        price: Number(car.price) || 0,
        available: true,
      });
    }

    formData.append("categories", JSON.stringify(categoriesToSubmit));
    // Also set the legacy price field to the first category's price for backward compatibility
    formData.append("price", categoriesToSubmit[0].price);
    formData.append("category", categoriesToSubmit[0].categoryType);

    // Append other fields (excluding price, category, matricules, and categories)
    for (const key in car) {
      if (key === "images") {
        for (let i = 0; i < car.images.length; i++) {
          formData.append("images", car.images[i]);
        }
      } else if (
        key !== "matricules" &&
        key !== "categories" &&
        key !== "price" &&
        key !== "category"
      ) {
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
            <div className='flex justify-between items-center'>
              <label className='block text-gray-700 mb-2'>Catégorie</label>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='multiCategory'
                  checked={car.multiCategory}
                  onChange={toggleMultiCategory}
                  className='mr-2'
                />
                <label
                  htmlFor='multiCategory'
                  className='text-sm text-gray-600'>
                  Disponible dans plusieurs catégories
                </label>
              </div>
            </div>

            {!car.multiCategory ? (
              <>
                <select
                  name='category'
                  value={car.category}
                  onChange={(e) => {
                    // Update both the legacy category field and the categories array
                    const updatedCategories = [...car.categories];
                    updatedCategories[0] = {
                      ...updatedCategories[0],
                      categoryType: e.target.value,
                      type: e.target.value, // Add type field which is required by the backend
                    };
                    setCar({
                      ...car,
                      category: e.target.value, // Update legacy field
                      categories: updatedCategories,
                    });
                  }}
                  className='w-full border rounded-md py-2 px-4'
                  required>
                  <option value='courteduree'>Courte durée</option>
                  <option value='longueduree'>Longue durée</option>
                </select>

                <div className='mt-4'>
                  <label className='block text-gray-700 mb-2'>
                    Prix (DNT/jour)
                  </label>
                  <input
                    type='number'
                    name='category-price-0'
                    value={car.categories[0]?.price || ""}
                    onChange={(e) => {
                      // Update price directly in the categories array and legacy price field
                      const updatedCategories = [...car.categories];
                      if (updatedCategories[0]) {
                        updatedCategories[0].price = e.target.value;
                        setCar({
                          ...car,
                          price: e.target.value, // Update legacy price field
                          categories: updatedCategories,
                        });
                      }
                    }}
                    className='w-full border rounded-md py-2 px-4'
                    required
                  />
                </div>
              </>
            ) : (
              <div className='space-y-4 border p-3 rounded bg-gray-50'>
                {car.categories.map((category, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <div className='flex-grow'>
                      <input
                        type='text'
                        value={
                          category.categoryType === "courteduree"
                            ? "Courte durée"
                            : "Longue durée"
                        }
                        disabled={true} // Can't change category type once added
                        className='w-full p-2 border rounded'
                        readOnly
                      />
                    </div>
                    <div className='w-1/3'>
                      <input
                        type='number'
                        name={`category-price-${index}`}
                        value={category.price}
                        onChange={handleChange}
                        placeholder='Prix'
                        className='w-full p-2 border rounded'
                        required
                      />
                    </div>
                    {car.categories.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeCategory(index)}
                        className='bg-red-100 text-red-600 p-2 rounded hover:bg-red-200'>
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}

                {car.categories.length < 2 && (
                  <button
                    type='button'
                    onClick={addCategory}
                    className='bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 w-full'>
                    Ajouter une catégorie
                  </button>
                )}
              </div>
            )}
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
