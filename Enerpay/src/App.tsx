import { useState } from 'react';
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PayBillPage from './components/PayBillPage';
import LearnPage from './components/LearnPage';
import BusinessPage from './components/BusinessPage';
import DashboardPage from './components/DashboardPage';
import { useAccount } from 'wagmi';
import { StarknetProvider } from './providers/StarknetProvider';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isConnected } = useAccount();

  const renderPage = () => {
    // Páginas protegidas
    const protectedPages = ['pay', 'learn', 'dashboard'];
    if (protectedPages.includes(currentPage) && !isConnected) {
      return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Conecta tu wallet para continuar</h2>
            <p className="text-gray-600 mb-6">Debes conectar tu wallet para acceder a esta sección.</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">Conecta tu wallet en la parte superior derecha</span>
          </div>
        </div>
      );
    }
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'pay':
        return <PayBillPage />;
      case 'learn':
        return <LearnPage />;
      case 'business':
        return <BusinessPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <StarknetProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="pb-20">
          {renderPage()}
        </main>
        <Footer />
        <BottomNavigation currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </StarknetProvider>
  );
}

export default App;