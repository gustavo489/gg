import React from 'react';
import { Mail, MapPin, Clock, Shield, Truck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e informações */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">I</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Cimento Itau</h3>
                <p className="text-sm text-gray-300">Qualidade Garantida</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Oferecemos cimento de alta qualidade para sua obra, com os melhores preços 
              e frete grátis para todo o Brasil.
            </p>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm">vendas@cimentoitau.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm">Seg-Sex: 8h às 18h</span>
              </div>
            </div>
          </div>

          {/* Garantias */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Garantias</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">Qualidade NBR 11578</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-4 h-4 text-green-400" />
                <span className="text-sm">Frete Grátis</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm">Produto Original</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm">Entrega Rápida</span>
              </div>
            </div>
          </div>

          {/* Informações Legais */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informações</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Política de Troca
              </a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">
                Rastreamento
              </a>
            </div>
          </div>
        </div>

        {/* Linha separadora e copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 Cimento Itau. Todos os direitos reservados.
            </p>
            <p className="text-sm text-gray-400 mt-2 sm:mt-0">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;