import React, { useState, useRef } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import TestimonialsSection from "./components/TestimonialsSection";
import Footer from "./components/Footer";

// Mock data
import { mockProducts, mockStock, mockTestimonials } from "./data/mock";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [stock, setStock] = useState(mockStock);
  const productsRef = useRef(null);

  // Scroll para produtos
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Adicionar ao carrinho
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Atualizar quantidade no carrinho
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remover do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Ir para checkout
  const goToCheckout = () => {
    setIsCartOpen(false);
    setShowCheckout(true);
  };

  // Voltar do checkout
  const backFromCheckout = () => {
    setShowCheckout(false);
    setIsCartOpen(true);
  };

  // Completar pedido
  const completeOrder = (order) => {
    // Atualizar estoque
    const totalItemsOrdered = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setStock(prev => ({
      ...prev,
      sold: prev.sold + totalItemsOrdered,
      remaining: prev.remaining - totalItemsOrdered
    }));

    // Limpar carrinho
    setCartItems([]);
    setShowCheckout(false);
    
    // Simular redirect para WhatsApp ou página de confirmação
    console.log('Pedido completado:', order);
  };

  if (showCheckout) {
    return (
      <div className="App">
        <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
        <CheckoutForm 
          cartItems={cartItems}
          onOrderComplete={completeOrder}
          onBack={backFromCheckout}
        />
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="App">
      <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
      
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
            {mockProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
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

      <TestimonialsSection testimonials={mockTestimonials} />
      
      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={goToCheckout}
      />

      <Toaster />
    </div>
  );
}

export default App;