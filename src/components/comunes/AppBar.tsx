import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AppBar =() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownAlumnosOpen, setDropdownAlumnosOpen] = useState(false);
  const [dropdownActividadesOpen, setDropdownActividadesOpen] = useState(false);
  const [dropdownConsultasOpen, setDropdownConsultasOpen] = useState(false);

  const navigate = useNavigate();

  const closeAllMenus = () => {
    setDropdownAlumnosOpen(false);
    setDropdownActividadesOpen(false);
    setDropdownConsultasOpen(false);
  };

  // Aquí podrías manejar el estado de autenticación real
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    // Lógica para cerrar sesión aquí (ej: limpiar tokens)
    setIsAuthenticated(false);
    // Podrías redirigir a la home si quieres
    navigate('/');
  };

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center text-white font-bold text-lg">
            MiApp Académica
          </div>

          {/* Menú en pantallas grandes */}
          <div className="hidden sm:flex sm:space-x-8 items-center text-lg">
            <div className="relative">
              <button
                onClick={() => {
                  closeAllMenus();
                  setDropdownAlumnosOpen(!dropdownAlumnosOpen);
                }}
                className="inline-flex items-center px-4 py-2 text-white hover:border-white focus:outline-none"
              >
                Alumnos
              </button>
              {dropdownAlumnosOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/inicialrei" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>InicialRei</Link>
                   
                    <Link to="/calculotc" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>CalculoTC</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  closeAllMenus();
                  setDropdownActividadesOpen(!dropdownActividadesOpen);
                }}
                className="inline-flex items-center px-4 py-2 text-white hover:border-white focus:outline-none"
              >
                Actividades
              </button>
              {dropdownActividadesOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/actividadest" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>ActividadesT</Link>
                    <Link to="/indicest" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>IndicesT</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  closeAllMenus();
                  setDropdownConsultasOpen(!dropdownConsultasOpen);
                }}
                className="inline-flex items-center px-4 py-2 text-white hover:border-white focus:outline-none"
              >
                Consultas
              </button>
              {dropdownConsultasOpen && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link to="/infoalu" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>Alumnos</Link>
                    <Link to="/consuopenai" className="block px-4 py-3 text-gray-800 text-base hover:bg-gray-200" onClick={closeAllMenus}>Consulta OpenAI</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Botones de Login/Logout */}
            <div className="flex space-x-4 ml-4">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {!mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menú desplegable para móviles */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/inicialrei" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>InicialRei</Link>
           
              <Link to="/calculotc" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>CalculoTC</Link>

              <Link to="/actividadest" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>ActividadesT</Link>
              <Link to="/indicest" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>IndicesT</Link>

              <Link to="/infoalu" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>Alumnos</Link>
              <Link to="/consuopenai" className="block px-4 py-2 text-white hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>Consulta OpenAI</Link>

              {/* Botones Login / Logout en móvil */}
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="block px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
