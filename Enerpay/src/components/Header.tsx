import React from "react";
import { Globe } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [language, setLanguage] = React.useState('es');

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const getPageTitle = () => {
    const titles = {
      home: language === 'es' ? '' : '', // En home no mostramos título extra
      pay: language === 'es' ? 'Pagar Recibo' : 'Pay Bill',
      learn: language === 'es' ? 'Aprender' : 'Learn',
      business: language === 'es' ? 'Para Empresas' : 'For Business',
      dashboard: language === 'es' ? 'Mi Dashboard' : 'My Dashboard'
    };
    return titles[currentPage as keyof typeof titles] || '';
  };

  const pageTitle = getPageTitle();

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo de EnerPay */}
          <div className="flex items-center space-x-3">
            <img 
              src="enerpaylogo.jpg" 
              alt="EnerPay" 
              className="h-8 w-auto object-contain"
            />
            {pageTitle && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800">
                  {pageTitle}
                </span>
                <span className="text-xs text-gray-500 -mt-1">EnerPay</span>
              </div>
            )}
          </div>

          {/* Botón de conexión de wallet y selector de idioma */}
          <div className="flex items-center gap-4">
            <ConnectButton />
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}