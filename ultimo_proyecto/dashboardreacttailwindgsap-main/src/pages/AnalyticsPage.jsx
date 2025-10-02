// src/pages/AnalyticsPage.jsx

import { useStaggerFadeIn } from '../hooks/useStaggerFadeIn';
import Widget from '../components/ui/Widget';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import BarChart from '../components/ui/BarChart';
import { usePageTransition } from '../hooks/usePageTransition';

export default function AnalyticsPage() {
  const pageRef = usePageTransition(); 
  const staggerRef = useStaggerFadeIn(0.6, 0.2);

  return (
    <div ref={pageRef} className="space-y-8 p-3">
      {/* Título Principal */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-500">📈 Dashboard de Analítica</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Métricas, gráficos y tendencias en tiempo real</p>
      </div>

      {/* Sección 1: KPIs Principales (con stagger) */}
      <section ref={staggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Widget title="Visitas Hoy" delay={0.1}>
          <div className="text-center text-gray-400">
            <AnimatedCounter value={12840}  />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+12% vs ayer</p>
          </div>
        </Widget>
        <Widget title="Tasa de Conversión" delay={0.2}>
          <div className="text-center">
            <AnimatedCounter value={15.3} label="%" duration={1.5} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+2.1% vs meta</p>
          </div>
        </Widget>
        <Widget title="Ingresos" delay={0.3}>
          <div className="text-center">
            <AnimatedCounter value={89450} label="$" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+8% vs semana pasada</p>
          </div>
        </Widget>
        <Widget title="Rebotes" delay={0.4}>
          <div className="text-center">
            <AnimatedCounter value={28} label="%" duration={1} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">-3% vs mes anterior</p>
          </div>
        </Widget>
      </section>

      {/* Sección 2: Gráficos de Barras */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Widget title="📊 Comportamiento Semanal">
          <BarChart 
            data={[
              { label: "Lunes", value: 78 },
              { label: "Martes", value: 85 },
              { label: "Miércoles", value: 92 },
              { label: "Jueves", value: 88 },
              { label: "Viernes", value: 95 },
              { label: "Sábado", value: 76 },
              { label: "Domingo", value: 82 }
            ]} 
          />
        </Widget>

        <Widget title="📈 Conversiones por Fuente">
          <BarChart 
            data={[
              { label: "Google", value: 65 },
              { label: "Facebook", value: 82 },
              { label: "Email", value: 74 },
              { label: "Directo", value: 90 },
              { label: "Referidos", value: 68 }
            ]} 
          />
        </Widget>
      </section>

      {/* Sección 3: Tabla de Datos */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">📋 Últimas Transacciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Cliente</th>
                <th scope="col" className="px-6 py-3">Producto</th>
                <th scope="col" className="px-6 py-3">Monto</th>
                <th scope="col" className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4">#INV-001</td>
                <td className="px-6 py-4">María López</td>
                <td className="px-6 py-4">Plan Premium</td>
                <td className="px-6 py-4 font-medium">$199.99</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completado</span>
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4">#INV-002</td>
                <td className="px-6 py-4">Carlos Gómez</td>
                <td className="px-6 py-4">Soporte Pro</td>
                <td className="px-6 py-4 font-medium">$89.99</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Pendiente</span>
                </td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-6 py-4">#INV-003</td>
                <td className="px-6 py-4">Ana Martínez</td>
                <td className="px-6 py-4">Consultoría</td>
                <td className="px-6 py-4 font-medium">$499.99</td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completado</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sección 4: Cards de Acción Rápida */}
      <section ref={staggerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">🚀 Lanzar Campaña</h3>
          <p className="text-blue-100 text-sm">Crea una nueva campaña de marketing en 2 clics.</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">📊 Generar Reporte</h3>
          <p className="text-green-100 text-sm">Exporta un reporte detallado en PDF o Excel.</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-semibold mb-2">🔔 Configurar Alertas</h3>
          <p className="text-purple-100 text-sm">Recibe notificaciones cuando las métricas cambien.</p>
        </div>
      </section>
    </div>
  );
}