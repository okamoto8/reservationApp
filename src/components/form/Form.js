import React, { useState } from "react";
import "./Form.css";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import CustomTimePicker from "./CustomTimePicker";

function Form({ addEvent }) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(
    dayjs().startOf("day").hour(12).minute(0)
  );
  const [endTime, setEndTime] = useState(
    dayjs().startOf("day").hour(13).minute(0)
  );
  //開始日（終了日）、開始時間（終了時間）の結合
  const combineDateTime = (date, time) => {
    return dayjs(date).hour(time.hour()).minute(time.minute()).second(0);
  };

  const handleDateChange = (newDate, isStart) => {
    if (isStart) {
      setStartTime(combineDateTime(newDate, startTime));
      setEndTime(combineDateTime(newDate, endTime));
    }
  };

  const handleTimeChange = (newTime, isStart) => {
    if (isStart) {
      setStartTime(combineDateTime(startTime, newTime));
    } else {
      setEndTime(combineDateTime(endTime, newTime));
    }
  };

  const reservationSubmit = async (e) => {
    e.preventDefault();
    if (!name || !startTime || !endTime) {
      alert("名前、開始時間、終了時間を入力してください");
      return;
    }

    if (startTime.isAfter(endTime) || startTime.isSame(endTime)) {
      alert("開始時刻は終了時刻より前に設定してください");
      return;
    }

    const newEvent = {
      userName: name,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };

    console.log("Sending data:", newEvent);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/reservations",
        newEvent,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);

      addEvent({
        id: response.data.userId,
        title: response.data.userName,
        start: response.data.startTime,
        end: response.data.endTime,
      });
      console.log(addEvent);

      alert("予約が正常に行われました！");

      setName("");
      setStartTime(dayjs().startOf("day").hour(12).minute(0));
      setEndTime(dayjs().startOf("day").hour(13).minute(0));
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("予約の送信中にエラーが発生しました。");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form className="form" onSubmit={reservationSubmit}>
      <div className="form-group-day">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="開始日"
            value={startTime}
            onKeyDown={handleKeyDown}
            onChange={(newValue) => handleDateChange(newValue, true)}
            className="customDatePicker"
          />
          <div className="form-group-time">
            <CustomTimePicker
              label="開始時間"
              value={startTime}
              ampm={false}
              onChange={(newValue) => handleTimeChange(newValue, true)}
              className="customTimePicker"
            />
            <CustomTimePicker
              label="終了時間"
              value={endTime}
              ampm={false}
              onChange={(newValue) => handleTimeChange(newValue, false)}
              className="customTimePicker"
            />
          </div>
        </LocalizationProvider>
      </div>
      <div className="form-group-name">
        <label></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Gr 氏名を入力してください"
          className="nameForm"
        />
      </div>
      <div className="buttonForm">
        <input type="submit" value="登録" className="button" />
      </div>
    </form>
  );
}

export default Form;
