import { useForm } from "react-hook-form";
import { useSession } from "../../../constans/Stores/useSesion";
import InputLR from "./InputLR";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLoginFn } from "../../../api/auth";
import PropTypes from 'prop-types';
import { useState } from "react";
import Loading from "../Loading/Loading";

const Login = ({ closeModal }) => {
  const [titleText, settitleText] = useState("Ingresar");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onMutate:()=>{
      setIsLoading(true); 
      settitleText("Logueando...");
    },
    onSuccess: (userData) => {
      login(userData);
      setIsLoading(false); 
      closeModal("modalLR")
      closeModal()
        closeModal()
        navigate("/menu");
        window.location.reload();
    },
    onError: () => {
      setIsLoading(false); 
      settitleText("La contraseña o email incorrecto");
      
    },
  });

  const onSubmitHandler = (data) => {
  
    postLogin(data);
  };

  return (
    <div className="section text-center">
      <h4 className="mb-4 pb-3 text-white">{titleText}</h4>
      <div className="form-group">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <InputLR
            error={errors.email}
            label="Email"
            name="email"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Debe ser un email válido",
              },
            }}
            type="email"
            register={register}
            placeholder="Email"
            icon="uil uil-at"
          />
          <InputLR
            error={errors.password}
            label="Contraseña"
            name="password"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              maxLength: { value: 15, message: "Máximo 15 caracteres" },
              pattern: {
                value: /^(?=.*[A-Z])(?=(.*\d){2,})[A-Za-z\d]{8,}$/,
                message: "La contraseña debe tener dos números y una letra mayúscula",
              },
            }}
            type="password"
            register={register}
            placeholder="Contraseña"
            icon="bi bi-lock-fill"
          />
         {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <p className="text-white mb-3">Logueando... suele demorar</p>
        <Loading />
      </div>
          ) : (
            <button className="button-submit" type="submit">Ingresar</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
Login.propTypes = {
  closeModal: PropTypes.func.isRequired, 
};