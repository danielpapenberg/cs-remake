import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormButton from '../../components/buttons/FormButton';
import { useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import BSCUSDTABI from '../../abis/bsc_usdt.json';
import BSCUSDCABI from '../../abis/bsc_usdc.json';

function getFriendlyErrorMessage(error) {
    const mappings = {
        'User denied transaction signature': {
            friendlyMessage: "Transaction Denied: Your transaction was not completed because it was rejected. Please verify the transaction details and try again, making sure to approve it in your wallet.",
            actions: "Verify the transaction details, and try submitting again.",
            help: "If you're unsure or need assistance, please reach out to our team in telegram."
        },
        'transfer amount exceeds balance': {
            friendlyMessage: "Transfer Not Completed: You attempted to send more than your current balance. Please check your balance and try again with a lower amount.",
            actions: "Please verify your current balance to ensure you have sufficient funds for both the transfer amount and the transaction fees (gas). Consider reducing the amount you're trying to send or adding more funds to your account.",
            help: "If you're unsure about how to check your balance or adjust your transaction, our support team is here to help you step by step."
        },
        'Insufficient funds for gas': {
            friendlyMessage: "Transaction Failed: You don't have enough funds to cover the transaction fees (gas).",
            actions: "Please add funds to your account or adjust the gas settings.",
            help: "If you need help adjusting your gas settings, please contact support."
        },
    };

    for (let pattern in mappings) {
        if (error.includes(pattern)) {
            return mappings[pattern];
        }
    }

    // Return a generic message if the error doesn't match any pattern
    return {
        friendlyMessage: "An unexpected error occurred. Please try again.",
        actions: "Check your wallet and network connection.",
        help: "For persistent issues, please contact our support team."
    };
}

const PayDirect = ({ ico, user }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const amount = watch("amount");
    const receiving_address = watch("receiving_address");
    const [submitError, setSubmitError] = useState('');
    const [submitAction, setSubmitAction] = useState('');
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
            const errorMessage = getFriendlyErrorMessage(error.message);
            setSubmitError(errorMessage.friendlyMessage);
            setSubmitAction(errorMessage.actions);
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

            {/* Receiving Address Field */}
            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="receiving_address">Receiving Address</label>
                    <input
                        id="receiving_address"
                        type="text"
                        className='inputStyles'
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

            {/* Error Message for web3*/}
            {
                submitError && 
                    <div className='formGroup'>
                        <div className='error text-yellow-500 italic mb-4'>
                            {submitError}
                        </div>
                        <div className='text-green-500 font-bold'>
                            {submitAction}
                        </div>
                    </div>
            }

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
