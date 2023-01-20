import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);
        const data = await parseExcelData(file);
        postDataToBackend(data);
    }

    const parseExcelData = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const sheetJson = XLSX.utils.sheet_to_json(sheet);
                resolve(sheetJson);
            }
            reader.readAsArrayBuffer(file);
        });
    }

    const postDataToBackend = (data) => {
        data.forEach(row => {
            console.log(data)
            if (row.Type === 'Artiest') {
                const artiest = {
                    naam: row.Naam,
                }
                axios.post(`https://localhost:7260/api/artiest`, artiest)
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
            } else if (row.Type === 'Band') {
                const band = {
                    naam: row.Naam,
                }
                axios.post(`https://localhost:7260/api/band`, band)
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
            } else if (row.Type === 'Voorstelling') {
                const voorstelling = {
                    Name: row.NameVoorstelling,
                    beschrijving: row.Beschrijving,
                    img : row.Img
                }
                axios.post(`https://localhost:7260/api/voorstelling`, voorstelling)
                    .then(response => console.log(response))
                    .catch(error => console.log(error));
            }
        });
    }


    return (
        <>
        <h1>Upload planning</h1>
            <p>Upload hieronder een bestand met artiesten</p>
            <input placeholder='Upload Artiesten Bestand' type="file" accept=".xlsx" onChange={handleFileChange} />
        </>
    );
}

export default ExcelUpload;
