import { useNavigate } from "react-router-dom"


const ClienteP = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()


    {/*extraigo toda la info que tengo en la api */}
    const {nombre, empresa, email, telefono, notas, id} = cliente



  return (
    <tr className="border-b hover:bg-gray-50">
        
        <td className="p-3 text-center">{nombre}</td>
        <td className="p-3 text-center">
            <p><span className="text-gray-800 uppercase font-bold"> Email: </span> {email}</p>
        
            <p><span className="text-gray-800 uppercase font-bold"> Telefono: </span> {telefono}</p>
        </td>

        <td className="p-3 text-center ">{empresa}</td>

        <td className="p-3">
            <button type="button" className="bg-pink-400 hover:bg-pink-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm md:w-2/4 mx-auto mt-2" onClick={ () => navigate(`/clientes/${id}`) }> Ver </button> 

            <button type="button" className="bg-purple-400 hover:bg-purple-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm md:w-2/4 mx-auto mt-2"  onClick={ () => navigate(`/clientes/editar/${id}`) }> Editar </button>
  
            <button type="button" className="bg-red-400 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs rounded-sm md:w-2/4 mx-auto mt-2" onClick={ () => handleEliminar(id) }> Eliminar </button>
        </td>
    </tr>
  )
}
{/*en el onclick linea 26 aparece el id de cada cliente, se une con la linea 1 y 5*/}
export default ClienteP