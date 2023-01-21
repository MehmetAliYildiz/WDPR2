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

    // const GeformatteerdDatum = (date) => {
    //     const GeformatteerdeDatum = new Date(date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$2-$1'));
    //     return GeformatteerdeDatum
    // }

    const createVoorstelling = async (voorstelling) => {
        try {
            const response = await axios.post(`https://localhost:7260/api/voorstelling`, voorstelling);
            return response.data.id;
        } catch (error) {
            console.log(error);
        }
    }


    const postDataToBackend = async (data) => {
        data.forEach(async (row) => {
            if (row.Type === 'Voorstelling') {

                if (row.VoorstellingId) {
                    console.log(data)

                    console.log(row.VoorstellingId)
                    const agenda = {
                        voorstellingId: row.VoorstellingId,
                        zaalId: row.ZaalId,
                        startDatumTijd: row.StartDatumTijd,
                        eindDatumTijd: row.EindDatumTijd
                    }
                    // axios.post(`https://localhost:7260/api/agenda`, agenda)
                    //     .then(response => console.log(response))
                    //     .catch(error => console.log(error));
                } else {
                    console.log(data)
                    const voorstelling = {
                        name: row.Naam,
                        beschrijving: row.Beschrijving,
                        img: row.Img
                    }
                    const voorstellingId = await createVoorstelling(voorstelling);

                    const agenda = {
                        voorstellingId: voorstellingId,
                        zaalId: row.ZaalId,
                        startDatumTijd: row.StartDatumTijd,
                        eindDatumTijd: row.EindDatumTijd
                    }
                    axios.post(`https://localhost:7260/api/agenda`, agenda)
                        .then(response => console.log(response))
                        .catch(error => console.log(error));
                }

            }
        });
    }



    return (
        <>
            <h1>Upload planning</h1>
            <br></br>
            <h2>Artiesten</h2>
            <p>Upload hieronder een bestand met artiesten. Doe dit in het volgende formaat: De eerste kolom heeft een 'Type' en de tweede kolom heeft een 'Naam'. Vervolgens kunnen op elke rij artiesten worden geplaatst.</p>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <br></br>
            <br></br>
            <h2>Voorstellingen</h2>
            <p>Upload hieronder een bestand met voorstellingen en agenda items. De voorstellingen eerst.</p>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
        </>
    );
}

export default ExcelUpload;
