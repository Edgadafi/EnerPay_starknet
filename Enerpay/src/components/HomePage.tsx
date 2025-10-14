import React, { useState } from 'react';
import { 
  Zap, 
  Globe, 
  Shield, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Smartphone,
  Building2,
  Gift
} from 'lucide-react';

export default function HomePage({ onPageChange }: { onPageChange?: (page: string) => void }) {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const beneficiosRef = React.useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Globe,
      title: 'Pagos Globales Instantáneos',
      description: 'Paga el recibo de luz de tu familia desde cualquier país del mundo usando MXNB'
    },
    {
      icon: Clock,
      title: 'Procesamiento Inmediato',
      description: 'Los pagos se reflejan al instante, sin esperar 72 horas como en métodos tradicionales'
    },
    {
      icon: Shield,
      title: 'Seguridad Blockchain',
      description: 'Todas las transacciones están protegidas por la tecnología blockchain más avanzada'
    },
    {
      icon: Gift,
      title: 'Recompensas en MXNB',
      description: 'Gana MXNB completando trivias educativas sobre energía y sustentabilidad'
    }
  ];

  const stats = [
    { number: '15K+', label: 'Pagos Procesados', sublabel: 'este mes' },
    { number: '50+', label: 'Países Atendidos', sublabel: 'usuarios globales' },
    { number: '0.5%', label: 'Comisión Mínima', sublabel: 'más barata' },
    { number: '99.9%', label: 'Tiempo Activo', sublabel: 'disponibilidad' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230EA5E9%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            {/* Columna izquierda - Logo grande */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative p-8">
                {/* Efecto de resplandor sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-2xl"></div>
                
                {/* Contenedor del logo */}
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <img 
                    src="/enerpaylogo.jpg" 
                    alt="EnerPay" 
                    className="h-48 md:h-64 w-auto object-contain transform hover:scale-105 transition-transform duration-300 mx-auto block"
                    onError={(e) => {
                      console.log('Error loading image, showing fallback');
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'h-48 md:h-64 flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white text-3xl md:text-5xl font-bold shadow-lg';
                      fallback.innerHTML = '<span>EnerPay</span>';
                      img.parentNode?.appendChild(fallback);
                    }}
                    onLoad={() => {
                      console.log('EnerPay logo loaded successfully!');
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Contenido */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
                <Zap className="h-4 w-4 mr-2" />
                La nueva forma de pagar tu luz y servicios: simple, digital y en stablecoins.
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Paga tus recibos de luz y servicios con{' '}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MXNB
              </span>{' '}
              desde cualquier parte del mundo
            </h1>
            
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                EnerPay permite a los mexicanos en el extranjero pagar recibos de luz y otros servicios esenciales de sus familiares de forma instantánea y segura usando moneda estable MXNB. Plataforma pionera en México.
            </p>
            
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  onClick={() => onPageChange && onPageChange('pay')}
                >
                Pagar Ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Ver Demo
              </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos flotantes mejorados */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-green-300 rounded-full opacity-15 animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 group-hover:shadow-md transition-shadow">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CFE Partnership Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Servicio Oficial Autorizado
            </h2>
            <p className="text-lg text-gray-600">
              Trabajamos directamente con CFE para garantizar que tus pagos sean procesados de manera segura y oficial
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-4">
                                 <img src="CFE.jpg" alt="CFE" className="h-16 w-auto object-contain" />
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Comisión Federal de Electricidad</h3>
                  <p className="text-gray-600">Empresa Productiva del Estado mexicano</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-0.5 bg-gray-300 hidden md:block"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">✓</div>
                  <p className="text-sm text-gray-600">Pagos<br/>Autorizados</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-0.5 bg-gray-300 hidden md:block"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">⚡</div>
                  <p className="text-sm text-gray-600">Procesamiento<br/>Instantáneo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={beneficiosRef} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir EnerPay?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolucionamos la forma de pagar servicios como la luz, el agua y más, con tecnología blockchain, MXNB y la simplicidad que necesitas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Business Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Building2 className="h-4 w-4 mr-2" />
                Solución Empresarial
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Automatiza los recibos de luz empresariales de tu empresa
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Centraliza, automatiza y optimiza todos los recibos de luz empresariales de tus sucursales 
                con trazabilidad completa en blockchain y menor costo operativo.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-blue-100">Pagos masivos automatizados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-blue-100">Integración con ERPs existentes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-blue-100">Reportes y métricas en tiempo real</span>
                </div>
              </div>
              
              <button
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setShowDemoModal(true)}
              >
                Solicitar Demo Empresarial
              </button>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="font-medium">Sucursales Activas</span>
                    <span className="text-green-400 font-bold">247</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="font-medium">Pagos Este Mes</span>
                    <span className="text-green-400 font-bold">1,523</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <span className="font-medium">Ahorro vs Tradicional</span>
                    <span className="text-green-400 font-bold">32%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comienza a pagar tus recibos de luz hoy mismo
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Únete a miles de mexicanos que ya están usando EnerPay para mantenerse 
            conectados con sus familias de forma fácil y segura.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => setShowRegisterModal(true)}
            >
              Crear Cuenta Gratis
            </button>
            <button
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              onClick={() => {
                if (beneficiosRef.current) {
                  beneficiosRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-600" onClick={() => setShowDemoModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Solicitar Demo Empresarial</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Enviar solicitud</button>
            </form>
          </div>
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-600" onClick={() => setShowRegisterModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Crear Cuenta Gratis</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input type="password" className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-colors">Crear Cuenta</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}