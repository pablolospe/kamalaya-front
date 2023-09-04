'use client';

import { LuPlus } from 'react-icons/lu';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function BotonAgregarAntecedenteDeAcompaniamiento(id) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
  const [formData, setFormData] = useState({
    voluntario_id: id.id,
    institucion: '',
    tareasRealizadas: '',
    detalles: '',
    fechaInicio: '',
    fechaFin: '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://kamalaya-dev.fl0.io/acompaniamiento', {
      // const response = await fetch('http://localhost:8000/acompaniamiento', {
        // const response = await fetch('https://kamalaya.onrender.com/acompaniamiento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toggleModal()
        router.refresh();
        console.log('Datos enviados exitosamente');
        
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const antecedenteAcompaniamiento = async (e) => {
  //   e.preventDefault();

  //   // ... Tu lógica para enviar el formulario ...

  //   if (response) {
  //       const response = await fetch(
  //       'https://kamalaya-dev.fl0.io/acompaniamiento',
  //       // 'http://localhost:8000/acompaniamiento',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
      

  //     toggleModal(); // Cierra el modal después de completar la acción
  //   }
  // };

  return (
    <div className="flex align-middle justify-center text-xl font-bolder bg-gray-200 hover:bg-gray-300 cursor-pointer p-2 rounded-lg">
      <button onClick={toggleModal}>
        <LuPlus />
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-800 opacity-70"></div>
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 max-h-[95%] max-w-[95%] overflow-y-auto" >
          {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Antecedente de acompañamiento                </h3>
                <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Antecedente de acompañamiento</h2> */}

            <form
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="institucion"
                    >Institución:
                  </label> 
                  <input 
                    type="text"
                    name="institucion"
                    required
                    value={formData.institucion}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  > 
                  </input> 
                </div>    
                  
                <div>
                  <label 
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="tareasRealizadas">Tareas:</label> 
                  <input 
                    type="text"
                    name="tareasRealizadas"
                    required
                    value={formData.tareasRealizadas}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  > 
                  </input> 
                </div>
                
                <div>
                  <label 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="fechaInicio">Fecha de inicio:</label> 
                  <input
                    name="fechaInicio"
                    required
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    type="date" id="fechaInicio" > 
                  </input> 
                </div>
                <div>
                  <label 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    for="fechaFin">Fecha de fin:</label> 
                  <input 
                    name="fechaFin"
                    required
                    value={formData.fechaFin}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    type="date" id="fechaFin" > 
                  </input>
                </div>
                
                <div className="sm:col-span-2">
                    <label for="detalles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles</label>
                    <textarea 
                    name="detalles"
                    value={formData.detalles}
                    onChange={handleChange}
                    id="detalles" rows="2" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Describe los detalles aquí"
                    ></textarea>                    
                </div>
                
              </div>
            
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                // onClick={(e) => antecedenteAcompaniamiento(e)}
              >
                <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                Agregar
              </button>
              {/* <button
                className="bg-gray-400 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-500"
                onClick={toggleModal}
              >
                Cancelar
              </button> */}
            </form>
          </div>
        </div>
      )}
      {/* Fin del modal */}
    </div>
  );
}

export default BotonAgregarAntecedenteDeAcompaniamiento;