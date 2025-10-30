import { Link } from "react-router-dom"
import {useState} from 'react';
import Alerta from "../component/Alerta";
import clienteAxios from '../config/axios';
const Registrar = () => {

  const [ nombre, setNombre] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ repetirPassword,  setRepetirPassword] = useState('');
  const [ alerta, setAlerta] = useState({});

  const handleSubmit = async e => {

    e.preventDefault();
    // Todos los campos son obligatorios
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error:true});
      return;
    }
    // El password y repetir password debe se iguales.
    if(password !== repetirPassword){
      setAlerta({msg: 'Los Password no son iguales', error:true});
      return;
    }
    // El password debe contener al menos 8 caracteres.
    if(password.length < 8){
     setAlerta({msg: 'El Password es muy corto, agrega minimo 6 caracteres', error:true}); 
      return;
    }
    setAlerta({})
    // Crear el usuario en la api
    try {
       await clienteAxios.post('/veterinarios', {nombre, email, password})
        setAlerta({msg: 'Creado correctamente, revisa tu email', 
        error: false
       })
    } catch (error) {
      // Mostrar mensaje desde el backend
      const {msg} = error.response?.data || 'Error al registrar usuario';
      setAlerta({
        msg: msg,
        error: true
      })
    }
  }   
  
  const {msg} = alerta;     
  return (
    <>
      <div>
            <h1
            className="text-indigo-600 font-black text-6xl"
            >Crea tu cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>

        <div  className='bg-indigo-200 md:bg-indigo-200 p-2 rounded-xl mt-20 md:mt-5 shadow-lg px-5'>
          {msg && <Alerta
            alerta={alerta}
          />}
            <form action="" onSubmit={handleSubmit}>
              <div className="my-5">
                    <label
                     className="uppercase block text-gray-600 text-xl font-bold"
                    >Nombre</label>
                    <input 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="text"
                    placeholder="Tu Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                     />
                </div>
                <div className="my-5">
                    <label
                     className="uppercase block text-gray-600 text-xl font-bold"
                    >Email</label>
                    <input 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="email"
                    placeholder="Email de Registro"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                     />
                </div>
                <div className="my-5">
                    <label
                     className="uppercase block text-gray-600 text-xl font-bold"
                    >Password</label>
                    <input 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="password"
                    placeholder="Tu Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                     />
                </div>
                 <div className="my-5">
                    <label
                     className="uppercase block text-gray-600 text-xl font-bold"
                    >Repetir Password</label>
                    <input 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                    type="password"
                    placeholder="Repite tu Password"
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                     />
                </div>
                <input type="submit"
                value='Crear Cuenta'
                className="bg-indigo-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"  />
            </form>
             <nav className='mt-4 lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-4 text-gray-500 font-bold hover:text-indigo-800'
                    to="/">Ya tienes una cuenta?</Link>
                <Link 
                    className='block text-center my-4 text-gray-500 font-bold hover:text-indigo-800'
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>
        </div>


    </>
  )
}

export default Registrar