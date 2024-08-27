import { decodeJWT } from "../utilities/decodeJWT";

const BK_URL = import.meta.env.VITE_BACKEND_URL;

export const postLoginFn = async (data) => {
  
  const res = await fetch(`${BK_URL} /auth/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  const resData = await res.json()
  if (!res.ok) {
    throw new Error(resData.message || "ocurrio un problema mami")
    
  }
  const token = resData.data
  const userData = decodeJWT(token).user

 sessionStorage.setItem("token", token)

  return userData
};

export const postRegisterFn = async (data) => {
  try {
    const res = await fetch(`${BK_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        dni: data.dni,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      throw new Error("Ocurrió un error al guardar el usuario");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};