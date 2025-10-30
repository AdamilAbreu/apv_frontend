import { use, useEffect, useState } from "react";
import AdminNav from "../component/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../component/Alerta";

const EditarPerfil = () => {

    const {auth , actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta]= useState({});
    useEffect(() => {
        setPerfil(auth);
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil;

        if([nombre, email].includes('')){
            setAlerta({
                msg: 'Email y Nombre son obligatorio',
                error:true
            })
            return;
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }

    const { msg } = alerta;
  return (
    <>
    <AdminNav />
     <h2 className="font-black text-xl text-center mt-10">Editar Perfil</h2>
    <p className="text-xl mt-5 mb-10 text-center">Modifica Tu {''} <span className="text-indigo-600 font-bold">Informacion</span></p>

    <div className="flex justify-center ">
        <div className=" w-full md:w-1/2 bg-white shadow rounded-lg p-5">

            {msg && <Alerta alerta={alerta} />}
            <form
            onSubmit={handleSubmit}
            >
                <div className="my-3">
                    <label htmlFor="" className="uppercase font-bold text-gray-600">Nombre</label>
                    <input type="text" className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                    name="nombre"
                    value={perfil.nombre || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })} 
                    />
                </div>

                <div className="my-3">
                    <label htmlFor="" className="uppercase font-bold text-gray-600">Sitio Web</label>
                    <input type="text" className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                    name="web"
                    value={perfil.web || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })} 
                     />
                </div>

                 <div className="my-3">
                    <label htmlFor="" className="uppercase font-bold text-gray-600">Telefono</label>
                    <input type="text" className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                    name="telefono"
                    value={perfil.telefono || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })} 
                     />
                </div>

                 <div className="my-3">
                    <label htmlFor="" className="uppercase font-bold text-gray-600">Email</label>
                    <input
                    type="email"
                    className=" border bg-gray-50 w-full mt-5 p-2 rounded-lg"
                    name="email"
                    value={perfil.email || ''}
                    onChange={e => setPerfil({
                        ...perfil,
                        [e.target.name] : e.target.value
                    })} 
                     />
                </div>

                <input type="submit"
                className="bg-indigo-700 px-10 py-3 cursor-pointer font-bold text-white rounded-lg
                 uppercase  mt-5 w-full" 
                  value="Guardar Cambios"/>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditarPerfil