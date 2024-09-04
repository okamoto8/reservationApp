import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";
import jaLocale from "@fullcalendar/core/locales/ja";
import axios from "axios";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

function Calendar({ events, onEventDelete }) {
  const handleEventClick = async (clickInfo) => {
    const eventId = parseInt(clickInfo.event.id);
    console.log(`reservationId:${eventId}`)
    const eventTitle = clickInfo.event.title;
    if (window.confirm(`予約'${eventTitle}'を削除しますか？`)) {
      try {
        await axios.delete(`http://127.0.0.1:8000/reservations/${eventId}`);
        onEventDelete(eventId);
        clickInfo.event.remove();
        alert('予約の削除が完了しました')
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("予約消去中にエラーが発生しました");
      }
    }
  };

  return (
    <div className="calendar">
      <div>
        <h1><TimeToLeaveIcon />  ボデー生技室打ち合わせ机予約アプリ</h1>
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

export default Calendar;
