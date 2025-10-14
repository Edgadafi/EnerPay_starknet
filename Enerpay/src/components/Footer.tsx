import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  Clock,
  Globe
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="enerpaylogo.jpg" 
                alt="EnerPay" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                EnerPay
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
            EnerPay es la primera plataforma que permite a mexicanos en el extranjero pagar recibos de luz con criptomonedas estables de forma instantánea y segura.
            Además, ofrece a las empresas y gobiernos una solución para centralizar y automatizar sus pagos de servicios con trazabilidad, eficiencia y control total.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cómo Funciona</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Precios y Comisiones</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Países Disponibles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API para Desarrolladores</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</a></li>
            </ul>
          </div>
          
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">soporte@enerpay.mx</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">Ciudad de México, México</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Garantías y certificaciones */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-sm text-gray-300">Seguridad Blockchain</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Clock className="h-8 w-8 text-blue-400" />
              <span className="text-sm text-gray-300">Disponible 24/7</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Globe className="h-8 w-8 text-purple-400" />
              <span className="text-sm text-gray-300">50+ Países</span>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 EnerPay. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 