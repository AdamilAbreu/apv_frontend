import axios from 'axios';
// crear un cliente de axios para utilizar la url
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
}) 

export default clienteAxios;