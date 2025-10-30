import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    if (cargando) return 'cargando..';
    console.log('Desde Ruta protegida', auth);

    return (
        <>
            <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />

        </>
    )
}

export default RutaProtegida