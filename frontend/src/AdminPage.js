import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VaccinationCenterTable from './VaccinationCenterTable';

function AdminPage() {
    const [vaccinationCenterDetails, setVaccinationCenterDetails] = useState({
        name: '',
        location: '',
        dosageDetails: '',
        timings: '',
    });

    const [vaccinationCenters, setVaccinationCenters] = useState([]);

    const handleInput = (event) => {
        setVaccinationCenterDetails((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://covid-vaccination-wln0.onrender.com/addVaccinationCenter', vaccinationCenterDetails)
            .then((response) => {
                console.log(response.data);
                setVaccinationCenters((prevCenters) => [...prevCenters, response.data]);
                setVaccinationCenterDetails({
                    name: '',
                    location: '',
                    dosageDetails: '',
                    timings: '',
                });
            })
            .catch((error) => {
                console.error('Error adding vaccination center:', error);
            });
    };

    const handleRemove = (centerId) => {
        axios.post('https://covid-vaccination-wln0.onrender.com/removeVaccinationCenter', { id: centerId })
            .then((response) => {
                if (response.data.success) {
                    setVaccinationCenters((prevCenters) => prevCenters.filter((center) => center.id !== centerId));
                } else {
                    console.error('Error removing vaccination center:', response.data.error);
                }
            })
            .catch((error) => {
                console.error('Error removing vaccination center:', error);
            });
    };

    const handleBook = (centerId) => {
        axios.post('https://covid-vaccination-wln0.onrender.com/bookVaccinationCenter', { id: centerId })
            .then((response) => {
                if (response.data.success) {
                    // Handle success, e.g., show a success message
                } else {
                    // Handle failure, e.g., show an error message
                }
            })
            .catch((error) => {
                console.error('Error booking vaccination center:', error);
            });
    };

    useEffect(() => {
        axios.get('https://covid-vaccination-wln0.onrender.com/getVaccinationCenters')
            .then((response) => {
                setVaccinationCenters(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vaccination centers:', error);
            });
    }, []);

    return (
        <div>
            <style>
                {`
                body {
                    background-color: #f4f4f4;
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }

                .container {
                    max-width: 1200px;
                    margin: 20px auto;
                    padding: 0 20px;
                }

                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }

                .form-container {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    font-weight: bold;
                }

                .form-group input[type="text"] {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .btn-submit {
                    display: block;
                    width: 100%;
                    padding: 10px;
                    background-color: green;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .btn-submit:hover {
                    background-color: darkgreen;
                }
                
                .vaccination-center-list {
                    margin-top: 40px;
                }

                .vaccination-center-list table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .vaccination-center-list th, .vaccination-center-list td {
                    padding: 10px;
                    border: 1px solid #ccc;
                    text-align: left;
                }

                .vaccination-center-list th {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
                `}
            </style>
            <div className="container">
                <h1 className="header">Welcome, Admin!</h1>

                <div className="form-container">
                    <h2>Add Vaccination Center</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={vaccinationCenterDetails.name} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location" value={vaccinationCenterDetails.location} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dosageDetails">Dosage Details</label>
                            <input type="text" name="dosageDetails" value={vaccinationCenterDetails.dosageDetails} onChange={handleInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="timings">Timings</label>
                            <input type="text" name="timings" value={vaccinationCenterDetails.timings} onChange={handleInput} />
                        </div>
                        <button type="submit" className="btn-submit">Add Vaccination Center</button>
                    </form>
                </div>

                <div className="vaccination-center-list">
                    <h2>Vaccination Centers List</h2>
                    <VaccinationCenterTable
                        vaccinationCenters={vaccinationCenters}
                        onRemove={handleRemove}
                        onBook={handleBook}
                        isAdmin={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;



