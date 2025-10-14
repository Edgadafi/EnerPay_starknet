import React, { useState } from 'react';
import { 
  Brain, 
  Gift, 
  Trophy, 
  Zap, 
  Lightbulb, 
  Leaf, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function LearnPage() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [earnedMXNB, setEarnedMXNB] = useState(0);

  const quizzes = [
    {
      id: 1,
      category: 'Ahorro Energético',
      question: '¿Cuál es la forma más efectiva de reducir el consumo eléctrico en casa?',
      options: [
        'Desconectar aparatos cuando no se usen',
        'Usar focos LED en lugar de incandescentes',
        'Configurar el aire acondicionado a 24°C',
        'Todas las anteriores'
      ],
      correct: 3,
      explanation: 'Todas estas acciones contribuyen significativamente al ahorro energético. Los focos LED consumen hasta 80% menos energía, desconectar aparatos evita el consumo fantasma, y configurar el A/C a 24°C es la temperatura más eficiente.',
      reward: 5
    },
    {
      id: 2,
      category: 'Energías Renovables',
      question: '¿Cuál es la principal ventaja de los paneles solares residenciales?',
      options: [
        'No requieren mantenimiento',
        'Generan energía limpia y reducen costos a largo plazo',
        'Funcionan mejor en días nublados',
        'Son más baratos que la electricidad tradicional'
      ],
      correct: 1,
      explanation: 'Los paneles solares generan energía limpia sin emisiones de CO2 y, aunque requieren inversión inicial, reducen significativamente los costos eléctricos a largo plazo.',
      reward: 8
    },
    {
      id: 3,
      category: 'Blockchain y Energía',
      question: '¿Cómo beneficia la tecnología blockchain a los pagos de servicios eléctricos?',
      options: [
        'Hace los pagos más lentos pero seguros',
        'Elimina completamente las comisiones',
        'Proporciona transparencia, seguridad y trazabilidad',
        'Solo funciona con criptomonedas volátiles'
      ],
      correct: 2,
      explanation: 'La blockchain proporciona un registro inmutable y transparente de todas las transacciones, garantizando seguridad y permitiendo rastrear cada pago de forma confiable.',
      reward: 10
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex.toString());
  };

  const handleSubmitAnswer = () => {
    const currentQuizData = quizzes[currentQuiz];
    const isCorrect = parseInt(selectedAnswer) === currentQuizData.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setEarnedMXNB(earnedMXNB + currentQuizData.reward);
    }

    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer('');
    setScore(0);
    setQuizCompleted(false);
    setEarnedMXNB(0);
  };

  const energyTips = [
    {
      icon: Lightbulb,
      title: 'Iluminación Inteligente',
      tip: 'Cambia a focos LED y aprovecha la luz natural durante el día',
      savings: 'Hasta 80% menos consumo'
    },
    {
      icon: Zap,
      title: 'Electrodomésticos Eficientes',
      tip: 'Busca la etiqueta de eficiencia energética al comprar',
      savings: 'Hasta 30% menos consumo'
    },
    {
      icon: Leaf,
      title: 'Energía Solar',
      tip: 'Considera instalar paneles solares para generar tu propia energía',
      savings: 'Hasta 90% menos factura'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            <Brain className="h-4 w-4 mr-2" />
            Educación Energética
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Aprende y Gana MXNB
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Completa trivias sobre energía sustentable y obtén recompensas en criptomonedas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Puntuación Total</h3>
                <p className="text-2xl font-bold text-blue-600">{score * 100}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Respuestas correctas: {score}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">MXNB Ganados</h3>
                <p className="text-2xl font-bold text-green-600">{earnedMXNB}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">En esta sesión</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Nivel Actual</h3>
                <p className="text-2xl font-bold text-orange-600">Principiante</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">50 MXNB para siguiente nivel</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Section */}
          <div className="lg:col-span-2">
            {!quizCompleted ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Quiz Header */}
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Brain className="h-6 w-6" />
                      <span className="font-semibold">{quizzes[currentQuiz].category}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                      {currentQuiz + 1} de {quizzes.length}
                    </div>
                  </div>
                  
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${((currentQuiz + 1) / quizzes.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  <h2 className="text-xl font-bold">
                    {quizzes[currentQuiz].question}
                  </h2>
                </div>

                {/* Quiz Content */}
                <div className="p-6">
                  <div className="space-y-3 mb-8">
                    {quizzes[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedAnswer === index.toString()
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index.toString()
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswer === index.toString() && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Gift className="h-5 w-5" />
                      <span className="font-medium">+{quizzes[currentQuiz].reward} MXNB</span>
                    </div>
                    
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 disabled:transform-none flex items-center space-x-2"
                    >
                      <span>Enviar Respuesta</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Trivia Completada!
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Has respondido {score} de {quizzes.length} preguntas correctamente
                </p>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-6 w-6 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">+{earnedMXNB} MXNB</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tus recompensas han sido añadidas a tu billetera
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200"
                  >
                    Intentar de Nuevo
                  </button>
                  <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                    Ver Más Trivias
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Energy Tips */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span>Tips de Ahorro</span>
              </h3>
              
              <div className="space-y-4">
                {energyTips.map((tip, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <tip.icon className="h-4 w-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 text-sm">{tip.title}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{tip.tip}</p>
                    <p className="text-xs text-green-600 font-medium">{tip.savings}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Topics */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Próximos Temas</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Energía Eólica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Smart Grids</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Almacenamiento de Energía</span>
                </div>
              </div>
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Top Usuarios</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-yellow-600">1</span>
                    </div>
                    <span className="text-sm font-medium">EnergyExpert</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">2,450 MXNB</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">2</span>
                    </div>
                    <span className="text-sm font-medium">SolarPioneer</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">1,890 MXNB</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">3</span>
                    </div>
                    <span className="text-sm font-medium">GreenSaver</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">1,235 MXNB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}