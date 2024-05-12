import { Input } from "@mui/material";

import { useEffect, useState } from "react";

export const RentPriceForm = ({ setStepData, stepData }) => {
  const [basePrice, setBasePrice] = useState();
  const commision = (basePrice * 28) / 100;
  const totalPrice = basePrice + (basePrice * 28) / 100;

  useEffect(() => {
    if (totalPrice !== 0 && !isNaN(totalPrice)) {
      setStepData({
        ...stepData,
        rent_price: parseFloat(totalPrice),
      });
    }
  }, [totalPrice]);

  return (
    <section className="flex flex-col w-full items-center justify-evenly">
      <h2 className="font-semibold text-2xl md:text-3xl">
        Precio y disponibilidad
      </h2>
      <form className="flex flex-col gap-8 w-2/12 items-center justify-center max-w-fit">
        <label className="flex flex-col font-semibold">
          Precio Base
          <Input
            type="number"
            aria-label="Precio de la vivienda"
            value={stepData.basePrice}
            onChange={(e) => setBasePrice(parseFloat(e.target.value))}
            placeholder="Introduce el precio de tu vivienda…"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          />
        </label>
        <label className="flex flex-col font-semibold">
          Comisión
          <Input
            type="number"
            aria-label="Comision"
            value={isNaN(commision) ? 0 : commision}
            readOnly={true}
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          />
        </label>
        <label className="flex flex-col font-semibold">
          Precio total
          <Input
            type="number"
            aria-label="Precio Total"
            value={isNaN(totalPrice) ? 0 : totalPrice}
            readOnly={true}
            sx={{ fontSize: "3rem", fontWeight: "bold" }}
          />
        </label>
      </form>
    </section>
  );
};
