import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../component/Alerta";
import clienteAxios from "../config/axios";

const nuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobrarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo Password',
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobrarToken();
  }, [])
  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: 'el Password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }
    try {
      const url = `veterinarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg
      })
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1
          className="text-indigo-600 font-black text-6xl"
        >Restablece tus Password y no pierdas Acceso a tus<span className="text-black">Pacientes</span></h1>
      </div>
      <div className='bg-indigo-200 md:bg-indigo-200 p-2 rounded-xl mt-20 md:mt-5 shadow-lg px-5'>
        {msg && <Alerta
          alerta={alerta}
        />}
        {tokenValido && (
          <>
            <form action="" onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  className="uppercase block text-gray-600 text-xl font-bold"
                >Nuevo Password</label>
                <input
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  type="password"
                  placeholder="Tu Nuevo Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input type="submit"
                value='Guardar Nuevo Password'
                className="bg-indigo-600 w-full mb-2 py-3 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
          </>
        )}
        {passwordModificado && 
          <Link
                className='block text-center my-4 text-gray-500 font-bold hover:text-indigo-800'
                to="/">Iniciar Sesion</Link>
        }
      </div>
    </>
  )
}

export default nuevoPassword