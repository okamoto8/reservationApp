import React, { useContext, createContext, useState } from 'react'


const ReservationContext = createContext();

export const ReservationProvider = ({ children}) =>{
    const [reservationTables, setReservations] = useState([
        {id: 1, name:'予約表1'},
        {id: 2, name:'予約表2'}
    ]);

    return(
        <ReservationContext.Provider value={{reservationTables, setReservations}}>
        {children}
        </ReservationContext.Provider>
    );
}

export const useReservation = () =>{
    return useContext(ReservationContext);
}