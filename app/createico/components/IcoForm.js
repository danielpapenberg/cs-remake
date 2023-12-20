import React, { useState } from 'react';
import FormButton from '../../components/buttons/FormButton';
import TinyMCEEditor from '../../components/TinyMCEEditor';

const IcoForm = ({ useForm }) => {
    const [desc, setDesc] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleEditorChange = (content, editor) => {
        setDesc(content);
    };

    const onSubmit = async data => {
        data.desc = desc;
        
        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('name', data.name);
        formData.append('shortdesc', data.shortdesc);
        formData.append('desc', desc);
    
        try {
            const response = await fetch('/api/ico', {
                method: 'POST',
                body: formData,
            });

            if (response.status === 200) {
                alert('Neue ICO wurde hinzugefügt!');

                // @TODO: Redirect to ico overview page
                location.reload();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method='POST'>
            {/* <div className='formGroup'>
                <label htmlFor="email">Name:</label>
                <input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div> */}

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        {...register('image', { required: 'Image is required' })}
                    />
                </div>
                {errors.image && <div className='formGroupError'>{errors.image.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters long' } })}
                    />
                </div>
                {errors.name && <div className='formGroupError'>{errors.name.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="shortdesc">Short Description</label>
                    <input
                        id="shortdesc"
                        type="text"
                        {...register('shortdesc', { required: 'Short description is required', minLength: { value: 10, message: 'Short description must be at least 10 characters long' } })}
                    />
                </div>
                {errors.shortdesc && <div className='formGroupError'>{errors.shortdesc.message}</div>}
            </div>

            <div className='formGroup'>
                <TinyMCEEditor onEditorChange={handleEditorChange} />
            </div>

            <div className='formGroup'>
                <FormButton title="Save" type="submit" className='ms-auto'>
                    Save
                </FormButton>
            </div>
        </form>
    );
};

export default IcoForm;
