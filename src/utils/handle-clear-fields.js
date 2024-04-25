export const handleClearFields = (setStepData, setImages) => (e) => {
  e.preventDefault();
  setStepData({
    rent_type: '',
    location: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    basicInfo: {
      guests: 0,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },

    elevator: false,
    near_beach: false,
    near_mountain: false,
    hairdryer: false,
    washing_machine: false,
    ac: false,
    smoke_detector: false,
    first_kit_aid: false,
    wifi: false,
    refrigerator: false,
    freezer: false,
    toaster: false,
    fully_equipped: false,

    images: [],
    title: '',
    description: '',
    basePrice: '',
    commission: '',
    totalPrice: '',
  });
  setImages([]);
};
