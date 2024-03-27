import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import "./images-carrusel.css";

const RentsImages = SwipeableViews;

const images = [
  {
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export default function ImagesCarrusel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleSetActiveClass = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.classList.add("active");
    e?.target?.children[1]?.classList.add("active");
    e?.target?.children[2]?.classList.add("active");
  };

  const handleSetInactiveClass = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.classList.remove("active");
    e?.target?.children[1]?.classList.remove("active");
    e?.target?.children[2]?.classList.remove("active");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      position="relative"
      onMouseMove={(e) => handleSetActiveClass(e)}
      onMouseLeave={(e) => handleSetInactiveClass(e)}
      sx={{
        maxWidth: 270,
        maxHeight: 256,
        flexGrow: 1,
      }}
    >
      <RentsImages
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        position="relative"
        onChangeIndex={handleStepChange}
        enableMouseEvents
        key={images.id}
        className="imagesSlider"
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 256,
                  display: "block",
                  maxWidth: 270,
                  objectFit: "cover",
                  overflow: "hidden",
                  width: "100%",
                }}
                className="rounded-xl"
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </RentsImages>
      <MobileStepper
        steps={maxSteps}
        activeStep={activeStep}
        sx={{ background: "none" }}
        id="buttons"
        className="flex flex-col bg-transparent w-full ease-in duration-300"
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight
                className={`${
                  activeStep === maxSteps - 1 ? null : "text-black"
                } `}
              />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft
                className={`${activeStep !== 0 ? "text-black" : null}`}
              />
            )}
          </Button>
        }
      />
    </Box>
  );
}
