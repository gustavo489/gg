import React from 'react';
import { Timer, Truck, Shield, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const HeroSection = ({ stock, onScrollToProducts }) => {
  const percentageSold = (stock.sold / stock.totalAvailable) * 100;

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="destructive" className="w-fit text-sm font-semibold">
                🔥 OFERTA POR TEMPO LIMITADO
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cimento Itau
                <span className="block text-slate-600">com até 25% OFF</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Cimento de alta qualidade para sua obra com <strong>frete grátis</strong> e preços promocionais. 
                Apenas <strong>{stock.remaining} sacos disponíveis</strong> nesta oferta!
              </p>
            </div>

            {/* Benefícios */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm border">
                <Truck className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-900">Frete Grátis</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm border">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-gray-900">Qualidade NBR</span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm border">
                <Star className="w-6 h-6 text-yellow-500" />
                <span className="font-medium text-gray-900">5 Estrelas</span>
              </div>
            </div>

            {/* Estoque e urgência */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Estoque da promoção</span>
                <span className="text-sm text-gray-500">{stock.remaining} de {stock.totalAvailable} disponíveis</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentageSold}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-red-600">
                  <Timer className="w-4 h-4" />
                  <span className="font-medium">Restam {stock.remaining} sacos!</span>
                </div>
                <span className="text-gray-500">Já vendidos: {stock.sold}</span>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={onScrollToProducts}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Ver Ofertas Disponíveis
            </Button>
          </div>

          {/* Imagem do produto */}
          <div className="relative">
            <div className="relative bg-white p-8 rounded-2xl shadow-xl">
              <img 
                src="https://images.pexels.com/photos/11700775/pexels-photo-11700775.jpeg" 
                alt="Cimento Itau" 
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                ATÉ 25% OFF
              </div>
            </div>
            
            {/* Decoração */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-300 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;