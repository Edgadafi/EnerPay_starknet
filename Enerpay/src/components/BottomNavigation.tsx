import React from 'react';
import { 
  Home, 
  CreditCard, 
  GraduationCap, 
  Building2, 
  BarChart3 
} from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  const navItems = [
    { 
      id: 'home', 
      label: 'Inicio', 
      icon: Home 
    },
    { 
      id: 'pay', 
      label: 'Pagar', 
      icon: CreditCard 
    },
    { 
      id: 'learn', 
      label: 'Aprender', 
      icon: GraduationCap 
    },
    { 
      id: 'business', 
      label: 'Empresas', 
      icon: Building2 
    },
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: BarChart3 
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 scale-110' 
                  : 'hover:bg-gray-50'
              }`}>
                <IconComponent className="h-6 w-6" />
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
              <span className={`text-xs font-medium mt-1 truncate ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 