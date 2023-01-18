import React from "react";
import StoelBoeken from "./StoelBoeken";
const room = [
    { stoelnummer: 1, rang: 3 },
    { stoelnummer: 2, rang: 1 },
    { stoelnummer: 3, rang: 1 },
    { stoelnummer: 4, rang: 2 },
    { stoelnummer: 5, rang: 3 },
    { stoelnummer: 6, rang: 1 },
    { stoelnummer: 7, rang: 1 },
    { stoelnummer: 8, rang: 2 },
    { stoelnummer: 9, rang: 3 },
    { stoelnummer: 10, rang: 1 },
    { stoelnummer: 11, rang: 1 },
    { stoelnummer: 12, rang: 2 },
    { stoelnummer: 13, rang: 3 },
    { stoelnummer: 14, rang: 1 },
    { stoelnummer: 15, rang: 3 },
    { stoelnummer: 16, rang: 2 },
    { stoelnummer: 1, rang: 3 },
    { stoelnummer: 2, rang: 1 },
    { stoelnummer: 3, rang: 1 },
    { stoelnummer: 4, rang: 2 },
    { stoelnummer: 5, rang: 3 },
    { stoelnummer: 6, rang: 1 },
    { stoelnummer: 7, rang: 1 },
    { stoelnummer: 8, rang: 2 },
    { stoelnummer: 9, rang: 3 },
    { stoelnummer: 10, rang: 1 },
    { stoelnummer: 11, rang: 1 },
    { stoelnummer: 12, rang: 2 },
    { stoelnummer: 13, rang: 3 },
    { stoelnummer: 14, rang: 1 },
    { stoelnummer: 15, rang: 3 },
    { stoelnummer: 1, rang: 3 },
    { stoelnummer: 2, rang: 1 },
    { stoelnummer: 3, rang: 1 },
    { stoelnummer: 4, rang: 2 },
    { stoelnummer: 5, rang: 3 },
    { stoelnummer: 6, rang: 1 },
    { stoelnummer: 7, rang: 1 },
    { stoelnummer: 8, rang: 2 },
    { stoelnummer: 9, rang: 3 },
    { stoelnummer: 10, rang: 1 },
    { stoelnummer: 11, rang: 1 },
    { stoelnummer: 12, rang: 2 },
    { stoelnummer: 13, rang: 3 },
    { stoelnummer: 14, rang: 1 },
    { stoelnummer: 15, rang: 3 },
];

const gesorteerdeStoelen = room.sort((a, b) => a.rang - b.rang);

export default function StoelBoekenTest(){
    return(
        <StoelBoeken stoelen={gesorteerdeStoelen} />
    )
}

