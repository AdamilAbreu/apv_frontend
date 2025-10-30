import { use, useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../component/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword =  () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    if (email === '' || email.length < 6) {
      setAlerta({ msg: 'El email es obligatorio', error: true })
      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
      console.log({msg: data.msg});
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, 
        error:true,
      })
    }
  }
  const {msg} = alerta;
  console.log(alerta)
  return (
    <>
      <div>
        <h1
          className="text-indigo-600 font-black text-6xl"
        >Recupera tu Acceso y no Pierdas tus <span className="text-black">Pacientes</span></h1>
      </div>
      <div className='bg-indigo-200 md:bg-indigo-200 p-2 rounded-xl mt-20 md:mt-5 shadow-lg px-5'>
        {msg && <Alerta
          alerta={alerta}
        />}

        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase block text-gray-600 text-xl font-bold"
            >Email</label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email de Registro"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input type="submit"
            value='Enviar Instrucciones'
            className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className='mt-3 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-4 text-gray-500 font-bold hover:text-indigo-800'
            to="/">Ya tienes una cuenta? Inicia Sesion</Link>
          <Link
            className='block text-center my-4 text-gray-500 font-bold hover:text-indigo-800'
            to="/registrar">No tienes una cuenta? Registrate</Link>

        </nav>
      </div>
    </>
  )
}

export default OlvidePassword