# Instruções para Criação do Sistema AgriConnect em Spring Boot

## ⚠️ ATENÇÃO - LEIA PRIMEIRO

**O backend Spring Boot deve ser criado JUNTO com a integração do frontend Next.js fornecido.**

**NÃO é aceitável entregar apenas o backend. O projeto final deve ter o frontend Next.js integrado e funcionando com as APIs do Spring Boot.**

---

## Contexto do Projeto

Você receberá um projeto frontend completo em Next.js/React de um sistema de gestão agrícola chamado **AgriConnect**. 

**Seu objetivo é:**
1. ✅ Criar o backend em Spring Boot com todas as APIs
2. ✅ **ADAPTAR E INTEGRAR o frontend Next.js ao projeto Spring Boot**
3. ✅ Garantir que TODAS as funções do frontend tenham funcionalidade real
4. ✅ Entregar um sistema completo e funcional (backend + frontend integrado)

---

## 🎯 OBJETIVO PRINCIPAL

### OBRIGATÓRIO: Entregar um projeto único com:

```
agriconnect/
├── backend/              # Spring Boot API
├── frontend/             # Next.js (INTEGRADO ao backend)
└── docker-compose.yml
```

**O frontend Next.js DEVE:**
- Estar dentro do mesmo projeto
- Consumir as APIs do Spring Boot
- Funcionar com dados reais (não mockados)
- Ter autenticação funcionando de ponta a ponta

---

## 📋 Funcionalidades do Sistema (DEVEM FUNCIONAR DE VERDADE)

### 1. Dashboard Principal
- **Estatísticas em tempo real**: Total de culturas, área plantada, produção estimada, alertas ativos
- **Cards interativos** com animações 3D
- **Atualização automática** dos dados via API

### 2. Gestão de Culturas (Crops)
- **Listar todas as culturas** cadastradas → `GET /api/crops`
- **Adicionar nova cultura** → `POST /api/crops`
- **Editar cultura existente** → `PUT /api/crops/{id}`
- **Excluir cultura** → `DELETE /api/crops/{id}`
- **Visualizar detalhes** de cada cultura:
  - Nome e tipo (Soja, Milho, Café, Feijão, Algodão, Cana-de-Açúcar)
  - Área plantada (hectares)
  - Status (Em crescimento, Pronto para colheita, Colhido, etc.)
  - Data de plantio
  - Data estimada de colheita
  - Produção estimada
  - Localização (coordenadas ou endereço)
  - Observações

### 3. Widget de Clima
- **Exibir clima atual** da região da fazenda → `GET /api/weather/current`
- **Previsão para os próximos dias** → `GET /api/weather/forecast`
- **Alertas climáticos** (geada, chuva excessiva, seca) → `GET /api/weather/alerts`
- **Integração com API de clima real** (OpenWeatherMap ou similar)

### 4. Painel de Tarefas
- **Listar tarefas** → `GET /api/tasks` (com filtros por status/prioridade)
- **Criar nova tarefa** → `POST /api/tasks`
- **Editar tarefa** → `PUT /api/tasks/{id}`
- **Excluir tarefa** → `DELETE /api/tasks/{id}`
- **Marcar como concluída** → `PATCH /api/tasks/{id}/complete`

### 5. Cotações de Mercado
- **Exibir preços atuais** das commodities → `GET /api/market/quotes`
- **Histórico de preços** → `GET /api/market/history`
- **Integração com API de cotações real**

### 6. Analytics/Relatórios
- **Gráficos de produção** → `GET /api/analytics/production`
- **Comparativo anual** → `GET /api/analytics/comparison`
- **Exportar relatórios** em PDF/Excel

### 7. Sistema de Usuários
- **Login/Logout** → `POST /api/auth/login`
- **Cadastro** → `POST /api/auth/register`
- **Perfis de acesso**: ADMIN, MANAGER, EMPLOYEE

---

## 🛠️ Stack Tecnológica

### Backend (Spring Boot)
- Java 17+
- Spring Boot 3.x
- Spring Security (JWT)
- Spring Data JPA
- PostgreSQL (produção) / H2 (desenvolvimento)
- Flyway (migrações)
- Maven ou Gradle
- Lombok
- Spring Doc OpenAPI (Swagger)

### Frontend (JÁ EXISTE - APENAS INTEGRAR)
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (animações 3D)

---

## 🔌 API Endpoints Obrigatórios

### Autenticação
```
POST   /api/auth/login          # Login
POST   /api/auth/register       # Cadastro
POST   /api/auth/refresh        # Refresh token
POST   /api/auth/logout         # Logout
```

### Culturas
```
GET    /api/crops               # Listar todas
GET    /api/crops/{id}          # Buscar por ID
POST   /api/crops               # Criar nova
PUT    /api/crops/{id}          # Atualizar
DELETE /api/crops/{id}          # Excluir
GET    /api/crops/stats         # Estatísticas
```

### Tarefas
```
GET    /api/tasks               # Listar (com filtros)
GET    /api/tasks/{id}          # Buscar por ID
POST   /api/tasks               # Criar
PUT    /api/tasks/{id}          # Atualizar
DELETE /api/tasks/{id}          # Excluir
PATCH  /api/tasks/{id}/complete # Marcar concluída
```

