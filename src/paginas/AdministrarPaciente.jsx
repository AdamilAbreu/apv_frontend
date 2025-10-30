import Formulario from "../component/Formulario"
import ListadoPaciente from "../component/ListadoPaciente"
import { useState } from "react"
const AdministrarPaciente = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row">

        <button
          className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3
        md:hidden rounded-md mb-10"
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          type="button">{mostrarFormulario ? 'Ocultar Formulario' : 'Msotrar Formulario'}</button>

        <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>

          <Formulario />

        </div>
        <div className="md:w-1/2 lg:w-3/5">
          <ListadoPaciente />
        </div>
      </div>
    </>
  )
}

export default AdministrarPaciente