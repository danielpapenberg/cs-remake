import React, { useEffect, useState } from 'react';
import FormButton from '../../components/buttons/FormButton';
import TinyMCEEditor from '../../components/TinyMCEEditor';

const IcoForm = ({ useForm, ico }) => {
    const [desc, setDesc] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [groups, setGroups] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const [selectedGroups, setSelectedGroups] = useState([]);

    const handleGroupChange = (groupId) => {
        setSelectedGroups(prevSelectedGroups =>
            prevSelectedGroups.includes(groupId)
                ? prevSelectedGroups.filter(id => id !== groupId) // Remove the group if it was already selected
                : [...prevSelectedGroups, groupId] // Add the group if it wasn't selected
        );
    };

    const handleEditorChange = (content, editor) => {
        setDesc(content);
    };

    useEffect(() => {
        const fetchSelectedGroups = async () => {
            try {
                const response = await fetch(`/api/icos/${ico.ico_id}/groups`);
                if (response.ok) {
                    const selectedGroupsData = await response.json();
                    // Pre-check the checkboxes by setting the selectedGroups state
                    setSelectedGroups(selectedGroupsData.map(g => g.group_id));
                    // Initialize values for minAlloc and maxAlloc for each group
                    selectedGroupsData.forEach(group => {
                        setValue(`group_ids.${group.group_id}`, true); // This pre-checks the checkbox
                        setValue(`minAlloc-${group.group_id}`, group.min_allocation); // Sets initial value for minAlloc
                        setValue(`maxAlloc-${group.group_id}`, group.max_allocation); // Sets initial value for maxAlloc
                    });
                } else {
                    throw new Error('Failed to fetch selected groups');
                }
            } catch (error) {
                console.error('Error fetching selected groups:', error);
            }
        };
        

        if (ico) {
            Object.keys(ico).forEach(key => {
                if (key === 'startdate' || key === 'enddate') {
                    const formattedDate = ico[key].replace(' ', 'T').substring(0, ico[key].lastIndexOf(':'));
                    setValue(key, formattedDate);
                } else if (key === 'description') {
                    setInitialContent(ico[key]);
                } else {
                    setValue(key, ico[key]);
                }
            });
            fetchSelectedGroups(); // Fetch the selected groups for the ICO
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
    }, [ico, setValue]);
    

    const onSubmit = async data => {
        data.desc = desc;
        
        // Create a FormData object to handle file uploads
        const formData = new FormData();
        // formData.append('image', data.image[0]);
        formData.append('image', data.image);
        formData.append('name', data.name);
        formData.append('website', data.website);
        formData.append('startdate', data.startdate);
        formData.append('enddate', data.enddate);
        formData.append('wallet', data.wallet);
        formData.append('wallet_chain', data.wallet_chain);
        formData.append('wallet_currency', data.wallet_currency);
        formData.append('short_description', data.short_description);
        formData.append('desc', desc);

        const selectedGroups = Object.keys(data.group_ids).filter(groupId => data.group_ids[groupId]);
        selectedGroups.forEach(groupId => {
            formData.append('group_ids[]', groupId);
            formData.append(`minAlloc-${groupId}`, data[`minAlloc-${groupId}`] || '');
            formData.append(`maxAlloc-${groupId}`, data[`maxAlloc-${groupId}`] || '');
        });

        const url = ico ? `/api/icos/${ico.ico_id}` : '/api/icos'; 
        const method = ico ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.status === 200) {
                alert('ICO gespeichert!');

                location.href = '/icos';
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} method='POST'>
            {/* <div className='formGroup'>
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
            </div> */}

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
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="text"
                        {...register('image', {
                            pattern: {
                                value: /^(https?:\/\/.*\.(?:png|jpg|webp|jpeg|gif|svg))$/i,
                                message: 'Invalid image URL'
                            }
                        })}
                    />
                </div>
                {errors.image && <div className='formGroupError'>{errors.image.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="website">Website</label>
                    <input
                        id="website"
                        type="text"
                        {...register('website', {
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                                message: 'Invalid website URL'
                            }
                        })}
                    />
                </div>
                {errors.website && <div className='formGroupError'>{errors.website.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="telegram">Telegram</label>
                    <input
                        id="telegram"
                        type="text"
                        {...register('telegram', {
                            pattern: {
                                value: /^@[a-zA-Z0-9_]{5,32}$/,
                                message: 'Invalid Telegram username'
                            }
                        })}
                    />
                </div>
                {errors.telegram && <div className='formGroupError'>{errors.telegram.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        id="twitter"
                        type="text"
                        {...register('twitter', {
                            pattern: {
                                value: /^@[a-zA-Z0-9_]{4,15}$/,
                                message: 'Invalid Twitter username'
                            }
                        })}
                    />
                </div>
                {errors.twitter && <div className='formGroupError'>{errors.twitter.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="startdate">Start date</label>
                    <input
                        id="startdate"
                        type="datetime-local"
                        {...register('startdate', { required: 'Start date is required' })}
                    />
                </div>
                {errors.startdate && <div className='formGroupError'>{errors.startdate.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="enddate">End date</label>
                    <input
                        id="enddate"
                        type="datetime-local"
                        {...register('enddate', { required: 'End date is required' })}
                    />
                </div>
                {errors.enddate && <div className='formGroupError'>{errors.enddate.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="wallet">Wallet</label>
                    <input
                        id="wallet"
                        type="text"
                        {...register('wallet', {
                            required: 'Wallet is required',
                            pattern: {
                                value: /^0x[a-fA-F0-9]{40}$/,
                                message: 'Invalid Address format'
                            }
                        })}
                    />
                </div>
                {errors.wallet && <div className='formGroupError'>{errors.wallet.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="wallet_chain">Wallet Chain</label>
                    <select
                        id="wallet_chain"
                        {...register('wallet_chain', { required: 'Wallet Chain is required' })}
                        className='inputStyles' // Ensure your CSS applies to <select> as well
                    >
                        <option value="">Select Chain</option> {/* Default option prompting user selection */}
                        <option value="ethereum">Ethereum</option>
                        <option value="binance_chain">Binance Chain</option>
                    </select>
                </div>
                {errors.wallet_chain && <div className='formGroupError'>{errors.wallet_chain.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="wallet_currency">Wallet Currency</label>
                    <select
                        id="wallet_currency"
                        {...register('wallet_currency', { required: 'Wallet Currency is required' })}
                        className='inputStyles' 
                    >
                        <option value="">Select Currency</option>
                        <option value="USDT">USDT</option>
                        <option value="USDC">USDC</option>
                    </select>
                </div>
                {errors.wallet_currency && <div className='formGroupError'>{errors.wallet_currency.message}</div>}
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="wallet_currency">Groups</label>
                    <div className="input_wrapper">
                        {groups.map(group => (
                            <div key={group.group_id} className='select-none'>
                                <input
                                    {...register(`group_ids.${group.group_id}`)}
                                    type="checkbox"
                                    id={`group-${group.group_id}`}
                                    value={group.group_id}
                                    onChange={() => handleGroupChange(group.group_id)}
                                    checked={selectedGroups.includes(group.group_id)}
                                />
                                <label htmlFor={`group-${group.group_id}`} className='ms-2 top-[-1px] relative'>{group.name}</label>
                                {selectedGroups.includes(group.group_id) && (
                                    <>
                                        <div className='flex gap-4 mb-2 mt-2 items-center'>
                                            <label htmlFor={`minAlloc-${group.group_id}`} className='w-[180px]'>Min. Allocation</label>
                                            <input id={`minAlloc-${group.group_id}`} {...register(`minAlloc-${group.group_id}`)} type="number" />
                                        </div>
                                        <div className='flex gap-4 mb-4 items-center'>
                                            <label htmlFor={`maxAlloc-${group.group_id}`} className='w-[180px]'>Max. Allocation</label>
                                            <input id={`maxAlloc-${group.group_id}`} {...register(`maxAlloc-${group.group_id}`)} type="number" />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='formGroup'>
                <div className='formGroupElements'>
                    <label htmlFor="short_description">Short Description</label>
                    <input
                        id="short_description"
                        type="text"
                        {...register('short_description', { required: 'Short description is required', minLength: { value: 10, message: 'Short description must be at least 10 characters long' } })}
                    />
                </div>
                {errors.short_description && <div className='formGroupError'>{errors.short_description.message}</div>}
            </div>

            <div className='formGroup'>
                <TinyMCEEditor
                    onEditorChange={handleEditorChange}
                    initialContent={initialContent || ''}
                />
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
