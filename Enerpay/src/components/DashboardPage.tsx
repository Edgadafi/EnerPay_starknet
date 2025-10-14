import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Clock, 
  Zap,
  Download,
  Calendar,
  Filter,
  Eye,
  CheckCircle,
  AlertCircle,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    totalPayments: 12,
    totalAmount: 8450.75,
    mxnbBalance: 125.50,
    avgProcessingTime: 42,
    successRate: 100,
    savedVsTraditional: 850.25
  };

  const recentTransactions = [
    {
      id: 'TX001',
      type: 'payment',
      description: 'Pago CFE - Casa Principal',
      amount: -850.50,
      mxnb: -850.50,
      status: 'completed',
      date: '2025-01-12',
      time: '14:30'
    },
    {
      id: 'TX002',
      type: 'reward',
      description: 'Recompensa Trivia Energética',
      amount: +15.00,
      mxnb: +15.00,
      status: 'completed',
      date: '2025-01-12',
      time: '10:15'
    },
    {
      id: 'TX003',
      type: 'payment',
      description: 'Pago CFE - Oficina Guadalajara',
      amount: -1250.25,
      mxnb: -1250.25,
      status: 'completed',
      date: '2025-01-11',
      time: '16:45'
    },
    {
      id: 'TX004',
      type: 'deposit',
      description: 'Depósito MXNB',
      amount: +2000.00,
      mxnb: +2000.00,
      status: 'completed',
      date: '2025-01-10',
      time: '09:20'
    },
    {
      id: 'TX005',
      type: 'payment',
      description: 'Pago CFE - Casa Monterrey',
      amount: -950.75,
      mxnb: -950.75,
      status: 'processing',
      date: '2025-01-10',
      time: '18:10'
    }
  ];

  const monthlyData = [
    { month: 'Ene', payments: 8, amount: 6200 },
    { month: 'Feb', payments: 12, amount: 8450 },
    { month: 'Mar', payments: 15, amount: 11200 },
    { month: 'Abr', payments: 10, amount: 7850 },
    { month: 'May', payments: 18, amount: 13600 },
    { month: 'Jun', payments: 14, amount: 10100 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Mi Dashboard
              </h1>
              <p className="text-gray-600">
                Bienvenido de vuelta, aquí tienes un resumen de tu actividad
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="3m">Últimos 3 meses</option>
                <option value="1y">Último año</option>
              </select>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats.totalPayments}
            </h3>
            <p className="text-gray-600 text-sm">Pagos Realizados</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              ${stats.totalAmount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-gray-600 text-sm">Total Pagado (MXN)</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Wallet className="h-6 w-6 text-orange-600" />
              </div>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Ver Billetera
              </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats.mxnbBalance.toFixed(2)} MXNB
            </h3>
            <p className="text-gray-600 text-sm">Balance Disponible</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">
                {stats.successRate}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {stats.avgProcessingTime}s
            </h3>
            <p className="text-gray-600 text-sm">Tiempo Promedio</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Actividad de Pagos</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-6 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2">
                      <div 
                        className="w-full bg-gray-200 rounded-full overflow-hidden"
                        style={{ height: '100px' }}
                      >
                        <div 
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                          style={{ 
                            height: `${(data.amount / 15000) * 100}%`,
                            marginTop: `${100 - (data.amount / 15000) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-900">{data.month}</div>
                    <div className="text-xs text-gray-500">{data.payments}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Transacciones Recientes</h2>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Ver todas
                  </button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          transaction.type === 'payment' ? 'bg-red-100' :
                          transaction.type === 'reward' ? 'bg-green-100' :
                          'bg-blue-100'
                        }`}>
                          {transaction.type === 'payment' ? (
                            <ArrowDownLeft className={`h-6 w-6 ${
                              transaction.type === 'payment' ? 'text-red-600' : 'text-green-600'
                            }`} />
                          ) : (
                            <ArrowUpRight className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {transaction.description}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex items-center justify-end space-x-2 mt-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status === 'completed' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status === 'completed' ? 'Completado' : 'Procesando'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Nuevo Pago</span>
                </button>
                
                <button className="w-full border-2 border-gray-200 text-gray-700 p-4 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Wallet className="h-5 w-5" />
                  <span>Recargar MXNB</span>
                </button>
                
                <button className="w-full border-2 border-gray-200 text-gray-700 p-4 rounded-xl font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Ver Reportes</span>
                </button>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Ahorros Totales</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${stats.savedVsTraditional.toFixed(2)}
                </div>
                <p className="text-sm text-gray-600">
                  vs métodos tradicionales
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Basado en comisiones bancarias evitadas
                </p>
              </div>
            </div>

            {/* MXNB Rewards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="h-5 w-5 text-orange-600" />
                <h3 className="font-bold text-gray-900">Recompensas MXNB</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Trivias completadas</span>
                  <span className="font-semibold text-green-600">+45 MXNB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Referidos activos</span>
                  <span className="font-semibold text-green-600">+25 MXNB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Pagos frecuentes</span>
                  <span className="font-semibold text-green-600">+15 MXNB</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="flex items-center justify-between font-bold">
                  <span className="text-gray-900">Total ganado</span>
                  <span className="text-green-600">85 MXNB</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Tip del Día</h3>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                ¿Sabías que puedes programar pagos automáticos para nunca olvidar una fecha de vencimiento?
              </p>
              
              <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
                Configurar Pagos Automáticos →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}