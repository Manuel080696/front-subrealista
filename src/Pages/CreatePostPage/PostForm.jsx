import React, { useState } from 'react';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import HostProfile from '../../components/HostProfile/HostProfile';
import './PostForm.css';

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        place_type: '',
        insiders: '',
        rooms: '',
        bathrooms: '',
        host: '',
        host_exp: '',
        character1: '',
        character2: '',
        character3: '',
        character1_exp: '',
        character2_exp: '',
        character3_exp: '',
        place_description: '',
        service1: '',
        service2: '',
        service3: '',
        price: '',
        commission: '',
        total_price: '',
        date_start: '',
        date_end: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //Agregar código para enviar al backend
    };

    return (
        <div className="post-form-container">
            <form onSubmit={handleSubmit}>
            <input
                name="title"
                type="text"
                placeholder='Título publicación: '
                value={formData.title}
                onChange={handleInputChange}
            />
            <input
                name="place_type"
                type="select"
                placeholder='Tipo de alojamiento: '
                value={formData.place_type}
                onChange={handleInputChange}
            >
                <option value="">Selecciona una opción</option>
                <option value="option1">Selecciona una opción</option>
                <option value="option2">Selecciona una opción</option>
                <option value="option3">Selecciona una opción</option>
            </input> 
            
                <ImageUpload /* Props necesarios */ />
                <HostProfile /* Props necesarios */ />
                <button type="submit">Publicar</button>
            </form>
        </div>
    );
};

export default PostForm;
