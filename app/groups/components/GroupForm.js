import React, { useEffect } from 'react';
import FormButton from '../../components/buttons/FormButton';

const GroupForm = ({ useForm, group }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    useEffect(() => {
        if (group) {
            Object.keys(group).forEach(key => {
                setValue(key, group[key]);
            });
        }
    }, [group, setValue]);

    const onSubmit = async (data, event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);

        const url = group ? `/api/groups/${group.group_id}` : '/api/groups';
        const method = group ? 'PUT' : 'POST';
    
        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.status === 200) {
                alert('Group saved!');
                location.href = '/groups';
            } else {
                alert(response.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={(event) => handleSubmit(onSubmit)(event)} method="POST">
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
                <FormButton title="Save" type="submit" className='ms-auto'>
                    Save
                </FormButton>
            </div>
        </form>
    );
};

export default GroupForm;
