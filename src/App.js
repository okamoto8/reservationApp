import React, { useState,useEffect } from "react";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Form from "./components/form/Form";
import axios from "axios";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/reservations");
        console.log("Fetched events:", response.data);
        setEvents(response.data);

         // APIから取得したデータが適切な形式か確認
         if (Array.isArray(response.data)) {
          // データをイベント形式に変換
          const formattedEvents = response.data.map(event => ({
            id: event.userId,
            title: event.userName,
            start: event.startTime,
            end: event.endTime
          }));
          setEvents(formattedEvents);
        } else {
          console.error("Unexpected data format:", response.data);
        }


      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onmessage = (event)=> {
      const message = event.data;
      console.log("Received WebSocket message:",message);

      if (message.includes("New reservation added")){
        const reservationId = parseInt(message.split("")[4]);
        deleteEvent(reservationId)
      }
    };

    return () =>{
      ws.close();
    };
  },[]);  


  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);

  };


  const deleteEvent = (eventId) =>{
    setEvents(events.filter(event => event.id !==eventId))
  }

  return (
    <div className="app">
      <Calendar events={events} onEventDelete={deleteEvent}/>
      <Form addEvent={addEvent} />
    </div>
  );
}

export default App;
