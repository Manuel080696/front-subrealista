import './rent-create-form.css';
import { useRef, useState } from 'react';
// import {
//   Elevator as ElevatorIcon,
//   BeachAccess as BeachAccessIcon,
//   AcUnit as AcUnitIcon,
//   Wifi as WifiIcon,
// } from '@mui/icons-material';

import ElevatorOutlinedIcon from '@mui/icons-material/ElevatorOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import SurroundSoundOutlinedIcon from '@mui/icons-material/SurroundSoundOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';

//import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
//import { handleClearFields } from '../../utils/handle-clear-fields';
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
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,

  /* Typography,
  Grid,
  TextField,*/
} from '@mui/material';
import { House, Apartment, Home, Cottage } from '@mui/icons-material';
//import { Input } from '@mui/base/Input';
import { postRent } from '../../services/post-rent';
//import { addRentService } from '../../services/rent-create';
import { useNavigate } from 'react-router-dom';
import { handleClearFields } from './../../utils/handle-clear-fields-formcreate';
import { handleServiceCheckboxChange } from './../../utils/handle-services-checkbox-formcreate';

const RentCreateForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // const { handleSubmit } = useAddRentForm();ESTE
  const [loading, setLoading] = useState(false);
  //const { handleSubmit, loading } = useAddRentForm();
  const [images, setImages] = useState([]); // almacena la imagen

  // Estados para controlar el paso actual y la información de cada paso
  const [activeStep, setActiveStep] = useState(0);

  ///const { user, userData } = useContext(CurrentUserContext);
  const [stepData, setStepData] = useState({
    rent_type: '',
    rent_location: '',
    rent_address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },

    rent_rooms: 0,
    services: {
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
    },
    title: '',
    description: '',
    basePrice: '',
    commission: '',
    totalPrice: '',
  });

  // Función para manejar el cambio de imagen

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    console.log('Archivos seleccionados:', files);
    if (files) {
      files.map((file) => {
        const url = URL.createObjectURL(file);
        console.log('URL de la imagen:', url);
        setImages((prev) => prev.concat(url));
      });
    }
  };

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const basePriceFloat = parseFloat(stepData.basePrice);
    const commissionFloat = parseFloat(stepData.commission);
    const total = basePriceFloat + commissionFloat;
    setStepData({ ...stepData, totalPrice: total.toFixed(2) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Verificar si el valor es un número entre 0 y 20
    if (!isNaN(value) && value >= 0 && value <= 20) {
      setStepData({
        ...stepData,
        [name]: value,
      });
    }
  };
  /* console.log(images); */
  // Función para manejar el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();

    // Llenar formData con los datos del formulario
    try {
      setLoading(true); //seteamos el loading a true
      // Calculamos el precio total antes de enviar el formulario
      calculateTotalPrice();
      // if (!validateImages()) return; // Validar las imágenes antes de enviar el formulario
      const formData = new FormData();

      // Agregar cada propiedad de stepData al formData
      formData.append('rent_title', stepData.title);
      formData.append('rent_type', stepData.rent_type);
      formData.append('rent_rooms', parseInt(stepData.rent_rooms));
      formData.append('rent_description', stepData.description);
      formData.append('rent_price', 0); // Agrega el precio del alquiler si es necesario
      formData.append('rent_location', stepData.rent_location);
      // Agregar cada propiedad del objeto services al FormData
      formData.append('elevator', stepData.services.elevator);
      formData.append('near_beach', stepData.services.near_beach);
      formData.append('near_mountain', stepData.services.near_mountain);
      formData.append('hairdryer', stepData.services.hairdryer);
      formData.append('washing_machine', stepData.services.washing_machine);
      formData.append('ac', stepData.services.ac);
      formData.append('smoke_detector', stepData.services.smoke_detector);
      formData.append('first_kit_aid', stepData.services.first_kit_aid);
      formData.append('wifi', stepData.services.wifi);
      formData.append('refrigerator', stepData.services.refrigerator);
      formData.append('freezer', stepData.services.freezer);
      formData.append('toaster', stepData.services.toaster);
      formData.append('fully_equipped', stepData.services.fully_equipped);

      // Agregar dirección
      const { rent_address } = stepData;
      formData.append('rent_address.street', rent_address.street);
      formData.append('rent_address.city', rent_address.city);
      formData.append('rent_address.state', rent_address.state);
      formData.append('rent_address.postalCode', rent_address.postalCode);

      const rent_id = await postRent(formData);
      const rentId = JSON.parse(rent_id).rent_id[0].rent_id;

      // Enviar imágenes por separado
      const imageFormData = new FormData();
      images.forEach((image, index) => {
        imageFormData.append(`image${index + 1}`, image);
      });

      await fetch(
        `${import.meta.env.VITE_APP_BACKEND}` + `/rentings/images/${rentId}`,
        {
          method: 'POST',
          body: imageFormData,
        }
      );

      navigate('/');
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
          <section>
            <h2 className='section-title'>Selecciona el tipo de renta</h2>
          </section>
          <section className='rent-type-container'>
            <div className='rent-type-buttons-arriba'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stepData.rent_type === 'Casa'}
                    onChange={() => handleSelectRentType('Casa')}
                    name='Casa'
                    icon={<House style={{ color: '#002222' }} />}
                  />
                }
                label='Casa'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stepData.rent_type === 'Apartamento'}
                    onChange={() => handleSelectRentType('Apartamento')}
                    name='Apartamento'
                    icon={<Apartment style={{ color: '#002222' }} />}
                  />
                }
                label='Apartamento'
              />
            </div>
            <div className='rent-type-buttons-abajo'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stepData.rent_type === 'Piso'}
                    onChange={() => handleSelectRentType('Piso')}
                    name='Piso'
                    icon={<Home style={{ color: '#002222' }} />}
                  />
                }
                label='Piso'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stepData.rent_type === 'Chalet'}
                    onChange={() => handleSelectRentType('Chalet')}
                    name='Chalet'
                    icon={<Cottage style={{ color: '#002222' }} />}
                  />
                }
                label='Chalet'
              />
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
          <section>
            <h2 className='section-title'>Ingresa tu dirección</h2>
          </section>

          <FormControl fullWidth>
            <InputLabel
              id='location-label'
              className='text-xs font-thin text-gray-400 ml-4 mt-2'
              sx={{ fontSize: '0.8rem', fontWeight: 100, color: '#bdbdbd' }}
            >
              Selecciona ubicación
            </InputLabel>

            <Select
              labelId='location-label'
              id='location'
              sx={{ minWidth: '100%', width: '100%' }}
              value={stepData.rent_location}
              name='rent_location'
              onChange={(e) =>
                setStepData({ ...stepData, rent_location: e.target.value })
              }
              inputProps={{ id: 'location-label' }}
              style={{
                fontSize: '0.8rem',
                fontWeight: 100,
                border: '1px solid #bdbdbd',
                borderRadius: '4px',
                marginTop: '16px',
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: 'auto',
                  },
                },
              }}
            >
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
            <input
              type='text'
              id='direccion'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={stepData.rent_address ? stepData.rent_address.street : ''}
              onChange={(e) =>
                setStepData({
                  ...stepData,
                  rent_address: {
                    ...stepData.rent_address,
                    street: e.target.value,
                  },
                })
              }
            />
            <label
              htmlFor='direccion'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Dirección
            </label>
          </FormControl>
          <FormControl fullWidth>
            <input
              type='text'
              id='ciudad'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={stepData.rent_address ? stepData.rent_address.city : ''}
              onChange={(e) =>
                setStepData({
                  ...stepData,
                  rent_address: {
                    ...stepData.rent_address,
                    city: e.target.value,
                  },
                })
              }
            />
            <label
              htmlFor='ciudad'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Ciudad
            </label>
          </FormControl>
          <FormControl fullWidth>
            <input
              type='text'
              id='provincia'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={stepData.rent_address ? stepData.rent_address.state : ''}
              onChange={(e) =>
                setStepData({
                  ...stepData,
                  rent_address: {
                    ...stepData.rent_address,
                    state: e.target.value,
                  },
                })
              }
            />
            <label
              htmlFor='provincia'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Provincia
            </label>
          </FormControl>
          <FormControl fullWidth>
            <input
              type='text'
              id='codigo_postal'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
              value={
                stepData.rent_address ? stepData.rent_address.postalCode : ''
              }
              onChange={(e) =>
                setStepData({
                  ...stepData,
                  rent_address: {
                    ...stepData.rent_address,
                    postalCode: e.target.value,
                  },
                })
              }
            />
            <label
              htmlFor='codigo_postal'
              className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'
            >
              Codigo Postal
            </label>
          </FormControl>
        </section>
      ),
    },
    {
      key: 'basicInfo',
      // Contenido del paso 3
      content: (
        <section>
          <section>
            <h2 className='section-title'>
              Añade información básica sobre tu espacio
            </h2>
          </section>

          <FormControl fullWidth>
            <InputLabel
              shrink
              htmlFor='rent_rooms-label'
              style={{
                fontSize: '0.8rem',
                fontWeight: 100,
                color: '#5f6266c4',
              }}
            >
              Número de dormitorios
            </InputLabel>
            <TextField
              type='number'
              name='rent_rooms'
              value={stepData.rent_rooms}
              onChange={handleInputChange}
              inputProps={{
                style: { fontSize: '0.8rem', fontWeight: 100, padding: '0' },
              }}
              style={{
                fontSize: '0.8rem',
                fontWeight: 100,
                border: '1px solid #bdbdbd',
                borderRadius: '4px',
                marginTop: '16px',
              }}
            />
          </FormControl>
        </section>
      ),
    },
    {
      key: 'services',
      // Contenido del paso 4
      content: (
        <section className='flex flex-col h-full justify-center items-center'>
          <section>
            <h2 className='section-title'>Selecciona los servicios</h2>
          </section>
          <FormControl fullWidth>
            <FormGroup>
              <div className='grid grid-cols-2'>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.elevator}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='elevator'
                      icon={
                        <ElevatorOutlinedIcon style={{ color: '#002222' }} />
                      }
                    />
                  }
                  label='Elevator'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.near_beach}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='near_beach'
                      icon={
                        <BeachAccessOutlinedIcon style={{ color: '#002222' }} />
                      }
                    />
                  }
                  label='Near the Beach'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.near_mountain}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='near_mountain'
                      icon={
                        <TerrainOutlinedIcon style={{ color: '#002222' }} />
                      }
                    />
                  }
                  label='Near the Mountain'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.hairdryer}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='hairdryer'
                      icon={<AirOutlinedIcon style={{ color: '#002222' }} />}
                    />
                  }
                  label='Hairdryer'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.washing_machine}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='washing_machine'
                      icon={
                        <LocalLaundryServiceOutlinedIcon
                          style={{ color: '#002222' }}
                        />
                      }
                    />
                  }
                  label='Washing Machine'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.ac}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='ac'
                      icon={<AcUnitOutlinedIcon style={{ color: '#002222' }} />}
                    />
                  }
                  label='Air Conditioning'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.smoke_detector}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='smoke_detector'
                      icon={
                        <SurroundSoundOutlinedIcon
                          style={{ color: '#002222' }}
                        />
                      }
                    />
                  }
                  label='Smoke Detector'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.first_kit_aid}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='first_kit_aid'
                      icon={
                        <MedicalServicesOutlinedIcon
                          style={{ color: '#002222' }}
                        />
                      }
                    />
                  }
                  label='First Aid Kit'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.wifi}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='wifi'
                      icon={<WifiOutlinedIcon style={{ color: '#002222' }} />}
                    />
                  }
                  label='Wifi'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.refrigerator}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='refrigerator'
                      icon={
                        <KitchenOutlinedIcon style={{ color: '#002222' }} />
                      }
                    />
                  }
                  label='Refrigerator'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.freezer}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='freezer'
                      icon={
                        <KitchenOutlinedIcon style={{ color: '#002222' }} />
                      }
                    />
                  }
                  label='Freezer'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.toaster}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='toaster'
                      icon={
                        <BreakfastDiningOutlinedIcon
                          style={{ color: '#002222' }}
                        />
                      }
                    />
                  }
                  label='Toaster'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stepData.services.fully_equipped}
                      onChange={(event) =>
                        handleServiceCheckboxChange(
                          event,
                          setStepData,
                          stepData
                        )
                      }
                      name='fully_equipped'
                      icon={
                        <BreakfastDiningOutlinedIcon
                          style={{ color: '#002222' }}
                        />
                      }
                    />
                  }
                  label='Fully Equipped Kitchen'
                />
              </div>
            </FormGroup>
          </FormControl>
        </section>
      ),
    },
    {
      key: 'details',
      // Contenido del paso 5
      content: (
        <section>
          <section>
            <h2 className='section-title'>
              Ponle título y una descripción a tu apartamento
            </h2>
          </section>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor='title-label'>
              Título
            </InputLabel>
            <TextField
              value={stepData.title}
              onChange={(e) =>
                setStepData({ ...stepData, title: e.target.value })
              }
              id='title-label'
              placeholder='Ingresa un título'
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel shrink htmlFor='description-label'>
              Descripción
            </InputLabel>
            <TextField
              value={stepData.description}
              onChange={(e) =>
                setStepData({ ...stepData, description: e.target.value })
              }
              id='description-label'
              placeholder='Ingresa una descripción'
              multiline
              rows={4}
            />
          </FormControl>
        </section>
      ),
    },
    {
      key: 'images',
      // Contenido del paso 6
      content: (
        <section className='images-container'>
          <section>
            <h2 className='section-title'>
              Añade algunas imágenes de tu apartamento
            </h2>
          </section>
          {/* codigo handle image previews,se asume que esta definida em handleAddFilePreview */}
          {images.length !== 0 && (
            <ul className='grid grid-cols-6 gap-4'>
              {images.map((image, index) => (
                <li key={index}>
                  <img
                    src={`${image}`}
                    alt='rentImage'
                    className='w-36  object-cover'
                  />
                </li>
              ))}
            </ul>
          )}

          <form className='conditional-img flex flex-col justify-center items-center m-10'>
            <label htmlFor=''>
              <input
                className='custom-file-input hidden'
                type='file'
                id='file-input'
                accept='image/*'
                ref={fileInputRef}
                multiple
                onChange={handleImageChange}
              />{' '}
            </label>
            <button
              type='button'
              className='flex flex-col items-center justify-center bg-black text-white p-4 rounded-md'
              onClick={() => fileInputRef.current.click()}
            >
              Añadir imágenes
            </button>
          </form>
        </section>
      ),
    },

    {
      key: 'price',
      // Contenido del paso 7
      content: (
        <section>
          <section>
            <h2 className='section-title'>Precio y disponibilidad</h2>
          </section>
          <FormControl fullWidth>
            <InputLabel
              shrink
              htmlFor='base-price-label'
              className='text-gray-500 dark:text-gray-400 text-sm font-light'
            >
              Precio base
            </InputLabel>
            <TextField
              type='number'
              value={stepData.basePrice}
              onChange={(e) =>
                setStepData({ ...stepData, basePrice: e.target.value })
              }
              id='base-price-label'
              placeholder='Ingrese el precio base'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mt-4'
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              shrink
              htmlFor='commission-label'
              className='text-gray-500 dark:text-gray-400 text-sm font-light'
            >
              Comisión
            </InputLabel>
            <TextField
              type='number'
              value={stepData.commission}
              onChange={(e) =>
                setStepData({ ...stepData, commission: e.target.value })
              }
              id='commission-label'
              placeholder='Ingrese la comisión'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mt-4'
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel
              shrink
              htmlFor='total-price-label'
              className='text-gray-500 dark:text-gray-400 text-sm font-light'
            >
              Precio total
            </InputLabel>
            <TextField
              type='text'
              value={stepData.totalPrice}
              disabled
              id='total-price-label'
              className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 mt-4'
            />
          </FormControl>
        </section>
      ),
    },
  ];

  return (
    <section className='form-container'>
      <section className='rent-create-form-container'>
        <Stepper activeStep={activeStep} className='custom-stepper'>
          {steps.map((step, index) => (
            <Step key={step.key}>
              <StepLabel
                StepIconProps={{
                  style: {
                    color:
                      index === activeStep
                        ? '#006666'
                        : step.key
                        ? '#002222'
                        : 'defaultColor',
                  },
                }}
              >
                {step.label}
              </StepLabel>
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
