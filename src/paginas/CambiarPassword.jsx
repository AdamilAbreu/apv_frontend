import AdminNav from "../component/AdminNav"
import Alerta from "../component/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });


  const handleSubmit = async e => {
    e.preventDefault();

    console.log()
    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    // Validando el password nuevo.
    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'El password minimo debe tener 6 caracteres',
        error: true
      })
      return;
    }
    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />
      <h2 className="font-black text-xl text-center mt-10">Cambiar Password </h2>
      <p className="text-xl mt-5 mv-10 text-center">Modifica Tu {''} <span className="text-indigo-600 font-bold">Password</span></p>


      <div className="flex justify-center ">
        <div className=" w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alerta alerta={alerta} />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">Password Actual</label>
              <input type="password" className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tu Password actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label htmlFor="" className="uppercase font-bold text-gray-600">Password Actual</label>
              <input
                type="password"
                className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                name="pwd_nuevo"
                placeholder="Escribe tu nuevo Password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input type="submit"
              className="bg-indigo-700 px-10 py-3 cursor-pointer font-bold text-white rounded-lg
                 uppercase  mt-5 w-full"
              value="Actualizar Password" />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword