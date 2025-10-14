import React, { useState } from 'react';
import { 
  Building2, 
  BarChart3, 
  Users, 
  Clock, 
  Shield, 
  Zap,
  TrendingDown,
  FileText,
  Settings,
  CheckCircle,
  ArrowRight,
  Download,
  Plus
} from 'lucide-react';

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const mockBusinessStats = {
    locations: 247,
    monthlyPayments: 1523,
    totalSaved: 127840,
    averageProcessingTime: 45,
    successRate: 99.7
  };

  const recentTransactions = [
    { id: 'T001', location: 'Sucursal Centro CDMX', amount: 2450.00, status: 'completed', date: '2025-01-12' },
    { id: 'T002', location: 'Almacén Norte Guadalajara', amount: 3200.50, status: 'completed', date: '2025-01-12' },
    { id: 'T003', location: 'Oficina Sur Monterrey', amount: 1800.25, status: 'processing', date: '2025-01-12' },
    { id: 'T004', location: 'Planta Industrial Tijuana', amount: 8950.00, status: 'completed', date: '2025-01-11' },
    { id: 'T005', location: 'Centro Distribución Puebla', amount: 4320.75, status: 'completed', date: '2025-01-11' }
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'Dashboard Centralizado',
      description: 'Visualiza todas tus sucursales y pagos desde un solo lugar con métricas en tiempo real'
    },
    {
      icon: Clock,
      title: 'Pagos Automatizados',
      description: 'Programa pagos recurrentes y olvídate de las fechas de vencimiento'
    },
    {
      icon: FileText,
      title: 'Reportes Detallados',
      description: 'Genera reportes contables completos y descarga comprobantes masivamente'
    },
    {
      icon: Shield,
      title: 'Seguridad Empresarial',
      description: 'Controles de acceso por roles y auditoría completa de todas las transacciones'
    },
    {
      icon: Settings,
      title: 'Integración ERP',
      description: 'Conecta directamente con tu sistema contable y automatiza la conciliación'
    },
    {
      icon: TrendingDown,
      title: 'Reducción de Costos',
      description: 'Hasta 40% menos costos operativos comparado con métodos tradicionales'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$2,500',
      period: '/mes',
      description: 'Perfecto para pequeñas empresas',
      features: [
        'Hasta 25 sucursales',
        'Dashboard básico',
        'Soporte por email',
        'Reportes mensuales',
        'API básica'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$7,500',
      period: '/mes',
      description: 'Ideal para empresas en crecimiento',
      features: [
        'Hasta 100 sucursales',
        'Dashboard avanzado',
        'Soporte prioritario 24/7',
        'Reportes personalizados',
        'API completa',
        'Integración ERP',
        'Manager dedicado'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Personalizado',
      period: '',
      description: 'Para grandes corporaciones',
      features: [
        'Sucursales ilimitadas',
        'Dashboard personalizado',
        'Soporte dedicado',
        'SLA garantizado',
        'Integraciones personalizadas',
        'Consultoría energética',
        'Onboarding especializado'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                Solución B2B
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Centraliza y automatiza los pagos eléctricos de tu empresa
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Gestiona los recibos de luz de todas tus sucursales desde una sola plataforma. 
                Reduce costos, automatiza procesos y obtén visibilidad completa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Solicitar Demo
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-200">
                  Ver Precios
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{mockBusinessStats.locations}</div>
                    <div className="text-blue-200 text-sm">Sucursales Activas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{mockBusinessStats.monthlyPayments.toLocaleString()}</div>
                    <div className="text-blue-200 text-sm">Pagos Este Mes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">${mockBusinessStats.totalSaved.toLocaleString()}</div>
                    <div className="text-blue-200 text-sm">Ahorrado vs Tradicional</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{mockBusinessStats.successRate}%</div>
                    <div className="text-blue-200 text-sm">Tasa de Éxito</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dashboard Empresarial
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Controla todos los aspectos de tus pagos eléctricos desde una interfaz intuitiva y poderosa
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Resumen General
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'transactions'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Transacciones
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Analíticas
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sucursales</h3>
                      <p className="text-2xl font-bold text-blue-600">{mockBusinessStats.locations}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">+12 este mes</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Pagos</h3>
                      <p className="text-2xl font-bold text-green-600">{mockBusinessStats.monthlyPayments.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Este mes</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ahorro</h3>
                      <p className="text-2xl font-bold text-orange-600">32%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">vs método tradicional</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Tiempo Prom.</h3>
                      <p className="text-2xl font-bold text-purple-600">{mockBusinessStats.averageProcessingTime}s</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Procesamiento</p>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Transacciones Recientes</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Nuevo Pago</span>
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID / Ubicación
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                                <div className="text-sm text-gray-500">{transaction.location}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">
                                ${transaction.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                transaction.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : transaction.status === 'processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status === 'completed' ? 'Completado' : 
                                 transaction.status === 'processing' ? 'Procesando' : 'Fallido'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Ver detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Consumo por Región</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">CDMX</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Guadalajara</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-20 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">62%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Monterrey</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-orange-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tendencia Mensual</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">↗ 23%</div>
                    <p className="text-gray-600">Incremento en eficiencia</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Comparado con el mes anterior
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Empresariales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para gestionar los pagos eléctricos de tu empresa de forma eficiente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-green-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planes Empresariales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte al tamaño y necesidades de tu empresa
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600 to-green-600 text-white shadow-2xl scale-105 border-4 border-blue-200'
                    : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className={`h-5 w-5 ${plan.popular ? 'text-white' : 'text-green-600'} flex-shrink-0`} />
                      <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                    : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl'
                } transform hover:scale-105`}>
                  {plan.name === 'Enterprise' ? 'Contactar Ventas' : 'Comenzar Prueba'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar los pagos de tu empresa?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya están ahorrando tiempo y dinero con EnerPay Business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
              Solicitar Demo Personalizada
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-200">
              Descargar Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}