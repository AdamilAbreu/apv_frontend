import usePacientes from "../hooks/usePacientes";

const Pacientes = ({ pacientes }) => {

  const { setEdicion, eliminarPaciente } = usePacientes();

  const { nombre, fecha, propietario, email, Sintomas, _id } = pacientes;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(nuevaFecha);
  }
  return (
    <>
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-lg">
        <p className="font-bold uppercase text-indigo-800 my-2">Nombre
          <span className="font-normal normal-case text-black">: {nombre}</span>
        </p>

        <p className="font-bold uppercase text-indigo-800 my-2">Nombre
          <span className="font-normal normal-case text-black">: {propietario}</span>
        </p>

        <p className="font-bold uppercase text-indigo-800 my-2">Nombre
          <span className="font-normal normal-case text-black">: {email}</span>
        </p>

        <p className="font-bold uppercase text-indigo-800 my-2">Nombre
          <span className="font-normal normal-case text-black">: {formatearFecha(fecha)}</span>
        </p>

        <p className="font-bold uppercase text-indigo-800 my-2">Nombre
          <span className="font-normal normal-case text-black">: {Sintomas}</span>
        </p>
        <div
          className="flex justify-between my-5"
        >
          <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700
           text-white uppercase rounded-lg font-bold"
            onClick={() => setEdicion(pacientes)}
          >Editar</button>

          <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-indigo-700
           text-white uppercase rounded-lg font-bold"
           onClick={() => eliminarPaciente(_id)}
          >Eliminar</button>

        </div>
      </div>
    </>
  )
}

export default Pacientes