import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '../../components/buttons/FormButton';
import { useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import BSCUSDTABI from '../../abis/bsc_usdt.json';
import BSCUSDCABI from '../../abis/bsc_usdc.json';

const PayDirect = ({ ico, user }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const amount = watch("amount");
    const receiving_address = watch("receiving_address");
    const [submitError, setSubmitError] = useState('');
    const [abiContract, setAbiContract] = useState('');
    const [contract, setContract] = useState('');

    // Setting up useContractWrite
    const { write, data, isLoading, isError, error } = useContractWrite({
        address: contract,
        abi: abiContract,
        functionName: 'transfer',
        args: [ico.wallet, ethers.utils.parseUnits(amount || '0', 18)],
        onError: (error) => {
            setSubmitError(error.message);
        },
        onSuccess: async (data) => {
            setSubmitError(''); // Clear any existing errors on success
            console.log('Transaction successful with hash:', data.hash);

            const formData = new FormData();
            formData.append('txhash', data.hash);
            formData.append('amount', amount);
            formData.append('receiving_address', receiving_address);

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
        },
    });

    // UseEffect to handle changes in isError state from useContractWrite
    useEffect(() => {
        if (isError && error) {
            setSubmitError(error.message);
        }
    }, [isError, error]);

    useEffect(() => {
        if (ico.wallet_chain === 'binance_chain' && ico.wallet_currency === 'USDT') {
            setAbiContract(BSCUSDTABI);
            setContract('0x55d398326f99059fF775485246999027B3197955');
        } else if (ico.wallet_chain === 'binance_chain' && ico.wallet_currency === 'USDC') {
            setAbiContract(BSCUSDCABI);
            setContract('0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2');
        }
    }, [ico]);

    const onSubmit = async (data) => {
        setSubmitError('');
        write(); // Trigger the contract write operation
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className='text-[40px] text-[#6A90BA] uppercase'>Pay directly with connected wallet</div>

            {/* Amount Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        className='inputStyles'
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
                    />
                </div>
                {errors.amount && <div className='formGroupError'>{errors.amount.message}</div>}
            </div>

            {/* Error Message */}
            {submitError && <div className='error'>{submitError}</div>}

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
                        className='inputStyles'
                    />
                </div>
                {errors.receiving_address && <div className='formGroupError'>{errors.receiving_address.message}</div>}
            </div>

            {/* Submit Button */}
            <div className='formGroup'>
                <FormButton title="Pay with wallet" type="submit" className='ms-auto'>
                    Pay
                </FormButton>
            </div>
        </form>
    );
};

export default PayDirect;
