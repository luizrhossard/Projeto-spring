# Prompt para Codex - Criar Backend Spring Boot

## Contexto
Você é um desenvolvedor backend sênior especializado em Spring Boot. Crie um sistema de gestão agrícola completo e profissional baseado nas especificações abaixo.

## Descrição do Sistema
**AgriConnect** - Sistema de Agricultura Inteligente

Um sistema web para gestão de fazendas que permite:
- Gerenciamento de culturas e ciclo de vida
- Controle de tarefas e atividades
- Monitoramento de preços de mercado
- Acompanhamento de clima
- Dashboard com métricas e analytics
- Sistema de notificações

## Stack Obrigatória
- Java 17+
- Spring Boot 3.2+
- Spring Data JPA
- Spring Security + JWT
- PostgreSQL
- Maven/Gradle
- SpringDoc OpenAPI (Swagger)

## Entidades Principais

### 1. User (Usuário)
- id, email, password, name, role (ADMIN, MANAGER, WORKER)
- Relacionamento: 1 usuário → N fazendas

### 2. Farm (Fazenda)
- id, name, totalArea, location, city, state
- Relacionamento: N setores, N culturas

### 3. Crop (Cultura) ⭐ PRINCIPAL
- id, name, variety, plantedArea, plantedDate
- expectedHarvestDate, status (PLANTED, GROWING, FLOWERING, HARVEST_READY, HARVESTED)
- health (EXCELLENT, GOOD, WARNING, CRITICAL)
- irrigation (AUTOMATIC, MANUAL, DRIP, PIVOT)
- progressPercentage (calculado automaticamente)
- expectedYield, notes

### 4. Task (Tarefa)
- id, title, description, priority (HIGH, MEDIUM, LOW)
- status (PENDING, IN_PROGRESS, COMPLETED)
- type (IRRIGATION, FERTILIZER, MONITORING, HARVEST, MAINTENANCE)
- dueDate, assignedTo, location

### 5. MarketPrice (Preço de Mercado)
- id, product, unit, currentPrice, previousPrice
- variationPercentage, trend (UP, DOWN, STABLE)
- market, priceDate

### 6. WeatherData (Clima)
- id, location, forecastDate
- temperatureMax, temperatureMin, humidity
- rainProbability, precipitation, condition

### 7. Notification (Notificação)
- id, user, title, message, type
- read, actionUrl

## Endpoints REST (CRUD Completo)

### Autenticação
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
```

### Culturas (Prioritário)
```
GET    /api/crops              - Listar todas
GET    /api/crops/{id}         - Buscar por ID
POST   /api/crops              - Criar
PUT    /api/crops/{id}         - Atualizar
DELETE /api/crops/{id}         - Excluir
PATCH  /api/crops/{id}/status  - Atualizar status
GET    /api/crops/status/{status} - Filtrar por status
```

### Tarefas
```
GET    /api/tasks
GET    /api/tasks/{id}
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
PATCH  /api/tasks/{id}/complete
GET    /api/tasks/today
GET    /api/tasks/overdue
```

### Dashboard
```
GET /api/dashboard/stats    - Estatísticas gerais
GET /api/dashboard/summary  - Resumo rápido
```

### Mercado
```
GET  /api/market/prices
GET  /api/market/trends
POST /api/market/prices (admin)
```

## Regras de Negócio

### Status de Cultura → Progresso
- PLANTED → 10%
- GROWING → 50%
- FLOWERING → 75%
- HARVEST_READY → 90%
- HARVESTED → 100%

### Cálculos do Dashboard
- activeCrops = COUNT WHERE status IN (PLANTED, GROWING, FLOWERING)
- totalArea = SUM plantedArea
- expectedHarvest = SUM expectedYield
- pendingTasks = COUNT WHERE status = PENDING

### Notificações Automáticas
- Ao criar cultura: "Nova cultura cadastrada"
- Tarefa atrasada: "Tarefa pendente há X dias"
- Status crítico: "Cultura com saúde crítica"

## Estrutura de Pastas
```
com.agriconnect/
├── controller/    (REST endpoints)
├── service/       (lógica de negócio)
├── repository/    (acesso a dados)
├── entity/        (modelos JPA)
├── dto/           (request/response objects)
├── config/        (Security, Swagger, CORS)
├── exception/     (tratamento de erros)
└── security/      (JWT, filtros)
```

## Funcionalidades Obrigatórias

1. **Autenticação JWT completa** com refresh token
2. **Validação de entrada** em todos os endpoints
3. **Tratamento de erros global** com respostas padronizadas
4. **Documentação Swagger** em todos os endpoints
5. **Paginação e ordenação** nas listagens
6. **Filtros** por status, data, etc.
7. **Relacionamentos JPA** corretos
8. **Transações** nas operações de escrita
9. **Logs** de operações importantes
10. **DTOs** para separar entidade da API

## Exemplo de Request/Response

### Criar Cultura
```json
POST /api/crops
{
  "name": "Soja",
  "variety": "BRS 284",
  "sectorId": 1,
  "plantedArea": 120.0,
  "plantedDate": "2024-09-15",
  "expectedHarvestDate": "2025-02-15",
  "irrigation": "AUTOMATIC",
  "expectedYield": 180.0
}

Response 201:
{
  "id": 1,
  "name": "Soja",
  "variety": "BRS 284",
  "status": "PLANTED",
  "health": "GOOD",
  "progressPercentage": 10,
  "plantedDate": "2024-09-15",
  "expectedHarvestDate": "2025-02-15"
}
```

### Dashboard Stats
```json
GET /api/dashboard/stats?farmId=1

Response:
{
  "activeCrops": 12,
  "totalArea": 450.0,
  "expectedHarvest": 2500.0,
  "rainfallIndex": 180.0,
  "pendingTasks": 4,
  "inProgressTasks": 1,
  "completedTasks": 1,
  "recentActivities": [
    {
      "date": "2024-01-12",
      "activity": "HARVEST",
      "crop": "Café",
      "area": "50 ha"
    }
  ]
}
```

## O que NÃO fazer
- Não use Lombok @Value para entidades
- Não exponha entidades JPA diretamente na API
- Não faça lógica de negócio nos controllers
- Não use System.out.println (use logs)
- Não deixe endpoints sem documentação

## Comece por aqui:
1. Crie o projeto Spring Boot com as dependências
2. Configure PostgreSQL e JPA
3. Implemente as entidades
4. Crie os repositories
5. Implemente o serviço de autenticação
6. Implemente o CRUD de culturas
7. Implemente o CRUD de tarefas
8. Crie o dashboard service
9. Adicione documentação Swagger
10. Teste tudo

---

**Gere código limpo, bem documentado e seguindo boas práticas de desenvolvimento Java/Spring Boot.**
