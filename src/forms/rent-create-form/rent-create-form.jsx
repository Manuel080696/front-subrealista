import './rent-create-form.css';
import { useRef, useState } from 'react';

//import { useContext, useState } from 'react'; pasar useContext aariba
//import { CurrentUserContext } from '../../context/auth-context.jsx';
// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
//import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';

//import { useAddRentForm } from '../../hooks/use-rent'; // acá estoy importando el contexto

// Importamos componentes de Material UI
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  /* Typography,
  Grid,
  TextField,*/
} from '@mui/material';
import { House, Apartment, Home, Cottage } from '@mui/icons-material';

const RentCreateForm = () => {
  //const [previewUrl, setPreviewUrl] = useState('');

  const fileInputRef = useRef(null);
  // const { handleSubmit } = useAddRentForm();ESTE
  const [loading, setLoading] = useState(false);
  //const { handleSubmit, loading } = useAddRentForm();
  const [images] = useState(null); // almacena la imagen
  const [previewUrl] = useState('');

  // Estados para controlar el paso actual y la información de cada paso
  const [activeStep, setActiveStep] = useState(0);

  ///const { user, userData } = useContext(CurrentUserContext);
  const [stepData, setStepData] = useState({
    rent_type: '',
    location: '',
    address: {
      street: '',
      door: '',
      floor: '',
      staircase: '',
    },

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
    // handleAddFilePreview(e, setStepData, setPreviewUrl);
  };

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const basePriceFloat = parseFloat(stepData.basePrice);
    const commissionFloat = parseFloat(stepData.commission);
    const total = basePriceFloat + commissionFloat;
    setStepData({ ...stepData, totalPrice: total.toFixed(2) });
  };
  const validateImages = () => {
    if (stepData.images.length < 5) {
      alert('Debe seleccionar al menos 5 imágenes');
      return false;
    }
    return true;
  };
  const handleClearFields = (e) => {
    e.preventDefault();
    setStepData({
      rent_type: '',
      location: '',
      address: {
        street: '',
        door: '',
        floor: '',
        staircase: '',
      },
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
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    // Aquí tendría que realizar la lógica para enviar los datos al backend
    // Por ejemplo, tendría que crear un objeto formData y enviarlo mediante una función
    // const formData = new FormData();

    // Llenar formData con los datos del formulario
    try {
      setLoading(true); //seteamos el loading a true
      // Calculamos el precio total antes de enviar el formulario
      calculateTotalPrice();
      if (!validateImages()) return; // Validar las imágenes antes de enviar el formulario

      const formData = new FormData();
      formData.append('rent_type', stepData.rent_type);
      formData.append('location', stepData.location);
      formData.append('street', stepData.address.street);
      formData.append('door', stepData.address.door);
      formData.append('floor', stepData.address.floor);
      formData.append('staircase', stepData.address.staircase);
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
      // const token = localStorage.getItem(
      //   `${import.meta.env.VITE_APP_CURRENT_USER_STORAGE_ID}`

      //handleToken(token)
      // await handleSubmit(formData);ESTE

      // Enviar la solicitud al backend
      // const response = await fetch('URL_DEL_BACKEND', {
      //   method: 'POST',
      //   body: formData,
      // });
      // await handleSubmit(authToken, formData);
      // Comprobar si la solicitud fue exitosa
      // if (response.ok) {
      //   // Lógica adicional si la solicitud fue exitosa
      //   console.log('Formulario enviado con éxito');
      // } else {
      //   // Lógica si la solicitud falló
      // }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleSelectRentType = (rentType) => {
    setStepData({ ...stepData, rent_type: rentType });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const steps = [
    {
      key: 'rent_type',
      // Contenido del paso 1
      content: (
        <FormControl fullWidth>
          <section className='rent-type-container'>
            {/* <h2>Selecciona el tipo de renta</h2> */}
            <div className='rent-type-buttons-arriba'>
              <Button
                variant='outlined'
                className={stepData.rent_type === 'Casa' ? 'active' : ''}
                onClick={() => handleSelectRentType('Casa')}
              >
                <House style={{ color: '002222' }} />
                <span className='texto'>Casa</span>
              </Button>
              <Button
                variant='outlined'
                className={stepData.rent_type === 'Apartamento' ? 'active' : ''}
                onClick={() => handleSelectRentType('Apartamento')}
              >
                <Apartment style={{ color: '002222' }} />
                <span className='texto'>Apartamento</span>
              </Button>
            </div>
            <div className='rent-type-buttons-abajo'>
              <Button
                variant='outlined'
                className={stepData.rent_type === 'Piso' ? 'active' : ''}
                onClick={() => handleSelectRentType('Piso')}
              >
                <Home style={{ color: '002222' }} />{' '}
                <span className='texto'>Piso</span>
              </Button>
              <Button
                variant='outlined'
                className={stepData.rent_type === 'Chalet' ? 'active' : ''}
                onClick={() => handleSelectRentType('Chalet')}
              >
                <Cottage style={{ color: '002222' }} />
                <span className='texto'>Chalet</span>
              </Button>
            </div>
          </section>
        </FormControl>
      ),
    },
    {
      key: 'location',
      // Contenido del paso 2
      content: (
        <section>
          {/* <h2>Indica la ubicación</h2> */}
          <FormControl fullWidth>
            <Select
              value={stepData.location}
              onChange={(e) =>
                setStepData({ ...stepData, location: e.target.value })
              }
            >
              <MenuItem value=''>Selecciona una ubicación</MenuItem>
              <MenuItem value='Andalucia'>Andalucia</MenuItem>
              <MenuItem value='Aragon'>Aragon</MenuItem>
              <MenuItem value='Asturias'>Asturias</MenuItem>
              <MenuItem value='Balears'>Balears</MenuItem>
              <MenuItem value='Canarias'>Canarias</MenuItem>
              <MenuItem value='Cantabria'>Cantabria</MenuItem>
              <MenuItem value='Castilla y Leon'>Castilla y Leon</MenuItem>
              <MenuItem value='Castilla La Mancha'>Castilla La Mancha</MenuItem>
              <MenuItem value='Cataluña'>Cataluña</MenuItem>
              <MenuItem value='Comunidad Valenciana'>
                Comunidad Valenciana
              </MenuItem>
              <MenuItem value='Extremadura'>Extremadura</MenuItem>
              <MenuItem value='Galicia'>Galicia</MenuItem>
              <MenuItem value='Madrid'>Madrid</MenuItem>
              <MenuItem value='Murcia'>Murcia</MenuItem>
              <MenuItem value='Navarra'>Navarra</MenuItem>
              <MenuItem value='Pais Vasco'>Pais Vasco</MenuItem>
              <MenuItem value='Rioja'>Rioja</MenuItem>
              <MenuItem value='Ceuta'>Ceuta</MenuItem>
              <MenuItem value='Melilla'>Melilla</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Dirección'
              value={stepData.address.street}
              onChange={(e) =>
                setStepData({
                  ...stepData,
                  address: { ...stepData.address, street: e.target.value },
                })
              }
            />
          </FormControl>
        </section>
      ),
    },
    {
      key: 'basicInfo',
      // Contenido del paso 3
      content: (
        <section>
          <h2>Información básica</h2>
          {/* Componentes para ingresar la información básica */}
        </section>
      ),
    },
    {
      key: 'services',
      // Contenido del paso 4
      content: (
        <section>
          <h2>Selecciona los servicios</h2>
          {/* Componentes para seleccionar los servicios */}
        </section>
      ),
    },
    {
      key: 'images',
      content: (
        <section className='images-container'>
          {/* codigo handle image previews,se asume que esta definida em handleAddFilePreview */}
          {previewUrl && <img src={previewUrl} alt='Image preview' />}
          {!images ? (
            <section className='conditional-img'>
              <label htmlFor='file-input-label' className='custom-file-label'>
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
            </section>
          ) : null}
        </section>
      ),
    },
    {
      key: 'details',
      // Contenido del paso 6
      content: (
        <section>
          <h2>Agrega detalles adicionales</h2>
          {/* Componentes para ingresar detalles adicionales */}
        </section>
      ),
    },
    {
      key: 'price',
      // Contenido del paso 7
      content: (
        <section>
          <h2>Precio y disponibilidad</h2>
          {/* Componentes para ingresar el precio y la disponibilidad */}
        </section>
      ),
    },
  ];

  return (
    <section className='form-container'>
      <section className='rent-create-form-container'>
        <h2 className='section-title'>Selecciona el tipo de renta</h2>
        <Stepper activeStep={activeStep} className='custom-stepper'>
          {steps.map((step) => (
            <Step key={step.key}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {steps[activeStep].content}
        <section className='buttons-container'>
          {/* Botón "Atrás", "Limpiar" y "Siguiente" o "Enviar formulario" */}
          {activeStep !== 0 && (
            <>
              <Button variant='outlined' onClick={handleBack}>
                Atrás
              </Button>
              <Button variant='outlined' onClick={handleClearFields}>
                Limpiar
              </Button>
            </>
          )}
          <Button
            variant='contained'
            onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}
            disabled={loading}
          >
            {loading
              ? 'Enviando...'
              : activeStep === steps.length - 1
              ? 'Enviar formulario'
              : 'Siguiente'}
          </Button>
        </section>
      </section>
    </section>
  );
};

export default RentCreateForm;
