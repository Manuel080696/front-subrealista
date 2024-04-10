import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./search.css";
import { Fecha } from "./date-calendar";
import { PriceRange } from "./price-range";

export default function Search({ handleFilteredPosts }) {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState([0, 500]);
  const [dateValue, setDateValue] = useState(new Date());
  const [tenants, setTenants] = useState(0);
  const [activeDate, setActiveDate] = useState(false);
  const [activePrice, setActivePrice] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    handleFilteredPosts(
      "rent_location=" +
        location +
        "&min_date=" +
        dateValue[0] +
        "&max_date=" +
        dateValue[1] +
        "&min_price=" +
        price[0] +
        "&max_price=" +
        price[1] +
        "&tenants=" +
        tenants
    );
  };

  return (
    <aside className="flex flex-col w-full border-solid border-2 rounded-full drop-shadow-md bg-white text-black">
      <form
        className="flex flex-row justify-center items-center height-full"
        onSubmit={(e) => handleSearch(e)}
      >
        <label className="flex flex-col w-10/12 bg-transparent font-medium text-sm py-4 px-5 rounded-l-full rounded-r-md hover:bg-zinc-200 height-full">
          Destino
          <FormControl fullWidth size="small">
            <InputLabel id="location-label">
              {location.length !== 0 ? "" : "Destino..."}
            </InputLabel>
            <Select
              id="location"
              sx={{ minWidth: "100%", width: "100%" }}
              value={location}
              name="rent_location"
              onChange={(e) => setLocation(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "scroll",
                  },
                },
              }}
            >
              <MenuItem value={"Andalucía"}>Andalucía</MenuItem>
              <MenuItem value={"Aragón"}>Aragón</MenuItem>
              <MenuItem value={"Asturias"}>Asturias</MenuItem>
              <MenuItem value={"Balears"}>Balears</MenuItem>
              <MenuItem value={"Canarias"}>Canarias</MenuItem>
              <MenuItem value={"Cantabria"}>Cantabria</MenuItem>
              <MenuItem value={"Castilla y León"}>Castilla y León</MenuItem>
              <MenuItem value={"Castilla - La Mancha"}>
                Castilla - La Mancha
              </MenuItem>
              <MenuItem value={"Catalunya"}>Catalunya</MenuItem>
              <MenuItem value={"Comunitat Valenciana"}>
                Comunitat Valenciana
              </MenuItem>
              <MenuItem value={"Extremadura"}>Extremadura</MenuItem>
              <MenuItem value={"Galicia"}>Galicia</MenuItem>
              <MenuItem value={"Madrid"}>Madrid</MenuItem>
              <MenuItem value={"Murcia"}>Murcia</MenuItem>
              <MenuItem value={"Navarra"}>Navarra</MenuItem>
              <MenuItem value={"País Vasco"}>País Vasco</MenuItem>
              <MenuItem value={"Rioja"}>Rioja</MenuItem>
              <MenuItem value={"Ceuta"}>Ceuta</MenuItem>
              <MenuItem value={"Melilla"}>Melilla</MenuItem>
            </Select>
          </FormControl>
        </label>
        <label className="flex flex-col w-6/12 bg-transparent font-medium text-sm py-4 px-5 rounded-md hover:bg-zinc-200 relative height-full">
          Fecha
          <p
            className="w-full font-normal text-xs hover:bg-zinc-200 mt-[0.43rem]"
            onClick={() => setActiveDate(!activeDate)}
          >
            {dateValue[0] !== undefined
              ? `${dateValue[0].getDate()} ${dateValue[0].toLocaleString(
                  "default",
                  { month: "short" }
                )}`
              : "Salida"}
            ,{" "}
            {dateValue[1] !== undefined
              ? `${dateValue[1].getDate()} ${dateValue[1].toLocaleString(
                  "default",
                  { month: "short" }
                )}`
              : "Llegada"}
          </p>
          <Fecha
            active={activeDate}
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
        </label>
        <label className="flex flex-col w-5/12 bg-transparent font-medium text-sm py-4 px-5 rounded-md hover:bg-zinc-200 relative height-full">
          Precio
          <p
            className="w-full min-w-[5.2rem] font-normal text-xs hover:bg-zinc-200 mt-[0.43rem]"
            onClick={() => setActivePrice(!activePrice)}
          >
            {`${price[0]}€, ${price[1]}€`}
          </p>
          <PriceRange
            setPrice={setPrice}
            price={price}
            activePrice={activePrice}
          />
        </label>
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-md hover:bg-zinc-200 height-full">
          Inquilinos
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 mt-[0.43rem] focus:outline-none"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={tenants}
            id="tenants"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            placeholder="Num.inquilinos..."
            onChange={(e) => setTenants(e.target.value)}
          />
        </label>
        <button className="flex align-center justify-center bg-gradient-to-b from-quaternary-inicio to-quaternary-fin p-4 rounded-full mx-4">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </form>
    </aside>
  );
}
