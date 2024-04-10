import { useRef, useState } from 'react';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';

// Importamos componentes de Material UI
import { Stepper, Step, StepLabel, Button } from '@mui/material';

const RentCreateForm = () => {
  const fileInputRef = useRef(null);

  // Estados para controlar el paso actual y la información de cada paso
  const [activeStep, setActiveStep] = useState(0);
  const [stepData, setStepData] = useState({
    typeRent: '',
    location: '',
    address: {
      street: '',
      door: '',
      floor: '',
      staircase: '',
    },
    postalCode: '',
    city: '',
    province: '',
    basicInfo: {
      guests: 0,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
    },
    services: [],
    images: [],
    previewUrl: '',
    title: '',
    description: '',
    basePrice: '',
    commission: '',
    totalPrice: '',
  });

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setStepData({ ...stepData, images: files });
    handleAddFilePreview(e, setStepData, setPreviewUrl);
  };

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const basePriceFloat = parseFloat(stepData.basePrice);
    const commissionFloat = parseFloat(stepData.commission);
    const total = basePriceFloat + commissionFloat;
    setStepData({ ...stepData, totalPrice: total.toFixed(2) });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculamos el precio total antes de enviar el formulario
    calculateTotalPrice();

    // Aquí tendría que  realizar la lógica para enviar los datos al backend

    // Por ejemplo, tendría que crear un objeto formData y enviarlo mediante una función addRent
    // const formData = new FormData();
    // Llenar formData con los datos del formulario
    try {
      const formData = new FormData();
      formData.append('typeRent', stepData.typeRent);
      formData.append('location', stepData.location);
      formData.append('street', stepData.address.street);
      formData.append('door', stepData.address.door);
      formData.append('floor', stepData.address.floor);
      formData.append('staircase', stepData.address.staircase);
      formData.append('postalCode', stepData.postalCode);
      formData.append('city', stepData.city);
      formData.append('province', stepData.province);
      formData.append('guests', stepData.basicInfo.guests);
      formData.append('bedrooms', stepData.basicInfo.bedrooms);
      formData.append('beds', stepData.basicInfo.beds);
      formData.append('bathrooms', stepData.basicInfo.bathrooms);
      formData.append('services', stepData.services);
      formData.append('title', stepData.title);
      formData.append('description', stepData.description);
      stepData.images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      // Enviar la solicitud al backend
      const response = await fetch('URL_DEL_BACKEND', {
        method: 'POST',
        body: formData,
      });

      // Comprobar si la solicitud fue exitosa
      if (response.ok) {
        // Lógica adicional si la solicitud fue exitosa
        console.log('Formulario enviado con éxito');
      } else {
        // Lógica si la solicitud falló
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };
  const steps = [
    {
      key: 'typeRent',
      // Contenido del paso 1
      content: (
        <div>
          <h2>Selecciona el tipo de renta</h2>
          {/* Componentes para seleccionar el tipo de renta */}
        </div>
      ),
    },
    {
      key: 'location',
      // Contenido del paso 2
      content: (
        <div>
          <h2>Indica la ubicación</h2>
          {/* Componentes para ingresar la ubicación */}
        </div>
      ),
    },
    {
      key: 'basicInfo',
      // Contenido del paso 3
      content: (
        <div>
          <h2>Información básica</h2>
          {/* Componentes para ingresar la información básica */}
        </div>
      ),
    },
    {
      key: 'services',
      // Contenido del paso 4
      content: (
        <div>
          <h2>Selecciona los servicios</h2>
          {/* Componentes para seleccionar los servicios */}
        </div>
      ),
    },
    {
      key: 'images',
      content: (
        <div className='images-container'>
          {/* Code to handle image previews, assuming it's implemented in handleAddFilePreview */}
          {previewUrl && <img src={previewUrl} alt='Image preview' />}
          {!images ? (
            <div className='conditional-img'>
              <label htmlFor='file-input' className='custom-file-label'>
                <span className='span-img'>
                  <img
                    className='img-upload'
                    src='/icons/folder.png'
                    alt='upload'
                    width='150'
                    style={{ cursor: 'pointer' }}
                  />
                </span>
                <span className='span-text-img'>Subir imagen</span>
              </label>
              <input
                className='custom-file-input'
                type='file'
                id='file-input'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleImageChange}
              />{' '}
            </div>
          ) : null}
        </div>
      ),
    },
    {
      key: 'details',
      // Contenido del paso 6
      content: (
        <div>
          <h2>Agrega detalles adicionales</h2>
          {/* Componentes para ingresar detalles adicionales */}
        </div>
      ),
    },
    {
      key: 'price',
      // Contenido del paso 7
      content: (
        <div>
          <h2>Precio y disponibilidad</h2>
          {/* Componentes para ingresar el precio y la disponibilidad */}
        </div>
      ),
    },
  ];

  // ... (resto del codigos)

  return (
    <div className='rent-create-form-container'>
      <h2>Registra tu renta</h2>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.key}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].content}
      <div className='buttons-container'>
        {activeStep !== 0 && (
          <Button variant='outlined' onClick={handleBack}>
            Atrás
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button variant='contained' type='submit'>
            Enviar formulario
          </Button>
        ) : (
          <Button variant='contained' onClick={handleNext}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
}; // Closing the RentCreateForm function

export default RentCreateForm; // Exporting the component
