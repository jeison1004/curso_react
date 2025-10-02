// src/pages/DashboardPage.jsx
import React from 'react';


import Widget from '../components/ui/Widget';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import BarChart from '../components/ui/BarChart';
// animaciones
import { usePageTransition } from '../hooks/usePageTransition';
import { useStaggerFadeIn } from '../hooks/useStaggerFadeIn';
import { useProgressAnimation } from '../hooks/useProgressAnimation';
import { useHoverScale } from '../hooks/useHoverScale'; //

const DashboardPage = () => {
    const pageRef     = usePageTransition(); 
    const staggerRef  = useStaggerFadeIn(0.6, 0.2);
    //const activityRef = useStaggerFadeIn(0.6, 0.1); 

    // Hooks para animar barras de progreso
    const organicRef  = useProgressAnimation(45);
    const paidRef     = useProgressAnimation(30);
    const directRef   = useProgressAnimation(25);

    const hoverRef1 = useHoverScale();
    const hoverRef2 = useHoverScale();
    const hoverRef3 = useHoverScale();
  
  return (
    <div ref={pageRef} className="space-y-8 p-4">
      {/* Título Principal */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">📊 Panel de Control</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Resumen de métricas y rendimiento en tiempo real</p>
      </div>

      {/* Sección 1: KPIs Principales */}
      <section ref={staggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Widget title="Ventas Hoy" delay={0.1}>
          <div className="text-center">
            <AnimatedCounter value={12450} label="$" />
            <p className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center justify-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              +15% vs ayer
            </p>
          </div>
        </Widget>
        <Widget title="Usuarios Activos" delay={0.2}>
          <div className="text-center">
            <AnimatedCounter value={1842} label="👥" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+24 en línea</p>
          </div>
        </Widget>
        <Widget title="Tickets Abiertos" delay={0.3}>
          <div className="text-center">
            <AnimatedCounter value={24} label="🎫" duration={1} />
            <p className="text-sm text-red-600 dark:text-red-400 mt-1 flex items-center justify-center">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
              3 urgentes
            </p>
          </div>
        </Widget>
        <Widget title="Tasa de Satisfacción" delay={0.4}>
          <div className="text-center">
            <AnimatedCounter value={92} label="%" duration={1.5} />
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">⭐ 4.8/5.0</p>
          </div>
        </Widget>
      </section>

      {/* Sección 2: Gráficos */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Widget title="📈 Ventas por Mes">
          <BarChart 
            data={[
              { label: "Ene", value: 78 },
              { label: "Feb", value: 85 },
              { label: "Mar", value: 92 },
              { label: "Abr", value: 88 },
              { label: "May", value: 95 },
              { label: "Jun", value: 89 }
            ]} 
          />
        </Widget>

        <Widget title="📊 Fuentes de Tráfico">
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Orgánico</span>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">45%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div ref={organicRef} className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Pago</span>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">30%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div ref={paidRef} className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Directo</span>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">25%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div ref={paidRef} className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Deposito</span>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">25%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div ref={paidRef} className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </Widget>
      </section>

      {/* Sección 3: Actividad Reciente */}
      <section ref={staggerRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">📋 Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full flex items-center justify-center">
              👤
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Nuevo usuario registrado</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">María López - hace 5 minutos</p>
            </div>
            <div className="text-xs text-gray-400">5 min</div>
          </div>
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="w-10 h-10 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full flex items-center justify-center">
              💰
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Pago recibido</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Orden #INV-001 - $199.99</p>
            </div>
            <div className="text-xs text-gray-400">12 min</div>
          </div>
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 rounded-full flex items-center justify-center">
              🎯
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Objetivo mensual alcanzado</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ventas - 100% completado</p>
            </div>
            <div className="text-xs text-gray-400">1 hora</div>
          </div>
        </div>
      </section>

      {/* Sección 4: Cards de Acción Rápida */}
      <section  className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div ref={hoverRef1}  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md ">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              📊
            </div>
            <div>
              <h3 className="text-lg font-semibold">Generar Reporte</h3>
              <p className="text-blue-100 text-sm mt-1">Descarga datos en PDF o Excel</p>
            </div>
          </div>
        </div>
        <div ref={hoverRef2} className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-md ">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              ✉️
            </div>
            <div>
              <h3 className="text-lg font-semibold">Enviar Newsletter</h3>
              <p className="text-green-100 text-sm mt-1">A 1,842 suscriptores</p>
            </div>
          </div>
        </div>
        <div ref={hoverRef3} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-md ">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
              ⚙️
            </div>
            <div>
              <h3 className="text-lg font-semibold">Configurar Alertas</h3>
              <p className="text-purple-100 text-sm mt-1">Recibe notificaciones</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;