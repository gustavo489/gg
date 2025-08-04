import React from 'react';
import { Truck, Star, Tag, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

const ProductCard = ({ product, onAddToCart }) => {
  const savings = product.originalPrice - product.price;
  const discountPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <Card className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 ${product.popular ? 'ring-2 ring-slate-900' : ''}`}>
      {product.popular && (
        <Badge className="absolute top-4 left-4 z-10 bg-slate-900 text-white">
          🏆 MAIS VENDIDO
        </Badge>
      )}
      
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="destructive" className="font-bold">
          -{discountPercentage}%
        </Badge>
      </div>

      <CardHeader className="p-0">
        <div className="relative h-48 bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>

        {/* Especificações rápidas */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Package className="w-4 h-4" />
            <span>{product.quantity} {product.unit}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{product.weight}</span>
          </div>
        </div>

        {/* Preços */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-gray-900">
              R$ {product.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              R$ {product.originalPrice}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
            <Tag className="w-4 h-4" />
            <span>Economia de R$ {savings}</span>
          </div>
        </div>

        {/* Benefícios */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <Truck className="w-4 h-4" />
            <span className="font-medium">Frete Grátis</span>
          </div>
          <div className="flex items-center space-x-2 text-yellow-500 text-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>Qualidade Garantida</span>
          </div>
        </div>

        {/* Especificações técnicas */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Especificações:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {product.specifications.slice(0, 3).map((spec, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-200 hover:shadow-lg"
        >
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;