// src/components/BouncyDotsLoader.jsx
import React from 'react';

const BouncyDotsLoader = () => {
  return (
    
    <div className="flex flex-col items-center justify-center h-48 w-full">
    {/* Barras estilo CPU */}
    <div className="flex items-end justify-center h-52 w-full gap-1">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-2 bg-blue-500 rounded-md animate-pulse"
          style={{
            animationDuration: `${0.5 + Math.random()}s`,
            height: `${Math.floor(Math.random() * 100) + 20}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  
    {/* Texto debajo */}
    <h2 className="mt-4 text-xl font-bold text-blue-900 animate-pulse">
      Procesando...
    </h2>
  </div>
  
  );
};

export default BouncyDotsLoader;
/*
 <div className="flex items-center justify-center h-full w-full">
    <div className="flex items-center gap-x-6">
      
      <div className="flex space-x-2">
        <div className="w-6 h-6 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="w-6 h-6 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.1s]"></div>
        <div className="w-6 h-6 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
      

      <h3 className="text-3xl text-black font-extrabold">Procesando...</h3>
    </div>
  </div>
  */