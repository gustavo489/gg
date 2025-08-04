// Mock data para o sistema de vendas de cimento
export const mockProducts = [
  {
    id: 1,
    name: "Cimento Itau - Pacote 10 Sacos",
    description: "Cimento Portland CP II-E-32, ideal para construções residenciais e comerciais. Cada saco contém 50kg de cimento de alta qualidade.",
    price: 280,
    originalPrice: 350,
    quantity: 10,
    unit: "sacos",
    weight: "50kg por saco",
    freeShipping: true,
    discount: 20,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500&h=400&fit=crop",
    specifications: [
      "Cimento Portland CP II-E-32",
      "Conformidade NBR 11578",
      "Alta resistência e durabilidade", 
      "Ideal para concreto e argamassa",
      "Baixo calor de hidratação"
    ]
  },
  {
    id: 2,
    name: "Cimento Itau - Pacote 20 Sacos",
    description: "Pacote econômico com 20 sacos de cimento Portland CP II-E-32. Perfeito para obras maiores com excelente custo-benefício.",
    price: 489,
    originalPrice: 650,
    quantity: 20,
    unit: "sacos", 
    weight: "50kg por saco",
    freeShipping: true,
    discount: 25,
    popular: true,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop",
    specifications: [
      "Cimento Portland CP II-E-32",
      "Conformidade NBR 11578",
      "Alta resistência e durabilidade",
      "Ideal para concreto e argamassa", 
      "Baixo calor de hidratação",
      "Melhor custo-benefício"
    ]
  }
];

export const mockStock = {
  totalAvailable: 200,
  sold: 0,
  remaining: 200
};

export const mockTestimonials = [
  {
    id: 1,
    name: "João Silva",
    location: "São Paulo, SP",
    rating: 5,
    comment: "Cimento de excelente qualidade! Chegou rapidinho e o preço estava imbatível. Já usei em várias obras.",
    date: "2025-01-10"
  },
  {
    id: 2, 
    name: "Maria Santos",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Muito satisfeita com a compra. O frete grátis fez toda diferença no orçamento da obra.",
    date: "2025-01-08"
  },
  {
    id: 3,
    name: "Carlos Oliveira", 
    location: "Belo Horizonte, MG",
    rating: 5,
    comment: "Produto original, entrega no prazo e preço excelente. Recomendo!",
    date: "2025-01-05"
  }
];

export const mockOrders = [];

export const mockPaymentMethods = [
  { id: 'pix', name: 'PIX', discount: 5, icon: 'smartphone' },
  { id: 'card', name: 'Cartão de Crédito', discount: 0, icon: 'credit-card' },
  { id: 'boleto', name: 'Boleto Bancário', discount: 0, icon: 'file-text' }
];