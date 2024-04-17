import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs"; // ES 2015
import "./date-calendar.css";
import { useParams } from "react-router-dom";

export function Fecha({ active, setDateValue, dateValue, dateDisable }) {
  const { id } = useParams();
  //Función adicional, creada para dar formato a la fecha.
  const formatDate = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  // Función para deshabilitar las fechas seleccionadas
  const tileDisabled = ({ date }) => {
    if (!dateDisable) return false; // Si dateDisable es null, no deshabilitar ninguna fecha
    const [startDate, endDate] = dateDisable;

    const adjustedEndDate = dayjs(endDate).add(1, "day");

    return (
      dayjs(date).isAfter(startDate, "day") &&
      dayjs(date).isBefore(adjustedEndDate, "day")
    );
  };

  return id === undefined ? (
    <section
      className={`${
        active ? "flex" : "hidden"
      } flex flex-col w-full bg-white gap-5 mt-5 md:top-24 md:-right-20 md:mt-0 md:absolute md:p-6 md:shadow-lg md:rounded-xl md:12 md:w-fit`}
    >
      <span className="flex flex-row items-center justify-center p-2 gap-2 border rounded-full shadow-lg">
        {dateValue && dateValue[0] > 1 ? (
          <p className="bg-gray-200 text-xs text-center w-full rounded-full p-2 md: text-normal">
            Ida: {formatDate(dateValue[0])}
          </p>
        ) : (
          <p className="bg-white text-xs text-center w-full p-2 text-center md: text-normal">
            Ida: ...
          </p>
        )}
        {dateValue && dateValue[1] > 1 ? (
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
        value={dateValue}
      />
    </section>
  ) : (
    <section className={"flex flex-col items-center w-full bg-white"}>
      <span className="flex flex-row items-center justify-center p-2 gap-2 border rounded-full shadow-lg mb-5 min-w-96">
        {dateValue && dateValue[0] > 1 ? (
          <p className="bg-gray-200 text-xs text-center w-full rounded-full p-2 md: text-normal">
            Ida: {formatDate(dateValue[0])}
          </p>
        ) : (
          <p className="bg-white text-xs text-center w-full p-2 text-center md: text-normal">
            Ida: ...
          </p>
        )}
        {dateValue && dateValue[1] > 1 ? (
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
        className="border-0 w-full"
        selectRange={true}
        onChange={(value) => setDateValue(value)}
        value={dateValue}
        tileDisabled={tileDisabled}
      />
    </section>
  );
}
