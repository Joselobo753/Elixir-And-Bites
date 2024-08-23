const BK_URL = import.meta.env.VITE_BACKEND_url;

export const postLoginFn = async (data) => {
  try {
    
    const res = await fetch(`${BK_URL}/users`);
    
    if (!res.ok) {
      throw new Error("Ocurrió un error al intentar iniciar sesión");
    }

    const users = await res.json();

    if (!Array.isArray(users)) {
      throw new Error("Datos inválidos recibidos del servidor");
    }

    const foundUser = users.find((user) => user.email === data.email);

    if (!foundUser || foundUser.password !== data.password) {
      throw new Error("El usuario o la contraseña no es correcta");
    }

    return { ...foundUser, password: undefined };
  } catch (error) {
    console.error(error);
    throw error;
  }
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
          isAdmin: false,
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