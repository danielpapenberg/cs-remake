'use client';

import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useCustomer } from '../contexts/CustomerContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Calendar() {
    const [customerIcos, setCustomerIcos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEligible, setIsEligible] = useState(false);
    const customer = useCustomer();

    // Initial calendar configuration
    const [config, setConfig] = useState({
        viewType: "Week",
        startDate: DayPilot.Date.today(),
        locale: "en-us",
        eventClickHandling: "Disabled",
        headerClickHandling: "Disabled",
        durationBarVisible: false,
        heightSpec: "Full",
        cellHeight: 20,
        events: []
    });

    // Adjust startDate for navigation
    const navigate = (direction) => {
        setConfig(currentConfig => {
            // Initialize startDate as a DayPilot.Date object
            let startDate = typeof currentConfig.startDate === 'string'
                ? DayPilot.Date.parse(currentConfig.startDate, "yyyy-MM-dd")
                : currentConfig.startDate;

            // Use addDays for both forward and backward navigation
            const daysToAdd = direction === 'next' ? 7 : -7;
            const newStartDate = startDate.addDays(daysToAdd);

            // Update the config with the new start date
            return { ...currentConfig, startDate: newStartDate.toString("yyyy-MM-dd") };
        });
    };

    useEffect(() => {
        if (customer?.status === 'Valid') {
            setIsEligible(true);

            fetch(`/api/icos?type=user&address=${customer?.data.address}`, {
                method: 'GET'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setCustomerIcos(data);
                    setIsLoading(false);
                })
                .catch(error => console.error('There was a problem with your fetch operation:', error));
        } else if (customer?.status === 'Redirect') {
            window.location.href = '/';
        }
    }, [customer]);

    useEffect(() => {
        if (isEligible && customerIcos.length > 0) {
            const icoEvents = customerIcos.map(ico => {
                // Ensure dates are defined and in a proper format
                if (!ico.startdate || !ico.enddate) {
                    console.error('ICO dates are missing or incorrect', ico);
                    return null;
                }
                return {
                    id: ico.id,
                    text: ico.name + ' ICO',
                    start: new Date(ico.startdate).toISOString(), // Convert to ISO string
                    end: new Date(ico.enddate).toISOString(), // Convert to ISO string
                    backColor: "#0b0d67",
                    fontColor: "#d9d9d9"
                };
            }).filter(event => event !== null); // Filter out any events that are null due to missing dates
    
            const tgeEvents = customerIcos.map(ico => {
                if (!ico.tge) {
                    console.error('TGE date is missing or incorrect', ico);
                    return null;
                }

                const startDate = new Date(ico.tge);
                return {
                    id: ico.id + '-tge',
                    text: ico.name + ' TGE',
                    start: startDate.toISOString(), // Convert to ISO string
                    end: startDate.toISOString(),
                    backColor: "#ce5b13",
                    fontColor: "#d9d9d9"
                };
            }).filter(event => event !== null);
    
            const combinedEvents = [...icoEvents, ...tgeEvents];
    
            setConfig(prevConfig => ({ ...prevConfig, events: combinedEvents }));
        }
    }, [isEligible, customerIcos]);

    return (
        <div>
            <div className="flex gap-4 mb-10">
                <button onClick={() => navigate('prev')}>
                    <FontAwesomeIcon icon={faArrowLeft} className='h-[24px]' />
                </button>
                <button onClick={() => navigate('next')}>
                    <FontAwesomeIcon icon={faArrowRight} className='h-[24px]' />
                </button>
            </div>
            <DayPilotCalendar {...config} />
        </div>
    );
}
