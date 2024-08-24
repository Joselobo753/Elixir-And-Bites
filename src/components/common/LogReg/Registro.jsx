import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../constans/Stores/useSesion";
import { useForm } from "react-hook-form";
import InputLR from "./InputLR";
const Registro = () => {
  const { login } = useSession();

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { mutate: postRegister } = useMutation({
    // mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      login(userData);
      setTimeout(() => {
        navigate("/");
      }, 2500);
      reset();
    },
  });

  const handleSubmit = (data) => {
    postRegister(data);
  };
  return (
    <div className="section text-center">
      <h4 className=" text-white">Registrarse</h4>
      <div className="form-group">
        <form onSubmit={onSubmit(handleSubmit)}>
          <InputLR
            error={errors.firstname}
            label="Nombre"
            name="name"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: 3,
              maxLength: 30,
            }}
            register={register}
            placeholder="Nombre"
            icon="uil uil-user"
          />
          <InputLR
            error={errors.dni}
            label="DNI"
            name="dni"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              min: 999999,
              maxLength: 99999999,
            }}
            type="number"
            register={register}
            placeholder="DNI"
            icon="bi bi-hash"
          />
          <InputLR
            error={errors.email}
            label="Email"
            name="email"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "Debe ser un email valido ",
              },
            }}
            type="email"
            register={register}
            placeholder="Email"
            icon="uil uil-at"
          />
          <InputLR
            error={errors.password}
            label="passwords"
            name="password"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              minLength: { value: 8, message: "Mínimo 8 caracteres" },
              maxLength: { value: 15, message: "Máximo 15 caracteres" },
              pattern: {
                value: /^(?=.[A-Z])(?=(.\d){2,})[A-Za-z\d]{8,}$/,
                message:
                  "La contraseña debe tener dos números y una letra mayuscula ",
              },
            }}
            type="password"
            register={register}
            placeholder="Contraseña"
            icon="bi bi-lock-fill"
          />

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
export default Registro;
