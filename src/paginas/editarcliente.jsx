import { useParams } from "react-router-dom"
import {useEffect, useState} from 'react'
import Formulario from "../components/formulario"

const editarcliente = () => {

  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  const {id} = useParams()

  //realiza la consulta hacia la api
  useEffect(() =>{
      const obtenerClienteAPI = async () => {
          try {
              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)
          } catch (error) {
            console.log("error")

          }
          setCargando(!cargando)
      }
      obtenerClienteAPI()
  }, [])

  return (
    <> 
            <h1 className="font-black text-4xl text-purple-900">Editar Cliente</h1>
              <p className="mt-3">Utiliza este formulaario para editar los datos</p>

        {cliente?.nombre ? ( //si se cumple esta linea, se ejecuta lo de abajo
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        ): <p className="text-center bg-black-500 mt-10 px-5 py-10 font-bold">Cliente ID no válido</p> }
    </>
  )
}

export default editarcliente