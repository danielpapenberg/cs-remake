import React, { useEffect } from 'react';
import FormButton from '../../components/buttons/FormButton';
import PayDirect from './PayDirect';

const UserIcoForm = ({ useForm, ico, user }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue 
    } = useForm();

    const onSubmit = async (data, event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('txhash', data.txhash);
        formData.append('amount', data.amount);
        formData.append('receiving_address', data.receiving_address);

        try {
            const response = await fetch(`/api/users/${user.user_id}/ico?icoId=${ico.ico_id}`, {
                method: 'POST',
                body: formData,
            });

            if (response.status !== 200) {
                const data = await response.json();
                if (data.error) {
                    alert(data.error)
                    console.error("Error from API:", data.error);
                }
            } else {
                alert('Saved transaction')
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>        
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className='text-[40px] text-[#6A90BA] uppercase'>Manual Transaction</div>

                {/* Tx Hash Field */}
                <div className='formGroup'>
                    <div className='formGroupElements'>
                        <label htmlFor="txhash">Tx Hash</label>
                        <input
                            id="txhash"
                            type="text"
                            {...register('txhash', {
                                required: 'TxHash is required',
                                pattern: {
                                    value: /^0x[a-fA-F0-9]{64}$/,
                                    message: 'Invalid TxHash format'
                                }
                            })}
                        />
                    </div>
                    {errors.txhash && <div className='formGroupError'>{errors.txhash.message}</div>}
                </div>

                {/* Amount Field */}
                <div className='formGroup'>
                    <div className='formGroupElements'>
                        <label htmlFor="amount">Amount</label>
                        <input
                            id="amount"
                            type="number"
                            {...register('amount', {
                                required: 'Amount is required',
                                min: {
                                    value: ico.min_allocation,
                                    message: 'Amount must be at least ' + ico.min_allocation,
                                },
                                max: {
                                    value: ico.max_allocation,
                                    message: 'Amount must not exceed ' + ico.max_allocation,
                                }
                            })}
                            className='inputStyles'
                        />
                    </div>
                    {errors.amount && <div className='formGroupError'>{errors.amount.message}</div>}
                </div>

                {/* Receiving Address Field */}
                <div className='formGroup'>
                    <div className='formGroupElements'>
                        <label htmlFor="receiving_address">Receiving Address</label>
                        <input
                            id="receiving_address"
                            type="text"
                            {...register('receiving_address', {
                                required: 'Receiving Address is required',
                                pattern: {
                                    value: /^0x[a-fA-F0-9]{40}$/,
                                    message: 'Invalid Address format'
                                }
                            })}
                        />
                    </div>
                    {errors.receiving_address && <div className='formGroupError'>{errors.receiving_address.message}</div>}
                </div>

                {/* Submit Button */}
                <div className='formGroup'>
                    <FormButton title="Save" type="submit" className='ms-auto'>
                        Save
                    </FormButton>
                </div>

            </form>

            <PayDirect ico={ico} user={user} />
        </>
    );
};

export default UserIcoForm;
