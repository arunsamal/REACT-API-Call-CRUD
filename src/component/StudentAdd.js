import React, { useEffect, useState } from 'react';
import './crud.css';

export default function StudentAdd({ createStudentData, updateStudentData, initialData }) {
    const [formData, setFormData] = useState(initialData);
    const [enbleFormforAdd, setEnbleFormforAdd] = useState(false);
    const [enbleFormforUpdate, setEnbleFormforUpdate] = useState(false);
    const [enbleCreateButton, setEenbleCreateButton] = useState(true);

    useEffect(() => {
        updateState(initialData);
    }, [initialData]);

    const updateState = (initialData) => {
        setFormData(initialData);
        setEnbleFormforUpdate(initialData.id ? true : false);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.id) {
            updateStudentData(formData);
            setEnbleFormforAdd(false);
        } else {
            createStudentData(formData);
        }
        setFormData({ name: '', email: '', age: '' });
    };
    const enableStudentForm = () => {
        setEnbleFormforAdd(true);
    }
    const disableStudentForm = () => {
        setEnbleFormforAdd(false);
        setEnbleFormforUpdate(false);
        setEenbleCreateButton(enbleFormforAdd ? true : false);
    }
    return (
        <div className='inputform'>
            {
                enbleCreateButton ? (<button className="createButton" onClick={() => enableStudentForm()}>Create New Student</button>) : null
            }
            {
                enbleFormforAdd || enbleFormforUpdate ?
                    (
                        <form onSubmit={handleSubmit} >
                            <input type="text" name="name" onChange={handleInputChange} value={formData.name} placeholder="Enter Name" />
                            <input type="text" name="email" onChange={handleInputChange} value={formData.email} placeholder="Enter Email" />
                            <input type="text" name="age" onChange={handleInputChange} value={formData.age} placeholder="Enter Age" />
                            <input id='submitButton' type="submit" value={enbleFormforUpdate ? 'Upadte' : 'Save'}></input>
                            <button className="createButton" onClick={() => disableStudentForm()}>Cancel</button>
                        </form>

                    ) : null
            }



        </div>
    )
}
