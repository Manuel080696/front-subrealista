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
      } flex flex-col w-full bg-white gap-5 mt-5 md:top-24 md:-right-20 md:mt-0 md:absolute md:p-6 md:shadow-lg md:rounded-xl md:12 md:w-fit`}
    >
      <span className="flex flex-row items-center justify-center p-2 gap-2 border rounded-full shadow-lg">
        {dateValue[0] > 1 ? (
          <p className="bg-gray-200 text-xs text-center w-full rounded-full p-2 md: text-normal">
            Ida: {formatDate(dateValue[0])}
          </p>
        ) : (
          <p className="bg-white text-xs text-center w-full p-2 text-center md: text-normal">
            Ida: ...
          </p>
        )}
        {dateValue[1] > 1 ? (
          <p className="bg-gray-200 text-xs text-center w-full rounded-full p-2 md: text-normal">
            Vuelta: {formatDate(dateValue[1])}
          </p>
        ) : (
          <p className="bg-white w-full text-xs text-center p-2 text-center md: text-normal">
            Vuelta: ...
          </p>
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
