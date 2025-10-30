const Alerta = ({ alerta }) => {
  // Si no hay alerta, no renderiza nada
  if (!alerta) return null;

  return (
    <>
      <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-center p-3 rounded-xl font-bold text-sm mb-7 uppercase text-white`}>
        {alerta.msg}
      </div>
    </>
  )
}

export default Alerta;