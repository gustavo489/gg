import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const TestimonialsSection = ({ testimonials }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600">
            Mais de 1.000 obras já utilizaram nosso cimento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <blockquote className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.comment}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">1000+</div>
            <div className="text-gray-600">Obras realizadas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">5.0</div>
            <div className="text-gray-600">Avaliação média</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
            <div className="text-gray-600">Clientes satisfeitos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;