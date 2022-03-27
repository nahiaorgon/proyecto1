import React from 'react'
import { Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const formulario = ({cliente, cargando}) => { //para reutlizar componentes

    const navigate = useNavigate() //funcion que toma como valor donde le queremos mandar al usuario

    //esquima para utilizar yup, como van a ser los campos, para validarlos
    //shape utiliza los datos que van a tener los nuevos clientes
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    //.min(4, 'nombre muy corto')
                   // .max(15, 'nombre muy largo')
                    .required('Campo obligatorio'),

        empresa:Yup.string()
                    .required('Campo obligatorio'),

        email:Yup.string()
                    .email('Correo ingresado invalido')
                    .required('Campo obligatorio'),

        telefono:Yup.number()
                    .typeError('Numero invalido')
                    .integer('Numero invalido')
                    .positive('Numero invalido'),

        notas:Yup.string()
                    .typeError('No puede ingresar numeros')
    })



    const handleSubmit = async (valores) => { //try sirve para crear un nuevo registro o catch q la url esta caida  , va guardando los datos del registro nuevo en la direccion que le indico en el try
        try {
            if(cliente.id){
                let respuesta 
                //para editar el registro

                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url, { 
                    method: 'PUT',
                    body: JSON.stringify(valores), //valores del input
                    headers: { 
                        'Content-Type': 'application/json' //tipo de contenido 
                    }
                        
                })
            }else{
                //para crear un nuevo registro
                const url = 'http://localhost:4000/clientes'

                respuesta = await fetch(url, { 
                    method: 'POST', //para crear un nuevo registro .......... si no le aclaro q es post, por defecto es un get
                    body: JSON.stringify(valores),
                    headers: { 
                        'Content-Type': 'application/json' //tipo de contenido 
                    }
                        
                }) //fetch para modificar los registros
            }

            await respuesta.json()
            navigate('./clientes') //relacionado con la linea 9 y 5 para redireccionar al cliente una vez que agrego su formulario 
            
        } catch(error){ 
            console.log('error')
        }
    }

  return (
      cargando ? <Spinner/> : ( 
        <div className="bg-white mt-10 px-5 py-10 rounded-xl shadow-xl md:w-2/4 mx-auto ">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
    
    
        <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa:cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? "",
                }}
                
                enableReinitialize={true} //para usaar datos de una bd, muestra los datos de la bd en el formulario

                //obtengo los valores que envio en el formulario
                onSubmit={async (values, {resetForm}) => { //conectada con la linea 30
                    await handleSubmit(values)

                    resetForm()

                }}  


                validationSchema={
                    nuevoClienteSchema
                }
        >   

            {/*touched (relacionado con la linea 69) para que si el usuario toca la casilla nombre y no escribe nada, si se va a otro lado, le de error pq el campo sigue vacio*/}
            {({errors, touched})=> { 
            
                return (  //codigo de js, arrow function
            <Form className="mt-10">
                
                <div className="mb-4">
                    <label 
                        className="text-gray-800"
                        htmlFor="nombre">Nombre:</label>

                        <Field 
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del Cliente"
                            name="nombre" //relacionado con la linea 12 que dice tb 'nombre'
                        />
                        {/*<ErrorMessage name="nombre"/> relacionado con la linea 50*/}

                        {errors.nombre && touched.nombre ? ( //otra forma de escribir los errores
                            <Alerta>{errors.nombre}</Alerta> //me importa la alerta de la carpeta componentes para hacerla mas global
                        ) :null}            
                </div>


                <div className="mb-4">
                    <label 
                        className="text-gray-800"
                        htmlFor="empresa">Empresa:</label>

                        <Field 
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />
                        {errors.empresa && touched.empresa ? ( 
                            <Alerta>{errors.empresa}</Alerta>
                        ) :null}            

                </div>

                <div className="mb-4">
                    <label 
                        className="text-gray-800"
                        htmlFor="email">E-mail:</label>

                        <Field 
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del Cliente"
                            name="email"
                        />

                        {errors.email && touched.email ? ( 
                            <Alerta>{errors.email}</Alerta>
                        ) :null}

                </div>

                <div className="mb-4">
                    <label 
                        className="text-gray-800"
                        htmlFor="telefono">Telefono:</label>

                        <Field 
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del Cliente"
                            name="telefono"
                        />


                </div>

                <div className="mb-4">
                    <label 
                        className="text-gray-800"
                        htmlFor="notas">Notas:</label>

                        <Field 
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />


                </div>

                    <input type="submit" 
                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg" />
            </Form>

        )}} 
        </Formik>
    
    
    </div>
      )
  )
}


formulario.defaultProps = { //lleva f minuscula pq es igual q el nombre del archivo
    cliente: {},
    cargando: false
}

export default formulario