### Clima
```
GET    /api/weather/current     # Clima atual
GET    /api/weather/forecast    # Previsão
GET    /api/weather/alerts      # Alertas
```

### Mercado/Cotações
```
GET    /api/market/quotes       # Cotações atuais
GET    /api/market/history      # Histórico
```

### Analytics
```
GET    /api/analytics/production     # Dados de produção
GET    /api/analytics/comparison     # Comparativo anual
```

---

## 🗄️ Modelo de Banco de Dados

```sql
-- Usuários
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Culturas
CREATE TABLE crops (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    area_hectares DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) NOT NULL,
    planting_date DATE NOT NULL,
    harvest_date_estimate DATE,
    production_estimate DECIMAL(12,2),
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    location_address VARCHAR(255),
    notes TEXT,
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tarefas
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    priority VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL,
    due_date DATE,
    crop_id BIGINT REFERENCES crops(id),
    assigned_user_id BIGINT REFERENCES users(id),
    created_by BIGINT REFERENCES users(id),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cotações
CREATE TABLE market_quotes (
    id BIGSERIAL PRIMARY KEY,
    commodity VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(5) DEFAULT 'BRL',
    variation_percent DECIMAL(5,2),
    quoted_at TIMESTAMP NOT NULL
);

-- Alertas
CREATE TABLE alerts (
    id BIGSERIAL PRIMARY KEY,
    type VARCHAR(30) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT,
    related_crop_id BIGINT REFERENCES crops(id),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎨 INTEGRAÇÃO DO FRONTEND - OBRIGATÓRIO

### O frontend Next.js fornecido DEVE ser adaptado para consumir as APIs Spring Boot:

**1. Substituir todos os dados mockados por chamadas às APIs:**

```typescript
// ANTES (mockado)
const crops = [
  { id: 1, name: 'Soja', area: 150, status: 'GROWING' }
];

// DEPOIS (integrado com API)
const crops = await fetch('http://localhost:8080/api/crops', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(res => res.json());
```

**2. Criar serviço de API no frontend:**

```typescript
// src/services/api.ts
const API_BASE = 'http://localhost:8080/api';

export const api = {
  login: (email, password) => 
    fetch(`${API_BASE}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) }),
  
  getCrops: () => 
    fetch(`${API_BASE}/crops`, { headers: authHeader() }),
  
  createCrop: (data) => 
    fetch(`${API_BASE}/crops`, { method: 'POST', body: JSON.stringify(data) }),
  
  // ... todas as outras APIs
};
```

**3. Configurar CORS no Spring Boot:**

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
```

**4. Atualizar variáveis de ambiente do frontend:**

```env
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## 📁 Estrutura Final do Projeto

```
agriconnect/
├── backend/
│   ├── src/main/java/com/agriconnect/
│   │   ├── config/           # Security, CORS
│   │   ├── controller/       # REST APIs
│   │   ├── service/          # Lógica de negócio
│   │   ├── repository/       # JPA
│   │   ├── model/            # Entidades
│   │   ├── dto/              # DTOs
│   │   └── security/         # JWT
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/     # Flyway
│   └── pom.xml
│
├── frontend/                  # Next.js ADAPTADO
│   ├── src/
│   │   ├── services/         # Chamadas de API
│   │   ├── contexts/         # Auth context
│   │   └── components/       # Componentes React
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ✅ Checklist de Entrega

### Backend
- [ ] Spring Boot configurado
- [ ] Banco de dados conectado
- [ ] JWT funcionando
- [ ] Todas as APIs implementadas
- [ ] CORS configurado

### Frontend INTEGRADO
- [ ] Dados mockados substituídos por APIs
- [ ] Login/Logout funcionando
- [ ] CRUD de culturas funcional
- [ ] CRUD de tarefas funcional
- [ ] Clima com dados reais
- [ ] Cotações com dados reais
- [ ] Analytics com dados reais

### Projeto Completo
- [ ] Docker Compose funcional
- [ ] README com instruções
- [ ] Swagger documentado
- [ ] Dados de seed no banco

---

## 🚀 Instruções de Execução (incluir no README)

```bash
# Subir banco de dados
docker-compose up -d postgres

# Executar backend
cd backend
./mvnw spring-boot:run

# Em outro terminal, executar frontend
cd frontend
npm install
npm run dev

# Acessar: http://localhost:3000
```

---

## ⚠️ REQUISITOS MÍNIMOS PARA ACEITAÇÃO

1. ✅ Backend Spring Boot funcional com todas as APIs
2. ✅ **Frontend Next.js INTEGRADO e funcionando com as APIs**
3. ✅ Autenticação JWT funcionando de ponta a ponta
4. ✅ CRUD de culturas e tarefas funcional
5. ✅ Dados reais (não mockados)
6. ✅ Docker Compose para subir o projeto

---

**SE VOCÊ ENTREGAR APENAS O BACKEND SEM O FRONTEND INTEGRADO, O PROJETO SERÁ REJEITADO.**

**O sistema deve estar COMPLETO e FUNCIONAL com backend + frontend integrado.**
