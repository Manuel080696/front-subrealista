import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../components/main";
import { Alert, MobileStepper, Stack } from "@mui/material";
import { RentType } from "../components/rent-type";
import { RentLocation } from "../components/rent-location";
import { RentServices } from "../components/rent-services";
import { RentImages } from "../components/rent-images";
import { RentPriceForm } from "../components/rent-price-form";
import { RentInfo } from "../components/rent-info";
import "./create-rent-form.css";
import { postRent } from "../services/post-rent";

export const CreateRentForm = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [stepData, setStepData] = useState({
    rent_type: "",
    rent_address: "",

    rent_title: "",
    rent_description: "",
    rent_rooms: 0,

    elevator: false,
    near_beach: false,
    near_mountain: false,
    hairdryer: false,
    washing_machine: false,
    ac: false,
    smoke_detector: false,
    first_kit_aid: false,
    wifi: false,
    refrigerator: false,
    freezer: false,
    toaster: false,
    fully_equipped: false,

    images: [],

    rent_price: 0,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (stepData && stepData?.rent_price !== 0) {
        const rent_id = await postRent(stepData);
        const rentId = JSON.parse(rent_id).rent_id[0].rent_id;

        await fetch(
          `${import.meta.env.VITE_APP_BACKEND}` + `/rentings/images/${rentId}`,
          {
            method: "POST",
            files: stepData?.images,
          }
        );
        navigate("/");
      } else {
        setError("Introduce un precio para tu vivienda");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  console.log(!stepData?.rent_address.includes("España"));

  console.log(stepData);

  const handleNext = () => {
    if (activeStep === 0 && !stepData?.rent_type)
      return setError("Elige un tipo de vivienda");
    if (
      activeStep === 1 &&
      (!stepData?.rent_address || !stepData?.rent_address.includes("España"))
    ) {
      return setError("Debes introducir una dirección válida dentro de España");
    }
    if (activeStep === 2 && !stepData?.rent_title) {
      return setError("Debes introducir un título a tu vivienda");
    }
    if (activeStep === 2 && !stepData?.rent_description) {
      return setError("Debes introducir una descripción para tu vivienda");
    }
    if (activeStep === 2 && !stepData?.rent_rooms) {
      return setError(
        "Debes introducir el número de habitaciones de tu vivienda"
      );
    }
    if (
      activeStep === 3 &&
      !stepData.elevator &&
      !stepData.near_beach &&
      !stepData.near_mountain &&
      !stepData.hairdryer &&
      !stepData.washing_machine &&
      !stepData.ac &&
      !stepData.smoke_detector &&
      !stepData.first_kit_aid &&
      !stepData.wifi &&
      !stepData.refrigerator &&
      !stepData.freezer &&
      !stepData.toaster &&
      !stepData.fully_equipped
    ) {
      return setError("Elige algún servicio que describa tu casa");
    }
    if (activeStep === 4 && stepData.images?.length < 5) {
      return setError("Elige al menos 5 imágenes para tu vivienda");
    }

    setActiveStep((prevStep) => (prevStep >= 5 ? prevStep + 0 : prevStep + 1));
  };

  return (
    <Main>
      <section className="flex flex-row w-full h-[58vh] space-between md:h-[63vh]">
        {activeStep === 0 && (
          <RentType setStepData={setStepData} stepData={stepData} />
        )}
        {activeStep === 1 && (
          <RentLocation setStepData={setStepData} stepData={stepData} />
        )}
        {activeStep === 2 && (
          <RentInfo setStepData={setStepData} stepData={stepData} />
        )}
        {activeStep === 3 && (
          <RentServices setStepData={setStepData} stepData={stepData} />
        )}
        {activeStep === 4 && (
          <RentImages setStepData={setStepData} stepData={stepData} />
        )}
        {activeStep === 5 && (
          <RentPriceForm setStepData={setStepData} stepData={stepData} />
        )}
        {error ? (
          <section className="fixed bottom-[64px] right-0 w-full z-20 bg-white md:bottom-0 md:w-6/12">
            <Stack spacing={2}>
              <Alert
                variant="outlined"
                severity="warning"
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </Stack>
          </section>
        ) : null}
      </section>
      <section className="flex flex-col w-full">
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
        />
        <section
          className={`flex flex-row w-full ${
            activeStep !== 0 ? "justify-between" : "justify-end"
          }`}
        >
          {activeStep !== 0 && (
            <button
              className="flex flex-col text-center w-fit bg-black text-white p-4 rounded-md"
              onClick={handleBack}
            >
              Atrás
            </button>
          )}
          {activeStep === 5 ? (
            <button
              className="flex flex-col text-center w-fit bg-black text-white p-4 rounded-md"
              onClick={onSubmit}
            >
              Enviar formulario
            </button>
          ) : (
            <button
              className="flex flex-col text-center w-fit bg-black text-white p-4 rounded-md"
              onClick={handleNext}
            >
              Siguiente
            </button>
          )}
        </section>
      </section>
    </Main>
  );
};
