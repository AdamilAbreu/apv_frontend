import { createContext, useState, useEffect, Children, useEffectEvent, use } from "react";
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth'

const PacientesContext = createContext();

export const PacienteProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [auth])

    const eliminarPaciente = async id => {
        const confirmar = confirm('Confirmas que deseas eliminar?')
        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(p => p._id !== id);
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                // Actualiza la lista completa de pacientes
                const pacienteActualizado = pacientes.map(p => p._id === data._id ? data : p)
                setPacientes(pacienteActualizado);
                setPaciente({});
            } catch (error) {
                console.log(error.response?.data?.msg || 'Error al actualizar paciente')
            }
        } else {
            try {
                const { data } = await
                    clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg || 'Error al guardar el paciente')
            }
        }

    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;