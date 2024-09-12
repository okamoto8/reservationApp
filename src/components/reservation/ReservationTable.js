import React from 'react'
import ReservationCalendar from './reservationComponents/ReservationCalendar'
import ReservationForm from './reservationComponents/ReservationForm'

function ReservationTable() {
  return (
    <div>
      <ReservationCalendar/>
      <ReservationForm/>

    </div>
  )
}

export default ReservationTable
