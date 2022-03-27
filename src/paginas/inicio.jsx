import {useEffect, useState} from 'react'
import ClienteP from '../components/ClienteP'

const inicio = () => {


  const [clientes, setClientes] = useState([])

  useEffect(() =>{

    const obtenerClientesAPI = async () => {
        try{
          const url = 'http://localhost:4000/clientes'
          const respuesta = await fetch(url) //para usar el metodo get
          const resultado = await respuesta.json()

          setClientes(resultado)
        }catch (error){

        }
    }

    obtenerClientesAPI()
  }, [])


  const handleEliminar = async id => {
    const confirmar = confirm('Deseas eliminar este cliente?')

    if (confirmar){
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        await respuesta.json()

        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)


      } catch (error) {
        console.log("error")
      }

    }
  }

  return (
    <>
    
    {/*igual q el "nuevo cliente" para que se vean de la misma forma*/}
    <div>
        
      <h1 className="font-black text-4xl text-purple-900">Clientes</h1>
      <p className="mt-3">Aministracion de registrados</p>


      <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-purple-800 text-white">
            <tr>
              <th className="p-2"> Nombre </th>
              <th className="p-2"> Contacto </th>
              <th className="p-2"> Empresa </th>
              <th className="p-2"> Acciones </th>
            </tr>
          </thead>


          <tbody> {/*itera sobre los clientes*/}

            {clientes.map(cliente => ( 
              <ClienteP
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
              />
              ))}

          </tbody>

      </table>
    </div>
    
  </>
  )
}

export default inicio