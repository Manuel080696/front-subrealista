import { useRef, useState } from "react";

export const RentImages = ({ setStepData, stepData }) => {
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const submitImage = (e) => {
    e.preventDefault();
    if (e.target) {
      const files = e.target[0].files;
      if (files) {
        const filesArray = Array.from(files);

        const newImages = filesArray.map((file) => URL.createObjectURL(file));

        setSelectedImages([...selectedImages, ...newImages]);

        setStepData({ ...stepData, images: [...selectedImages, ...newImages] });
      }
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-evenly">
      <h2 className="font-semibold text-2xl md:text-3xl mb-4">
        Añade algunas imágenes de tu apartamento
      </h2>

      {/* codigo handle image previews,se asume que esta definida em handleAddFilePreview */}
      {stepData?.images?.length !== 0 && (
        <ul className="grid grid-cols-6 overflow-y-scroll gap-1">
          {stepData?.images?.map((image, index) => (
            <li key={index}>
              <img src={`${image}`} alt="rentImage" className="w-48" />
            </li>
          ))}
        </ul>
      )}

      <form
        className="flex flex-row items-center justify-center mt-4"
        onSubmit={(e) => submitImage(e)}
      >
        <label>
          <input
            className="custom-file-input"
            type="file"
            id="file-input"
            accept="image/*"
            ref={fileInputRef}
            multiple
          />{" "}
        </label>
        <button className="flex flex-col items-center justify-center bg-black text-white p-4 rounded-md">
          Añadir imágenes
        </button>
      </form>
    </section>
  );
};
