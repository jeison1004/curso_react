// src/pages/SettingsPage.jsx
import React from 'react';

import { useStaggerFadeIn } from '../hooks/useStaggerFadeIn';
import Widget from '../components/ui/Widget';
import { usePageTransition } from '../hooks/usePageTransition';

const SettingsPage = () => {
  
  const staggerRef = useStaggerFadeIn(0.6, 0.2);
  const pageRef = usePageTransition(); 
  return (
    <div ref={pageRef} className="space-y-8 p-4">
      {/* Título Principal */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">⚙️ Configuración</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Personaliza tu experiencia y ajusta las preferencias del sistema</p>
      </div>

      {/* Pestañas de Configuración */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          General
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Notificaciones
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Seguridad
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Integraciones
        </button>
      </div>

      {/* Sección 1: Configuración General */}
      <section ref={staggerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Widget title="📋 Configuración General" delay={0.1}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                defaultValue="Mi Empresa S.A."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Idioma
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option>Español</option>
                <option>Inglés</option>
                <option>Francés</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Modo Oscuro</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Activa el tema oscuro para reducir la fatiga visual</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">Activar modo oscuro</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
              </button>
            </div>
          </div>
        </Widget>

        {/* Sección 2: Preferencias de Notificación */}
        <Widget title="🔔 Preferencias de Notificación" delay={0.2}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Recibir notificaciones por correo</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">Activar notificaciones por email</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Push</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Notificaciones en el navegador</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">Activar notificaciones push</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">SMS</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Alertas críticas por mensaje de texto</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="sr-only">Activar notificaciones por SMS</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
              </button>
            </div>
          </div>
        </Widget>
      </section>

      {/* Sección 3: Integraciones */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">🔌 Integraciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-lg flex items-center justify-center">
                G
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200">Google Analytics</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Conecta con tu cuenta de GA4</p>
            <button className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
              Conectar
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-lg flex items-center justify-center">
                S
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200">Slack</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Recibe alertas en tu workspace</p>
            <button className="w-full px-3 py-2 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
              Conectar
            </button>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 rounded-lg flex items-center justify-center">
                Z
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-800 dark:text-gray-200">Zapier</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Automatiza flujos de trabajo</p>
            <button className="w-full px-3 py-2 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
              Conectar
            </button>
          </div>
        </div>
      </section>

      {/* Sección 4: Acciones de Sistema */}
      <section ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              🗑️
            </div>
            <div>
              <h3 className="text-lg font-semibold">Borrar Datos</h3>
              <p className="text-red-100 text-sm mt-1">Elimina datos temporales</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              🔄
            </div>
            <div>
              <h3 className="text-lg font-semibold">Restablecer</h3>
              <p className="text-yellow-100 text-sm mt-1">Vuelve a valores por defecto</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-300">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              💾
            </div>
            <div>
              <h3 className="text-lg font-semibold">Guardar Cambios</h3>
              <p className="text-green-100 text-sm mt-1">Aplica todas las configuraciones</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;