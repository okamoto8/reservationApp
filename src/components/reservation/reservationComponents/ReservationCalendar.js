import React from 'react';
import { useParams } from 'react-router-dom';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import axios from "axios";
import { useReservation } from '../../contexts/ReservationContext';


function ReservationCalendar({ events, onEventDelete }) {
  const { id } = useParams();
  const { reservationTables } = useReservation();
  const currentTable = reservationTables.find(table => table.id === parseInt(id));

  const addEvent = (newEvent) => {
    // ここでイベントを追加するロジックを実装
    // 例: 親コンポーネントから渡されたコールバック関数を呼び出す
    // onAddEvent(newEvent);
    console.log('新しいイベントが追加されました:', newEvent);
  };



  const handleEventClick = async (clickInfo) => {
    const eventId = parseInt(clickInfo.event.id);
    console.log(`reservationId:${eventId}`);
    const eventTitle = clickInfo.event.title;
    if (window.confirm(`予約'${eventTitle}'を削除しますか？`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/reservations/${eventId}`);
        onEventDelete(eventId);
        clickInfo.event.remove();
        alert('予約の削除が完了しました');
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("予約消去中にエラーが発生しました");
      }
    }
  };

  return (
    <div className="reservation-table">
      <div>
      <h1><TimeToLeaveIcon /> {currentTable ? currentTable.name : '予約表'}</h1>
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridDay"
          headerToolbar={{
            left: 'prev,next today',
            center: "title",
            right:'timeGridDay,timeGridWeek'
          }}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          height="auto"
          events={events}
          eventClick={handleEventClick}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: false,
            hour12: false,
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            omitZeroMinute: false,
            meridiem: false,
            hour12: false,
          }}
          locale={jaLocale}
        />
      </div>
    </div>
  );
}

export default ReservationCalendar;
