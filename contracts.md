# Contratos de API - Sistema de Vendas de Cimento

## 1. DADOS MOCKADOS (frontend/src/data/mock.js)

### Produtos
- 2 produtos: Pacote 10 sacos (R$ 280) e Pacote 20 sacos (R$ 489)
- Cada produto contém: id, name, description, price, originalPrice, quantity, unit, weight, freeShipping, discount, popular, image, specifications

### Estoque
- Total disponível: 200 sacos
- Sistema de contagem regressiva

### Depoimentos
- 3 depoimentos de clientes com avaliação 5 estrelas

### Métodos de Pagamento
- PIX (5% desconto), Cartão de Crédito, Boleto Bancário

## 2. ENDPOINTS BACKEND NECESSÁRIOS

### 2.1 Produtos
```
GET /api/products
- Retorna lista de produtos disponíveis
- Response: Array de produtos com todas as propriedades

GET /api/products/:id
- Retorna produto específico
- Response: Objeto produto
```

### 2.2 Estoque
```
GET /api/stock
- Retorna informações do estoque atual
- Response: { totalAvailable, sold, remaining }

PUT /api/stock
- Atualiza estoque após venda
- Body: { quantity }
- Response: { success, newStock }
```

### 2.3 Pedidos
```
POST /api/orders
- Cria novo pedido
- Body: {
    customer: {
      name, email, phone, cep, address, number, 
      complement, neighborhood, city, state, notes
    },
    items: [{ id, name, price, quantity }],
    paymentMethod: string,
    total: number
  }
- Response: { orderId, status, paymentInstructions }

GET /api/orders/:id
- Consulta pedido específico
- Response: Objeto pedido completo
```

### 2.4 Depoimentos
```
GET /api/testimonials
- Retorna depoimentos de clientes
- Response: Array de testimonials
```

## 3. MODELOS MONGODB

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  quantity: Number,
  unit: String,
  weight: String,
  freeShipping: Boolean,
  discount: Number,
  popular: Boolean,
  image: String,
  specifications: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  orderId: String, // ID único para o cliente
  customer: {
    name: String,
    email: String,
    phone: String,
    address: {
      cep: String,
      street: String,
      number: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String
    },
    notes: String
  },
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  paymentMethod: String,
  subtotal: Number,
  discount: Number,
  total: Number,
  status: String, // pending, paid, shipped, delivered, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

### Stock
```javascript
{
  _id: ObjectId,
  totalAvailable: Number,
  sold: Number,
  remaining: Number,
  lastUpdated: Date
}
```

### Testimonial
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  rating: Number,
  comment: String,
  date: Date,
  approved: Boolean
}
```

## 4. INTEGRAÇÃO FRONTEND-BACKEND

### 4.1 Substituir Mock Data
- Remover imports de mock.js
- Implementar chamadas para APIs
- Adicionar loading states
- Implementar error handling

### 4.2 Estado Global
- Usar useState para estoque global
- Implementar refresh automático do estoque
- Notificações toast para feedback

### 4.3 Fluxo de Pedido
1. Cliente adiciona produtos ao carrinho (local state)
2. No checkout, valida dados do formulário
3. Envia POST /api/orders com todos os dados
4. Atualiza estoque via PUT /api/stock
5. Exibe confirmação com instruções de pagamento
6. Opcional: Integração WhatsApp para contato

### 4.4 Validações
- Verificar disponibilidade antes de adicionar ao carrinho
- Validar estoque antes de finalizar pedido
- Validação de campos obrigatórios no checkout
- Máscara para telefone e CEP

## 5. FUNCIONALIDADES ADICIONAIS

### 5.1 Sistema de Notificação
- Toast para ações do usuário
- Alertas de estoque baixo
- Confirmação de pedidos

### 5.2 Analytics Básicas
- Contador de visualizações
- Produtos mais vendidos
- Conversão de carrinho

### 5.3 SEO e Performance
- Meta tags para produtos
- Compressão de imagens
- Lazy loading

## 6. PRÓXIMOS PASSOS

1. ✅ Frontend completo com mock data
2. ⏳ Implementar backend com MongoDB
3. ⏳ Integrar frontend com backend
4. ⏳ Testes completos
5. ⏳ Deploy e configuração de domínio