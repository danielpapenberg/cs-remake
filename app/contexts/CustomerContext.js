'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const CustomerContext = createContext();

export function useCustomer() {
    return useContext(CustomerContext);
}

export function CustomerProvider({ children }) {
    const [customer, setCustomer] = useState(null);
    const { address } = useAccount();

    useEffect(() => {
        // Fetch customer data from the API and set it
        fetch(`/api/users?address=${address}`)
            .then(response => response.json())
            .then(data => setCustomer(data))
            .catch(error => console.error('Failed to load customer data', error));
    }, [address]);

    return (
        <CustomerContext.Provider value={customer}>
            {children}
        </CustomerContext.Provider>
    );
}
