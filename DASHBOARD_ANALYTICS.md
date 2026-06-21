# 📊 Dashboard Analytics - Farma+ 

## O que foi implementado?

Um sistema completo de **analytics em tempo real** para o e-commerce Farma+ que rastreia:

### ✅ Eventos rastreados
- **Product Viewed**: Quando um cliente visualiza os detalhes de um produto
- **Product Added to Cart**: Quando um produto é adicionado ao carrinho  
- **Checkout Completed**: Quando o cliente finaliza a compra

### 📈 Métricas disponíveis no Dashboard

**Métricas principais:**
- Total de visualizações de produtos
- Total de produtos adicionados ao carrinho
- Total de checkouts completos
- Taxa de conversão (visualizações → compras)
- Taxa de conversão de carrinho (visualizações → adicionado ao carrinho)

**TOP Produtos:**
- Gráfico de barras dos 10 produtos mais visualizados
- Tabela com taxa de conversão por produto
- Taxa de inclusão no carrinho por produto

**Resumo:**
- Taxa média de carrinho
- Taxa média de conversão
- Ticket médio (valor médio por compra)
- Total de produtos únicos

---

## 🚀 Como acessar o Dashboard?

Após rodar o servidor de desenvolvimento:

```
npm run dev
```

Acesse em seu navegador:

```
http://localhost:5173/admin/dashboard
```

---

## 📁 Estrutura de arquivos criados

```
src/
├── lib/
│   ├── stores/
│   │   └── analytics.ts          ← Store Svelte reativa
│   ├── server/
│   │   └── analytics.ts          ← Funções de rastreamento
│   └── components/
│       └── analytics/
│           ├── MetricCard.svelte         ← Card de métrica
│           ├── TopProductsChart.svelte   ← Gráfico de barras
│           └── ConversionTable.svelte    ← Tabela de conversão
└── routes/
    └── admin/
        └── dashboard/
            └── +page.svelte             ← Página principal
```

---

## 💾 Armazenamento de dados

**Tudo é salvo em localStorage:**
- Chave: `farma_analytics`
- Formato: JSON estruturado
- Persiste entre sessões do navegador
- Botão "Limpar dados" disponível no dashboard

---

## 🔧 Funções de rastreamento

### Track Product View
```typescript
trackProductView(productId: string, productName?: string)
```

**Onde é usado:**
- Página de detalhes do produto (`/products/[id]`)
- Disparado no `onMount()`

### Track Add to Cart
```typescript
trackProductAddedToCart(productId: string, productName?: string, productPrice?: number)
```

**Onde é usado:**
- Componente ProductCard (clique no botão "Adicionar")
- Página de detalhes do produto (botão "Adicionar ao Carrinho")

### Track Checkout
```typescript
trackCheckoutCompleted(productId: string, productName?: string)
```

**Onde é usado:**
- Página do carrinho (`/cart`)
- Disparado quando o checkout é finalizado com sucesso

---

## 📊 Exemplo de dados armazenados

```json
{
  "events": [
    {
      "type": "product:viewed",
      "productId": "123",
      "productName": "Dipirona 500mg",
      "timestamp": 1718968234567
    },
    {
      "type": "product:added_to_cart",
      "productId": "123",
      "productName": "Dipirona 500mg",
      "productPrice": 9.99,
      "timestamp": 1718968242891
    },
    {
      "type": "checkout:completed",
      "productId": "123",
      "productName": "Dipirona 500mg",
      "timestamp": 1718968256145
    }
  ]
}
```

---

## 🎯 Métricas calculadas automaticamente

O sistema calcula em tempo real:

```typescript
// Stores derivadas (reativas)
totalViews              // Total de visualizações
totalAddedToCart        // Total adicionados ao carrinho
totalCheckouts          // Total de checkouts
conversionRate          // % (checkouts / visualizações)
cartConversionRate      // % (adicionados / visualizações)
topProducts             // Array dos 10 top produtos
conversionByProduct     // Array com métricas por produto
```

---

## ✨ Recursos adicionais

**No Dashboard você pode:**
- ✅ Ver métricas em tempo real (atualiza conforme os clientes interagem)
- ✅ Visualizar gráfico de barras dos produtos mais populares
- ✅ Analisar tabela completa de conversão
- ✅ Limpar todos os dados (botão no topo)
- ✅ Responsive design (funciona em mobile, tablet, desktop)

---

## 🔄 Fluxo de dados

```
Usuário interage
    ↓
Função de rastreamento é chamada
    ↓
Event é adicionado ao store
    ↓
Store é salvo em localStorage
    ↓
Stores derivadas recalculam
    ↓
Dashboard atualiza automaticamente
```

---

## 📝 Notas

- Dados são persitidos localmente (sem backend necessário para MVP)
- Ideal para testes e demonstrações
- Pode ser integrado com um backend real futuramente
- Sem autenticação (é público por enquanto, conforme pedido)

---

## 🚀 Próximas melhorias futuras

Se houver mais tempo:
- ✏️ Gráficos com Chart.js/D3.js
- ✏️ Filtros por data
- ✏️ Exportar dados em CSV
- ✏️ Backend API para persistência
- ✏️ Autenticação
- ✏️ Histórico de períodos
