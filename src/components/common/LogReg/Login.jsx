import { useForm } from "react-hook-form";
import { useSession } from "../../../constans/Stores/useSesion";
import InputLR from "./InputLR";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
const Login = () => {
  const {login } = useSession()

    const {register, handleSubmit: onSubmit, formState:{errors}} = useForm()
    const navigate = useNavigate()
    const {mutate: postLogin} = useMutation({
      //mutationFn: postLoginFn,
      onSuccess: (userData) =>{
        
        login(userData)
        setTimeout (()=>{
          navigate("/")
        }, 1500)
      },
      
      
    })
    const handleSubmit = (data) =>{
      
      postLogin(data)
      
    }
  return (

    <div className="section text-center">
      <h4 className="mb-4 pb-3 text-white">Ingresar</h4>
      <div className="form-group">
      <form onSubmit={onSubmit(handleSubmit)}> 

      <InputLR
            error={errors.email}
            label="Email"
            name="email"
            options={{
              required: { value: true, message: "Este campo es requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                message: "Debe ser un email valido "
              }
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
                message: "La contraseña debe tener dos números y una letra mayuscula "
              }
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
export default Login;
