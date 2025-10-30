import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Layout
import AuthLayout from './Layouts/AuthLayout';
import RutaProtegida from './Layouts/RutaProtegida';

// Paginas
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacienteProvider } from './context/PacientesProvider';
import AdministrarPaciente from './paginas/AdministrarPaciente'
import CambiarPassword from './paginas/CambiarPassword';
import EditarPerfil from './paginas/EditarPerfil';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
              <Route path='olvide-password' element={<OlvidePassword />} />
              <Route path='olvide-password/:token' element={<NuevoPassword />} />
              <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida />} >
              <Route index element={<AdministrarPaciente />} />
              <Route path='perfil' element={<EditarPerfil /> }/>
              <Route path='cambiar-password' element={<CambiarPassword /> }/>
            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
