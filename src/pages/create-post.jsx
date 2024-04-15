import Joi from "joi";
import { useToast } from "../hooks/use-toast";
import { addRentService } from "../services/RentCreate";
import { RentCreateForm } from "../forms/RentCreateForm/RentCreateForm";
import { Toast } from "../components/toast";
import { useLogin } from "../hooks/use-login";
import { schemaCreatePost } from "../utils/schemas";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Main } from "../components/main";

export function createPost() {
  const { toastData, showToast } = useToast();
  const navigate = useNavigate();
  const schema = schemaCreatePost;
  useLogin();

  const onSubmit = async (formValue) => {
    showToast(0, "", "");

    const resultado = await addRentService(formValue);

    if (resultado.status == "ok") {
      showToast(3000, "exito", resultado.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      showToast(3000, "error", resultado.message);
    }
  };

  return (
    <>
      <Header />
      <Main>
        <h1>Publicar Vivienda</h1>
        <RentCreateForm />
        <Toast toastData={toastData} />
      </Main>
      <Footer />
    </>
  );
}