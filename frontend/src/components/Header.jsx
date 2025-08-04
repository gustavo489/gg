import React from 'react';
import { ShoppingCart, Clock } from 'lucide-react';
import { Button } from './ui/button';

const Header = ({ cartItems, onCartClick }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cimento Itau</h1>
              <p className="text-xs text-gray-500">Qualidade Garantida</p>
            </div>
          </div>

          {/* Info rapida */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Oferta por tempo limitado</span>
            </div>
          </div>

          {/* Carrinho */}
          <Button 
            variant="outline" 
            onClick={onCartClick}
            className="relative hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Carrinho
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;