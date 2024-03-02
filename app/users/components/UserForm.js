import React, { useEffect, useState } from 'react';
import FormButton from '../../components/buttons/FormButton';

const UserForm = ({ useForm, user }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue 
    } = useForm();

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach(key => {
                setValue(key, user[key]);
            });
        }

        // Fetch groups data from API
        const fetchGroups = async () => {
            try {
                const response = await fetch('/api/groups');
                if (response.ok) {
                    const data = await response.json();
                    setGroups(data);
                } else {
                    throw new Error('Failed to fetch groups');
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, [user, setValue]);

    const onSubmit = async (data, event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('group_id', data.group_id);
        // formData.append('password', data.password);
        formData.append('telegram_handle', data.telegram_handle);
        formData.append('twitter_handle', data.twitter_handle);

        const url = user ? `/api/users/${user.user_id}` : '/api/users'; 
        const method = user ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.status === 410) {
                alert('Wallet address already exists!');
            } else if (response.status === 409) {
                alert('User/E-Mail already exists!');
            } else if (response.status === 200 || response.status === 201) {
                alert('User saved successfully!');
                location.href = '/users';
            } else {
                alert('Failed to save the user. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            {/* Name Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters long' } })}
                    />
                    {errors.name && <div className='formGroupError'>{errors.name.message}</div>}
                </div>
            </div>

            {/* Email Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                    />
                    {errors.email && <div className='formGroupError'>{errors.email.message}</div>}
                </div>
            </div>

            {/* Telegram Handle Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="address">Wallet address</label>
                    <input
                        id="address"
                        type="text"
                        {...register('address', { required: 'Address is required' })} // Optional: add validation as needed
                    />
                    {errors.address && <div className='formGroupError'>{errors.address.message}</div>}
                </div>
            </div>

            {/* Groups Select Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="group_id">Group</label>
                    <select id="group_id" {...register('group_id')}>
                        <option value="">-- Select --</option>
                        {groups.map(group => (
                            <option key={group.group_id} value={group.group_id}>{group.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Password Field 
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <div className='formGroupError'>{errors.password.message}</div>}
                </div>
            </div>
            */}

            {/* Telegram Handle Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="telegram_handle">Telegram Handle</label>
                    <input
                        id="telegram_handle"
                        type="text"
                        {...register('telegram_handle')} // Optional: add validation as needed
                    />
                    {errors.telegram_handle && <div className='formGroupError'>{errors.telegram_handle.message}</div>}
                </div>
            </div>

            {/* Twitter Handle Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="twitter_handle">Twitter Handle</label>
                    <input
                        id="twitter_handle"
                        type="text"
                        {...register('twitter_handle')} // Optional: add validation as needed
                    />
                    {errors.twitter_handle && <div className='formGroupError'>{errors.twitter_handle.message}</div>}
                </div>
            </div>

            {/* Submit Button */}
            <div className='formGroup'>
                <FormButton title="Save" type="submit" className='ms-auto'>
                    Save
                </FormButton>
            </div>
        </form>
    );
};

export default UserForm;
