import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRentServices } from "../services/search";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const navigate = useNavigate();
  const [rents, setRents] = useState([]);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [tenants, setTenants] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchRentServices(searchTerm);
      setRents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setSearchTerm("");
    }
  };

  return (
    <aside className="flex flex-col w-full border-solid border-2 rounded-full min-w-min px-2 drop-shadow-md bg-white text-black">
      <form
        className="flex flex-row justify-center items-center px-4"
        onSubmit={handleSearch}
      >
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200 ">
          Destino
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="destination"
            placeholder="Buscar destinos..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Fecha
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="date"
            placeholder="Fecha..."
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Precio
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="price"
            placeholder="Precio..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="flex flex-col w-4/12 bg-transparent font-medium text-sm py-4 px-5 rounded-full hover:bg-zinc-200">
          Inquilinos
          <input
            className="w-full font-normal text-xs hover:bg-zinc-200 focus:outline-none"
            type="tenants"
            placeholder="Num.inquilinos..."
            value={tenants}
            onChange={(e) => setTenants(e.target.value)}
          />
        </label>
        <button className="flex align-center justify-center bg-[var(--quaternary-color)] p-4 rounded-full">
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </form>
      <section className="">
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
      </section>
    </aside>
  );
}
