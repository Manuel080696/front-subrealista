import React from "react";
import Slider from "@mui/material/Slider";

export function PriceRange({ setPrice, price, activePrice }) {
  function handleChanges(event, newValue) {
    setPrice(newValue);
  }

  /*className="absolute top-16 bg-white w-max min-w-60 p-16"*/

  const handleInputChange = (index, newValue) => {
    const updatedPrice = [...price];
    updatedPrice[index] = newValue;
    setPrice(updatedPrice);
  };

  return (
    <section
      className={`${
        activePrice ? "flex" : "hidden"
      } flex flex-col w-max min-w-60 bg-white p-12 top-24 -right-40 absolute shadow-lg rounded-xl`}
    >
      <Slider
        value={price}
        onChange={handleChanges}
        valueLabelDisplay="auto"
        min={0}
        max={2000}
        sx={{ color: "gray" }}
      />
      <section className="flex flex-row items-center justify-center gap-5">
        <label>
          €
          <input
            className="border text-xs p-2 ml-1 mt-5 rounded-md font-normal"
            placeholder="Mínimo €"
            name="min_price"
            id="precioMin"
            onChange={(e) => {
              if (e.target.value > 0) {
                handleInputChange(0, parseInt(e.target.value));
              } else {
                handleInputChange(0, parseInt(0));
              }
            }}
            value={price[0]}
          />
        </label>
        <label>
          €
          <input
            className="border text-xs p-2 ml-1 mt-5 rounded-md font-normal"
            placeholder="Mínimo €"
            name="min_price"
            id="precioMin"
            onChange={(e) => {
              if (e.target.value > 0) {
                handleInputChange(1, parseInt(e.target.value));
              } else {
                handleInputChange(1, parseInt(0));
              }
            }}
            value={price[1]}
          />
        </label>
      </section>
    </section>
  );
}
