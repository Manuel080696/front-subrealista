import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs"; // ES 2015
import "./date-calendar.css";

export function Fecha({ active: activeDate, setDateValue, dateValue }) {
  //Función adicional, creada para dar formato a la fecha.
  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  //Estado donde se guarda la fecha, pongo como inicial fecha actual.

  return (
    <section
      className={`${
        activeDate ? "flex" : "hidden"
      } flex flex-col bg-white top-24 -right-40 absolute shadow-lg rounded-xl p-12 gap-5`}
    >
      <span className="flex flex-row items-center justify-center p-2 gap-2 border rounded-full shadow-lg">
        {dateValue[0] > 1 ? (
          <p className="bg-gray-200 w-full rounded-full p-2">
            Ida: {formatDate(dateValue[0])}
          </p>
        ) : (
          <p className="bg-white w-full p-2 text-center">Ida: ...</p>
        )}
        {dateValue[1] > 1 ? (
          <p className="bg-gray-200 w-full rounded-full p-2">
            Vuelta: {formatDate(dateValue[1])}
          </p>
        ) : (
          <p className="bg-white w-full p-2 text-center">Vuelta: ...</p>
        )}
      </span>

      <Calendar
        minDate={new Date()}
        className="border-0"
        selectRange={true}
        onChange={(value) => setDateValue(value)}
        /* onChange={() => handleInputChange(new Date(dateValue))} */
        value={dateValue}
      />
    </section>
  );
}
