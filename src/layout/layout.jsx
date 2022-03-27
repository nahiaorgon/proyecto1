import {Outlet, Link, useLocation} from 'react-router-dom'



const layout = () => {

    const location = useLocation()
    const urlActual = location.pathname //compara si la url actual es un string

  return (
    <div class="md:flex md:min-h-screen">

        <div className="md:w-1/4 bg-purple-900 px-5 py-10">
            <h2 className="text-4xl font-black text-center text-white" >ADM CLIENTES</h2>
                
                <nav className="mt-10">
                    <Link 
                    className={`${urlActual==='/clientes' ? 'text-purple-300' : 'text-white'} text-white text-2xl block mt-2 hover:text-purple-400`}
                    to="/clientes">Clientes</Link>


                    <Link 
                    className={`${urlActual==='/clientes/nuevo' ? 'text-purple-300' : 'text-white'} text-white text-2xl block mt-2 hover:text-purple-400`} //el urlactual es para detectar en que pagina estoy 
                    to="/clientes/nuevo">Nuevo Cliente</Link>


                </nav>

        </div>

        <div className="md:w-3/4 p-10 md:h-screen overflow-scroll"> {/*el p-10 es para q la letra no se pegue a las orillas */}
               <Outlet/> {/*importante el lugar donde va el outlet*/}
        </div>
        
    </div>
  )
}

export default layout