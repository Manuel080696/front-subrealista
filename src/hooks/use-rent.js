import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRentService } from '../services/add-rent-service';
import jwt_decode from 'jwt-decode';
import { CurrentUserUpdateContext } from '../context/auth-context';

export function useAddRentForm() {
  const setCurrentUser = useContext(CurrentUserUpdateContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (authToken, formData) => {
    setLoading(true);
    try {
      const response = await addRentService(authToken, formData);
      if (response.status === 'error') {
        // Manejar el error de acuerdo a lo que necesitemos
        console.error(response.message);
      } else {
        navigate('/');
        console.log('Renta creada correctamente');
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        console.error('Error de conexión');
      } else {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToken = (token) => {
    localStorage.setItem(
      `${import.meta.env.VITE_APP_CURRENT_USER_STORAGE_ID}`,
      token
    );
    const user = jwt_decode(token);
    setCurrentUser(user);
  };

  return { handleSubmit, loading, handleToken };
}
