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
  // const password = watch('password');
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
            name="firstname"
            options={{
              required: { value: true, message: "este campo es requerido" },
              minLength: 3,
              maxLength: 30,
            }}
            register={register}
            placeholder="Apellido"
            className="py-2"
            icon="uil uil-user"
          />
  <InputLR
  name="email"
  label="Email"
  register={register}
  options={{ required: true }}
  error={errors.email}
  icon="fa fa-envelope"
/>
<button type="submit">Ingresar</button>
</form>
</div>
</div>
);
};
export default Registro;
