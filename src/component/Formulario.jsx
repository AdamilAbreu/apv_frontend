import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [Sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({});
    const [id, setId] = useState(null)

    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            // Convertir Fecha a formato YYYY-MM-DD
            const fechaFormateada = paciente.fecha ? paciente.fecha.split('T')[0] : '';
            setFecha(fechaFormateada);
            setSintomas(paciente.Sintomas);
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario 
        if ([nombre, propietario, email, fecha, Sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });
            return;
        }


        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            Sintomas,
            id
        });
        setAlerta({
            msg: 'Guardado Correctamente'
        });
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('')
    }

    const { msg } = alerta;
    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Anade tus {''}
                <span className="text-indigo-600 font-bold">y Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md py-10 px-5 mb-10 lg:mb-5"
                action="">
                <div className="mb-5">
                    <label htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota</label>
                    <input type="text"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre de la Mascota"
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input type="text"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Propietario"
                        id="propietario"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email"
                        className="text-gray-700 uppercase font-bold"
                    >Email Propietario</label>
                    <input type="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Ingresa un Email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta</label>
                    <input type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="fecha"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="Sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Sintomas</label>
                    <textarea
                        placeholder="Describes los Sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="Sintomas"
                        value={Sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    >
                    </textarea>
                </div>

                <input
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
                    type="submit"
                    value={id ? 'Guardar Cambios' : 'Agregar Pacientes'} />
            </form>

            {msg && <Alerta
                alerta={alerta}
            />}
        </>
    )
}

export default Formulario