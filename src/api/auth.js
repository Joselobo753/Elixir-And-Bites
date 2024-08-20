const BK_URL = import.meta.env.VITE_BACKEND_url
export const postLoginFn = async (data) => {
    const res = await fetch(`${BK_URL}users`)
    const users = await res.json();
    if(!res.ok || !Array.isArray(users)){
        throw new Error("Ocurrio un error al intentar iniciar sesion")
    }

    const foundUser = users.find((user)=>{
        return user.username === data.username
    })
    if(!foundUser){
        throw new Error("El usuario o la contraseña no es correcta")
    }
    const isPasswordTheSame = foundUser.password === data.password

    if(!isPasswordTheSame){
        throw new Error("El usuario o la contraseña no es correcta")
    }

    return  {...foundUser, password: undefined}
}
export const postRegisterFn = async (data) => {
    const res = await fetch(`${BK_URL}users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            password: data.password,
        }),
    });

    if (!res.ok) {
        throw new Error("Ocurrió un error al guardar el usuario");
    }

    const result = await res.json();

    return result;
}