import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//BrowserRouter para que cargue cierto componentes
import Layout from './layout/layout'
import Inicio from './paginas/inicio'
import Nuevocliente from './paginas/nuevocliente'
import Editarcliente from './paginas/editarcliente'
import Verclientes from './paginas/Verclientes'

function App() { 

  return (
     <BrowserRouter>
          <Routes> {/*cada ruta utiliza este componente*/}

            <Route path="/clientes" element={<Layout/>}> {/*ruta padre, grupo de rutas anidadas, es la pagina principal*/}
                <Route index element={<Inicio/>} /> {/* es una sola ruta*/}
                <Route path="nuevo" element={<Nuevocliente/>} />
                <Route path="editar/:id" element={<Editarcliente/>} />
                <Route path=":id" element={<Verclientes/>} />
            </Route>                                 {/*aca vienen anidadas las pag q van a estar en la pag principal*/}
                   
         </Routes>
     </BrowserRouter>
  )
}

export default App