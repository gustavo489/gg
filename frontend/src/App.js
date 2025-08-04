import React, { useRef, useState, useEffect } from "react";
import "./App.css";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

// API service
import apiService from "./services/api";

function App() {
  const productsRef = useRef(null);
  
  // State for API data
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState({ totalAvailable: 0, sold: 0, remaining: 0 });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [productsData, stockData, testimonialsData] = await Promise.all([
          apiService.getProducts(),
          apiService.getStock(),
          apiService.getTestimonials()
        ]);

        setProducts(productsData);
        setStock(stockData);
        setTestimonials(testimonialsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll para produtos
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-slate-600 text-white px-4 py-2 rounded hover:bg-slate-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      
      <HeroSection stock={stock} onScrollToProducts={scrollToProducts} />
      
      {/* Seção de Produtos */}
      <section ref={productsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ofertas Especiais
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o pacote ideal para sua obra
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>

          {/* Contador de estoque */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-6 py-3 rounded-full border border-red-200">
              <span className="font-medium">
                ⚠️ Restam apenas {stock.remaining} sacos com esse preço promocional!
              </span>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />
      
      <Footer />
    </div>
  );
}

export default App;