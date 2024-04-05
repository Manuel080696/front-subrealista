import { useState } from "react";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./search.css";

export default function Search({ handleFilteredPosts }) {
  const [searchTerm, setSearchTerm] = useState();
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    handleFilteredPosts(
      "rent_location=" +
        location +
        "&min_date=" +
        searchTerm?.min_date +
        "&max_date=" +
        searchTerm?.max_date +
        "&min_price=" +
        searchTerm?.min_price +
        "&max_price=" +
        searchTerm?.max_price +
        "&tenants=" +
        searchTerm?.tenants
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prevSearchTerm) => ({
      ...prevSearchTerm,
      [name]: value,
    }));
  };

  return (
    <aside className="flex flex-col w-full border-solid border-2 rounded-full min-w-min px-2 drop-shadow-md bg-white text-black">
      <form
        className="flex flex-row justify-center items-center px-4"
        onSubmit={(e) => handleSearch(e)}
      >
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Destino
          <FormControl fullWidth size="small">
            <Select
              label="¿Dónde lo buscas?"
              id="location"
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
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Fecha
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="date"
            placeholder="Fecha..."
            name="min_date"
            onChange={handleInputChange}
          />
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="date"
            placeholder="Fecha..."
            name="max_date"
            onChange={handleInputChange}
          />
        </label>
        <section className="flex gap-4">
          <TextField
            size="small"
            label="Mínimo €"
            className="w-1/2"
            name="min_price"
            onChange={handleInputChange}
          />
          <TextField
            size="small"
            label="Máximo €"
            className="w-1/2"
            name="max_price"
            onChange={handleInputChange}
          />
        </section>
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Inquilinos
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="tenants"
            name="tenants"
            id="tenants"
            placeholder="Num.inquilinos..."
            onChange={handleInputChange}
          />
        </label>
        <button className="flex align-center justify-center bg-[var(--quaternary-color)] p-4 rounded-full">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </form>
      {/* <section className="">
        <ul className="">
          {rents &&
            rents?.map((rent) => (
              <li key={rent.rentID}>
                <img
                  onClick={() => navigate(`/rents/${rent.rentID}`)}
                  src={`${import.meta.env.VITE_APP_BACKEND}/uploads/rents/${
                    rent.rentName
                  }`}
                  alt="Rent"
                ></img>
              </li>
            ))}
        </ul>
      </section> */}
    </aside>
  );
}
