import { useRef, useState } from 'react';

//import {useRent } from '../../hooks/useRent';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';

// Definición del componente RentCreateForm
const RentCreateForm = () => {
  const fileInputRef = useRef(null);

  // Utilización de useState para definir varios estados del componente
  const [category, setCategory] = useState(''); // Estado para almacenar la categoría del inmueble
  const [rent_type, setTypeRent] = useState(''); // Estado para almacenar el tipo de renta
  const [location, setLocation] = useState(''); // Estado para almacenar la locación del inmueble
  const [address, setAddress] = useState({
    // Estado para almacenar la dirección del inmueble, con subcampos de puerta, piso y escalera
    street: '',
    door: '',
    floor: '',
    staircase: '',
  });
  const [postalCode, setPostalCode] = useState(''); // Estado para almacenar el código postal del inmueble
  const [city, setCity] = useState(''); // Estado para almacenar la ciudad o población del inmueble
  const [province, setProvince] = useState(''); // Estado para almacenar la provincia del inmueble
  const [basicInfo, setBasicInfo] = useState({
    // Estado para almacenar la información básica del espacio
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });
  const [amenities, setAmenities] = useState(''); // Estado para almacenar las comodidades del espacio

  const [images, setImages] = useState([]); // Estado para almacenar las imágenes del espacio
  const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualización de la imagen
  const [loading, setLoading] = useState(false); // Estado para indicar si el formulario se está enviando

  const [rent_title, setTitle] = useState(''); // Estado para almacenar el título del apartamento
  const [description, setDescription] = useState(''); // Estado para almacenar la descripción del apartamento

  const [basePrice, setBasePrice] = useState(''); // Estado para almacenar el precio base
  const [commission, setCommission] = useState(''); // Estado para almacenar la comisión por servicio de anfitrión
  const [totalPrice, setTotalPrice] = useState(''); // Estado para almacenar el precio total

  // Función para manejar el cambio de imágenes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    handleAddFilePreview(e, setImages, setPreviewUrl); // Llamada a handleAddFilePreview
  };

  // Función para calcular el precio total
  const calculateTotalPrice = () => {
    const basePriceFloat = parseFloat(basePrice);
    const commissionFloat = parseFloat(commission);
    const total = basePriceFloat + commissionFloat;
    setTotalPrice(total.toFixed(2)); // Redondeamos el resultado a 2 decimales
  };
  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculamos el precio total antes de enviar el formulario
    calculateTotalPrice();

    // Aquí tendría que  realizar la lógica para enviar los datos al backend
    setLoading(true);
    // Por ejemplo, tendría que crear un objeto formData y enviarlo mediante una función addRent
    // const formData = new FormData();
    // Llenar formData con los datos del formulario
    try {
      const formData = new FormData();
      formData.append('category', category);
      formData.append('type_rent', rent_type);
      formData.append('location', location);
      formData.append('street', address.street);
      formData.append('door', address.door);
      formData.append('floor', address.floor);
      formData.append('staircase', address.staircase);
      formData.append('postal_code', postalCode);
      formData.append('city', city);
      formData.append('province', province);
      formData.append('guests', basicInfo.guests);
      formData.append('bedrooms', basicInfo.bedrooms);
      formData.append('beds', basicInfo.beds);
      formData.append('bathrooms', basicInfo.bathrooms);
      formData.append('amenities', amenities);
      formData.append('title', rent_title);
      formData.append('description');
      images.forEach((image, index) => {
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
        // Lógica para manejar errores si la solicitud falla
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Error:', error);
    }
    // await addRent(formData);
    setLoading(false);
  };

  return (
    <div className='rent-create-form-container'>
      <form className='rent-create-form' onSubmit={handleSubmit}>
        <h2>Registra tu renta</h2>
        {/* Campos del formulario con etiquetas label e inputs */}
        <label>
          Categoría del inmueble:
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label>
          Tipo de alojamiento:
          <select
            value={rent_type}
            onChange={(e) => setTypeRent(e.target.value)}
            required
          >
            <option value='' disabled>
              Selecciona el tipo de alojamiento
            </option>
            <option value='Chalet'>Chalet</option>
            <option value='Piso'>Piso</option>
            <option value='Casa'>Casa</option>
            <option value='Apartamento'>Apartamento</option>
          </select>
        </label>
        <label>
          Dirección:
          <input
            type='text'
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            placeholder='Calle'
            required
          />
          <input
            type='text'
            value={address.door}
            onChange={(e) => setAddress({ ...address, door: e.target.value })}
            placeholder='Puerta'
          />
          <input
            type='text'
            value={address.floor}
            onChange={(e) => setAddress({ ...address, floor: e.target.value })}
            placeholder='Piso'
          />
          <input
            type='text'
            value={address.staircase}
            onChange={(e) =>
              setAddress({ ...address, staircase: e.target.value })
            }
            placeholder='Escalera'
          />
        </label>
        <label>
          Código Postal:
          <input
            type='text'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>

        <label>
          Country:
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Localidad'
            required
          />
        </label>
        <label>
          Ciudad o población:
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Ciudad o población'
            required
          />
        </label>

        <label>
          Provincia:
          <input
            type='text'
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder='Provincia'
            required
          />
        </label>
        <label>
          Huéspedes:
          <input
            type='number'
            value={basicInfo.guests}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, guests: e.target.value })
            }
            required
          />
        </label>
        <label>
          Dormitorios:
          <input
            type='number'
            value={basicInfo.bedrooms}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, bedrooms: e.target.value })
            }
            required
          />
        </label>
        <label>
          Camas:
          <input
            type='number'
            value={basicInfo.beds}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, beds: e.target.value })
            }
            required
          />
        </label>
        <label>
          Baños:
          <input
            type='number'
            value={basicInfo.bathrooms}
            onChange={(e) =>
              setBasicInfo({ ...basicInfo, bathrooms: e.target.value })
            }
            required
          />
        </label>

        <label>
          Comodidades:
          <select
            multiple
            value={amenities}
            onChange={(e) =>
              setAmenities(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            <option value='elevator'>Ascensor</option>
            <option value='near_beach'>Cerca de la playa</option>
            <option value='near_mountain'>Cerca de la montaña</option>
            <option value='hairdryer'>Secador de pelo</option>
            <option value='washing_machine'>Lavadora</option>
            <option value='ac'>Aire acondicionado</option>
            <option value='smoke_detector'>Detector de humo</option>
            <option value='first_aid_kit'>Botiquín de primeros auxilios</option>
            <option value='wifi'>Wifi</option>
            <option value='refrigerator'>Refrigerador</option>
            <option value='freezer'>Congelador</option>
            <option value='toaster'>Tostadora</option>
            <option value='fully_equipped'>Totalmente equipado</option>
          </select>
        </label>

        <div className='img-prev-container-create'>
          {previewUrl && (
            <img
              className='img-product'
              src={previewUrl}
              alt='Previsualización'
              title='Eliminar imagen'
            />
          )}
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
        <label>
          Título del apartamento:
          <input
            type='text'
            value={rent_title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Escribe una descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Precio base:
          <input
            type='number'
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            required
          />
        </label>
        <label>
          Comisión por servicio de anfitrión:
          <input
            type='number'
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            required
          />
        </label>
        <label>
          Precio total:
          <input type='number' value={totalPrice} disabled />
        </label>
        {/* Otros campos del formulario con etiquetas label e inputs */}
        <button type='submit' disabled={loading}>
          Enviar formulario
        </button>
      </form>
    </div>
  );
};

export default RentCreateForm;
