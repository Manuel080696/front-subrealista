export const handleServiceCheckboxChange = (event, setStepData, stepData) => {
  const { name, checked } = event.target;
  setStepData((prevStepData) => ({
    ...prevStepData,
    services: {
      ...prevStepData.services,
      [name]: checked,
    },
  }));
  console.log('Nuevo estado de stepData:', stepData);
};
