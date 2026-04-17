// src/RouterApp.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBar from './AppBar';


// Rutas para Alumnos


// Rutas para Actividades

//import VolcarInfoR from '../pages/Estudiantes/VolcarInfoR';

import Home from '../../pages/comunes/Home';
import Login from '../../pages/comunes/Login';
import InicialRei from '../../pages/estudiantes/InicialRei';
import CalcularTC from '../../pages/estudiantes/CalcularTC';
import ActividadesIH from '../../pages/actividades/ActividadesIH';
import IndicesTF from '../../pages/actividades/IndicesTF';
import AlumnosInfo from '../../pages/consultas/AlumnosInfo';
import ConsuOpenAI from '../../pages/consultas/ConsuOpenAI';
import AprobadasPrimerAnio from '../../pages/actividades/AprobadasPrimerAnio';
import ConsultaIndices from '../../pages/consultas/ConsultaIndices';

const RouterApp = () => {
  return (
    <BrowserRouter>
      <AppBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/inicial-reinscriptos" element={<InicialRei />} />
       
          <Route path="/set-datos-inscriptos" element={<CalcularTC />} />
          <Route path="/indice-actividades" element={<ActividadesIH />} />
          <Route path="/indice-propuesta" element={<IndicesTF />} />
          <Route path="/aprobadas-ingresantes" element={<AprobadasPrimerAnio />} />
          <Route path='/infoalu' element={<AlumnosInfo/>} />
          <Route path='/consuopenai' element={<ConsuOpenAI/>} />
          <Route path="/consulta-indices" element={<ConsultaIndices />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default RouterApp;
