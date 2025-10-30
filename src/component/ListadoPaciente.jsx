import usePacientes from "../hooks/usePacientes"
import Pacientes from "./Pacientes";

const ListadoPaciente = () => {

  const { pacientes } = usePacientes();
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listados Pacientes</h2>
          
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
          </p>

          {pacientes.map(pacientes => (
            <Pacientes
              key={pacientes._id}
              pacientes={pacientes}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando Pacientes {''}
            <span className="text-indigo-600 font-bold">y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPaciente