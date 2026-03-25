# AgriConnect - Sistema de Agricultura Inteligente
# Especificação para Backend Spring Boot

## 1. VISÃO GERAL DO SISTEMA

### 1.1 Descrição
O AgriConnect é um sistema de gestão agrícola inteligente que permite aos agricultores gerenciar suas culturas, monitorar condições climáticas, acompanhar preços de mercado, gerenciar tarefas e analisar métricas de produção.

### 1.2 Stack Tecnológica Recomendada
- **Framework**: Spring Boot 3.2+
- **Java**: JDK 17+
- **Banco de Dados**: PostgreSQL (produção) / H2 (desenvolvimento)
- **ORM**: Spring Data JPA / Hibernate
- **Segurança**: Spring Security + JWT
- **Documentação**: SpringDoc OpenAPI (Swagger)
- **Cache**: Redis
- **Build**: Maven/Gradle
- **Testes**: JUnit 5, Mockito, TestContainers

---

## 2. ENTIDADES E MODELOS DE DADOS

### 2.1 Usuário (User)
```java
@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String role; // ADMIN, MANAGER, WORKER
    
    @OneToMany(mappedBy = "owner")
    private List<Farm> farms;
    
    private String avatar;
    private String phone;
    private Boolean active = true;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### 2.2 Fazenda (Farm)
```java
@Entity
@Table(name = "farms")
public class Farm {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Double totalArea; // em hectares
    
    @Column(nullable = false)
    private String location;
    
    @Column(nullable = false)
    private String city;
    
    @Column(nullable = false)
    private String state;
    
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
    
    @OneToMany(mappedBy = "farm")
    private List<Sector> sectors;
    
    @OneToMany(mappedBy = "farm")
    private List<Crop> crops;
    
    private String description;
    private String soilType;
    private String irrigationSystem;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

### 2.3 Setor (Sector)
```java
@Entity
@Table(name = "sectors")
public class Sector {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Double area; // hectares
    
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;
    
    @OneToMany(mappedBy = "sector")
    private List<Crop> crops;
    
    private String soilType;
    private String irrigationType; // AUTOMATIC, MANUAL, DRIP, PIVOT
    private String status; // ACTIVE, INACTIVE, MAINTENANCE
    
    private GeoLocation coordinates; // Embeddable para lat/lng
}
```

### 2.4 Cultura (Crop)
```java
@Entity
@Table(name = "crops")
public class Crop {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String variety;
    
    @ManyToOne
    @JoinColumn(name = "sector_id")
    private Sector sector;
    
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;
    
    @Column(nullable = false)
    private Double plantedArea;
    
    @Column(nullable = false)
    private LocalDate plantedDate;
    
    private LocalDate expectedHarvestDate;
    private LocalDate actualHarvestDate;
    
    @Enumerated(EnumType.STRING)
    private CropStatus status; // PLANTED, GROWING, FLOWERING, HARVEST_READY, HARVESTED
    
    @Enumerated(EnumType.STRING)
    private HealthStatus health; // EXCELLENT, GOOD, WARNING, CRITICAL
    
    @Enumerated(EnumType.STRING)
    private IrrigationType irrigation;
    
    private Integer progressPercentage;
    private Double expectedYield;
    private String notes;
    
    @OneToMany(mappedBy = "crop")
    private List<CropActivity> activities;
    
    @OneToMany(mappedBy = "crop")
    private List<Task> tasks;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

public enum CropStatus {
    PLANTED, GROWING, FLOWERING, HARVEST_READY, HARVESTED
}

public enum HealthStatus {
    EXCELLENT, GOOD, WARNING, CRITICAL
}

public enum IrrigationType {
    AUTOMATIC, MANUAL, DRIP, PIVOT, CENTRAL_PIVOT
}
```

### 2.5 Atividade da Cultura (CropActivity)
```java
@Entity
@Table(name = "crop_activities")
public class CropActivity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;
    
    @Enumerated(EnumType.STRING)
    private ActivityType type; // PLANTING, IRRIGATION, FERTILIZATION, PEST_CONTROL, HARVEST, MAINTENANCE
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private LocalDate date;
    
    private Double cost;
    private String notes;
    
    @ManyToOne
    @JoinColumn(name = "performed_by")
    private User performedBy;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}

public enum ActivityType {
    PLANTING, IRRIGATION, FERTILIZATION, PEST_CONTROL, HARVEST, MAINTENANCE, SOIL_ANALYSIS
}
```

### 2.6 Tarefa (Task)
```java
@Entity
@Table(name = "tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TaskPriority priority; // HIGH, MEDIUM, LOW
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status; // PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    
    @Enumerated(EnumType.STRING)
    private TaskType type; // IRRIGATION, FERTILIZER, MONITORING, HARVEST, MAINTENANCE, ANALYSIS
    
    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;
    
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;
    
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
    
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    @Column(nullable = false)
    private LocalDate dueDate;
    
    private LocalDate completedDate;
    private String location;
    private String notes;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

public enum TaskPriority { HIGH, MEDIUM, LOW }
public enum TaskStatus { PENDING, IN_PROGRESS, COMPLETED, CANCELLED }
public enum TaskType { IRRIGATION, FERTILIZER, MONITORING, HARVEST, MAINTENANCE, ANALYSIS }
```

### 2.7 Preço de Mercado (MarketPrice)
```java
@Entity
@Table(name = "market_prices")
public class MarketPrice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String product;
    
    @Column(nullable = false)
    private String unit; // "saca 60kg", "@ 15kg", etc.
    
    @Column(nullable = false)
    private Double currentPrice;
    
    private Double previousPrice;
    private Double variationPercentage;
    
    @Enumerated(EnumType.STRING)
    private PriceTrend trend; // UP, DOWN, STABLE
    
    private String market; // CBOT, BM&F, ICE, CEPEA
    
    @Column(nullable = false)
    private LocalDateTime priceDate;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}

public enum PriceTrend { UP, DOWN, STABLE }
```

### 2.8 Clima/Previsão (WeatherData)
```java
@Entity
@Table(name = "weather_data")
public class WeatherData {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String location;
    
    @Column(nullable = false)
    private LocalDate forecastDate;
    
    private Integer temperatureMax;
    private Integer temperatureMin;
    private Integer humidity;
    private Integer windSpeed;
    private Integer uvIndex;
    private Integer rainProbability;
    private Double precipitation;
    
    private String condition; // SUNNY, CLOUDY, RAINY, PARTLY_CLOUDY
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

### 2.9 Notificação (Notification)
```java
@Entity
@Table(name = "notifications")
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type; // ALERT, INFO, WARNING, SUCCESS
    
    private Boolean read = false;
    
    private String actionUrl;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}

public enum NotificationType { ALERT, INFO, WARNING, SUCCESS }
```

### 2.10 Métricas de Produção (ProductionMetric)
```java
@Entity
@Table(name = "production_metrics")
public class ProductionMetric {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "crop_id")
    private Crop crop;
    
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;
    
    @Column(nullable = false)
    private Integer year;
    
    @Column(nullable = false)
    private Integer month;
    
    private Double yieldPerHectare;
    private Double totalProduction;
    private Double costPerHectare;
    private Double revenue;
    private Double profit;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

---

## 3. ESTRUTURA DE PACOTES

```
com.agriconnect/
├── AgriconnectApplication.java
├── config/
│   ├── SecurityConfig.java
│   ├── JwtConfig.java
│   ├── SwaggerConfig.java
│   ├── CorsConfig.java
│   └── CacheConfig.java
├── controller/
│   ├── AuthController.java
│   ├── UserController.java
│   ├── FarmController.java
│   ├── CropController.java
│   ├── TaskController.java
│   ├── MarketController.java
│   ├── WeatherController.java
│   ├── DashboardController.java
│   └── NotificationController.java
├── service/
│   ├── AuthService.java
│   ├── UserService.java
│   ├── FarmService.java
│   ├── CropService.java
│   ├── TaskService.java
│   ├── MarketService.java
│   ├── WeatherService.java
│   ├── DashboardService.java
│   ├── NotificationService.java
│   └── impl/
│       └── [implementações]
├── repository/
│   ├── UserRepository.java
│   ├── FarmRepository.java
│   ├── CropRepository.java
│   ├── TaskRepository.java
│   ├── MarketPriceRepository.java
│   ├── WeatherDataRepository.java
│   └── NotificationRepository.java
├── entity/
│   └── [entidades listadas acima]
├── dto/
│   ├── request/
│   │   ├── LoginRequest.java
│   │   ├── RegisterRequest.java
│   │   ├── CreateCropRequest.java
│   │   ├── UpdateCropRequest.java
│   │   ├── CreateTaskRequest.java
│   │   └── ...
│   └── response/
│       ├── AuthResponse.java
│       ├── CropResponse.java
│       ├── TaskResponse.java
│       ├── DashboardStatsResponse.java
│       ├── MarketPriceResponse.java
│       └── ...
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── BadRequestException.java
│   └── UnauthorizedException.java
├── security/
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── UserPrincipal.java
└── util/
    ├── DateUtils.java
    └── Constants.java
```

---

## 4. ENDPOINTS DA API REST

### 4.1 Autenticação
```
POST   /api/auth/login           - Login do usuário
POST   /api/auth/register        - Registro de novo usuário
POST   /api/auth/refresh         - Refresh token
POST   /api/auth/logout          - Logout
POST   /api/auth/forgot-password - Solicitar reset de senha
POST   /api/auth/reset-password  - Resetar senha
```

### 4.2 Usuários
```
GET    /api/users/me             - Dados do usuário logado
PUT    /api/users/me             - Atualizar perfil
PUT    /api/users/me/password    - Alterar senha
GET    /api/users/me/farms       - Listar fazendas do usuário
```

### 4.3 Fazendas
```
GET    /api/farms                - Listar todas as fazendas
GET    /api/farms/{id}           - Detalhes de uma fazenda
POST   /api/farms                - Criar nova fazenda
PUT    /api/farms/{id}           - Atualizar fazenda
DELETE /api/farms/{id}           - Excluir fazenda
GET    /api/farms/{id}/sectors   - Listar setores da fazenda
GET    /api/farms/{id}/crops     - Listar culturas da fazenda
GET    /api/farms/{id}/stats     - Estatísticas da fazenda
```

### 4.4 Culturas
```
GET    /api/crops                      - Listar todas as culturas
GET    /api/crops/{id}                 - Detalhes de uma cultura
POST   /api/crops                      - Criar nova cultura
PUT    /api/crops/{id}                 - Atualizar cultura
DELETE /api/crops/{id}                 - Excluir cultura
PATCH  /api/crops/{id}/status          - Atualizar status
PATCH  /api/crops/{id}/health          - Atualizar saúde
GET    /api/crops/{id}/activities      - Listar atividades
POST   /api/crops/{id}/activities      - Registrar atividade
GET    /api/crops/status/{status}      - Filtrar por status
GET    /api/crops/search?name=xxx      - Buscar culturas
```

### 4.5 Tarefas
```
GET    /api/tasks                      - Listar todas as tarefas
GET    /api/tasks/{id}                 - Detalhes de uma tarefa
POST   /api/tasks                      - Criar nova tarefa
PUT    /api/tasks/{id}                 - Atualizar tarefa
DELETE /api/tasks/{id}                 - Excluir tarefa
PATCH  /api/tasks/{id}/status          - Atualizar status
PATCH  /api/tasks/{id}/complete        - Marcar como concluída
GET    /api/tasks/status/{status}      - Filtrar por status
GET    /api/tasks/priority/{priority}  - Filtrar por prioridade
GET    /api/tasks/overdue              - Tarefas atrasadas
GET    /api/tasks/today                - Tarefas do dia
```

### 4.6 Mercado
```
GET    /api/market/prices              - Listar preços atuais
GET    /api/market/prices/{id}         - Preço de um produto
GET    /api/market/prices/history      - Histórico de preços
GET    /api/market/trends              - Tendências de mercado
GET    /api/market/top-movers          - Maiores variações
POST   /api/market/prices              - Atualizar preço (admin)
```

### 4.7 Clima
```
GET    /api/weather/current            - Clima atual
GET    /api/weather/forecast           - Previsão 5 dias
GET    /api/weather/alerts             - Alertas meteorológicos
```

### 4.8 Dashboard
```
GET    /api/dashboard/stats            - Estatísticas gerais
GET    /api/dashboard/summary          - Resumo rápido
GET    /api/dashboard/activities       - Atividades recentes
GET    /api/dashboard/alerts           - Alertas e notificações
```

### 4.9 Notificações
```
GET    /api/notifications              - Listar notificações
GET    /api/notifications/unread       - Notificações não lidas
PATCH  /api/notifications/{id}/read    - Marcar como lida
PATCH  /api/notifications/read-all     - Marcar todas como lidas
```

---

## 5. DTOS DE REQUEST/RESPONSE

### 5.1 Login Request
```java
public class LoginRequest {
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    @Size(min = 6)
    private String password;
}
```

### 5.2 Auth Response
```java
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private UserResponse user;
}
```

### 5.3 Create Crop Request
```java
public class CreateCropRequest {
    @NotBlank
    private String name;
    
    @NotBlank
    private String variety;
    
    @NotNull
    private Long sectorId;
    
    @NotNull
    private Double plantedArea;
    
    @NotNull
    private LocalDate plantedDate;
    
    private LocalDate expectedHarvestDate;
    
    @NotNull
    private IrrigationType irrigation;
    
    private Double expectedYield;
    private String notes;
}
```

### 5.4 Dashboard Stats Response
```java
public class DashboardStatsResponse {
    private Long activeCrops;
    private Double totalArea;
    private Double expectedHarvest;
    private Double rainfallIndex;
    private Integer pendingTasks;
    private Integer inProgressTasks;
    private Integer completedTasks;
    private List<RecentActivity> recentActivities;
    private List<MarketPriceResponse> topMarketPrices;
}
```

---

## 6. FUNCIONALIDADES ESPECÍFICAS

### 6.1 Sistema de Autenticação
- JWT com refresh tokens
- Hash de senha com BCrypt
- Validação de email
- Rate limiting para tentativas de login
- Sessões simultâneas controladas

### 6.2 Dashboard Inteligente
- Cálculo automático de estatísticas
- Cache de dados frequentes (Redis)
- Agregação por período
- Comparação com períodos anteriores

### 6.3 Gestão de Culturas
- Tracking completo do ciclo de vida
- Cálculo automático de progresso
- Alertas de saúde baseados em métricas
- Histórico de atividades

### 6.4 Sistema de Tarefas
- Atribuição múltipla
- Recorrência de tarefas
- Notificações por email/push
- Atrasos detectados automaticamente

### 6.5 Integração de Mercado
- Atualização automática via scheduler
- Integração com APIs externas (quando disponível)
- Cálculo de variações
- Histórico de preços

### 6.6 Clima
- Integração com API de clima (OpenWeatherMap)
- Cache de dados
- Alertas automáticos

---

## 7. EXEMPLOS DE CÓDIGO

### 7.1 CropController.java
```java
@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
@Tag(name = "Culturas", description = "API de gestão de culturas")
public class CropController {
    
    private final CropService cropService;
    
    @GetMapping
    @Operation(summary = "Listar todas as culturas")
    public ResponseEntity<Page<CropResponse>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) CropStatus status) {
        return ResponseEntity.ok(cropService.findAll(page, size, status));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar cultura por ID")
    public ResponseEntity<CropResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(cropService.findById(id));
    }
    
    @PostMapping
    @Operation(summary = "Criar nova cultura")
    public ResponseEntity<CropResponse> create(
            @Valid @RequestBody CreateCropRequest request,
            @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cropService.create(request, user.getId()));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar cultura")
    public ResponseEntity<CropResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCropRequest request) {
        return ResponseEntity.ok(cropService.update(id, request));
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Atualizar status da cultura")
    public ResponseEntity<CropResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        return ResponseEntity.ok(cropService.updateStatus(id, request.getStatus()));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir cultura")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cropService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 7.2 CropService.java
```java
@Service
@RequiredArgsConstructor
@Transactional
public class CropServiceImpl implements CropService {
    
    private final CropRepository cropRepository;
    private final FarmRepository farmRepository;
    private final SectorRepository sectorRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    @Override
    @Transactional(readOnly = true)
    public Page<CropResponse> findAll(int page, int size, CropStatus status) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        Page<Crop> crops = status != null 
                ? cropRepository.findByStatus(status, pageable)
                : cropRepository.findAll(pageable);
        
        return crops.map(this::toResponse);
    }
    
    @Override
    @Transactional(readOnly = true)
    public CropResponse findById(Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cultura não encontrada"));
        return toResponse(crop);
    }
    
    @Override
    public CropResponse create(CreateCropRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        
        Sector sector = sectorRepository.findById(request.getSectorId())
                .orElseThrow(() -> new ResourceNotFoundException("Setor não encontrado"));
        
        Crop crop = Crop.builder()
                .name(request.getName())
                .variety(request.getVariety())
                .sector(sector)
                .farm(sector.getFarm())
                .plantedArea(request.getPlantedArea())
                .plantedDate(request.getPlantedDate())
                .expectedHarvestDate(request.getExpectedHarvestDate())
                .irrigation(request.getIrrigation())
                .expectedYield(request.getExpectedYield())
                .notes(request.getNotes())
                .status(CropStatus.PLANTED)
                .health(HealthStatus.GOOD)
                .progressPercentage(0)
                .build();
        
        crop = cropRepository.save(crop);
        
        // Criar notificação
        notificationService.create(Notification.builder()
                .user(user)
                .title("Nova cultura cadastrada")
                .message(String.format("A cultura %s foi cadastrada com sucesso", crop.getName()))
                .type(NotificationType.SUCCESS)
                .build());
        
        return toResponse(crop);
    }
    
    @Override
    public CropResponse update(Long id, UpdateCropRequest request) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cultura não encontrada"));
        
        if (request.getName() != null) crop.setName(request.getName());
        if (request.getVariety() != null) crop.setVariety(request.getVariety());
        if (request.getExpectedHarvestDate() != null) 
            crop.setExpectedHarvestDate(request.getExpectedHarvestDate());
        if (request.getExpectedYield() != null) 
            crop.setExpectedYield(request.getExpectedYield());
        if (request.getNotes() != null) crop.setNotes(request.getNotes());
        
        crop = cropRepository.save(crop);
        return toResponse(crop);
    }
    
    @Override
    public CropResponse updateStatus(Long id, CropStatus status) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cultura não encontrada"));
        
        crop.setStatus(status);
        
        // Atualizar progresso baseado no status
        crop.setProgressPercentage(calculateProgress(crop));
        
        if (status == CropStatus.HARVESTED) {
            crop.setActualHarvestDate(LocalDate.now());
        }
        
        crop = cropRepository.save(crop);
        return toResponse(crop);
    }
    
    @Override
    public void delete(Long id) {
        if (!cropRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cultura não encontrada");
        }
        cropRepository.deleteById(id);
    }
    
    private Integer calculateProgress(Crop crop) {
        return switch (crop.getStatus()) {
            case PLANTED -> 10;
            case GROWING -> 50;
            case FLOWERING -> 75;
            case HARVEST_READY -> 90;
            case HARVESTED -> 100;
        };
    }
    
    private CropResponse toResponse(Crop crop) {
        return CropResponse.builder()
                .id(crop.getId())
                .name(crop.getName())
                .variety(crop.getVariety())
                .sectorName(crop.getSector().getName())
                .farmName(crop.getFarm().getName())
                .plantedArea(crop.getPlantedArea())
                .plantedDate(crop.getPlantedDate())
                .expectedHarvestDate(crop.getExpectedHarvestDate())
                .actualHarvestDate(crop.getActualHarvestDate())
                .status(crop.getStatus())
                .health(crop.getHealth())
                .irrigation(crop.getIrrigation())
                .progressPercentage(crop.getProgressPercentage())
                .expectedYield(crop.getExpectedYield())
                .notes(crop.getNotes())
                .createdAt(crop.getCreatedAt())
                .build();
    }
}
```

### 7.3 DashboardService.java
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {
    
    private final CropRepository cropRepository;
    private final TaskRepository taskRepository;
    private final WeatherDataRepository weatherRepository;
    private final MarketPriceRepository marketRepository;
    private final FarmRepository farmRepository;
    
    @Override
    public DashboardStatsResponse getStats(Long farmId) {
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new ResourceNotFoundException("Fazenda não encontrada"));
        
        // Estatísticas de culturas
        Long activeCrops = cropRepository.countByFarmIdAndStatusIn(
                farmId, 
                List.of(CropStatus.PLANTED, CropStatus.GROWING, CropStatus.FLOWERING)
        );
        
        // Área total cultivada
        Double totalArea = cropRepository.sumPlantedAreaByFarmId(farmId);
        
        // Previsão de colheita
        Double expectedHarvest = cropRepository.sumExpectedYieldByFarmId(farmId);
        
        // Índice pluviométrico
        Double rainfallIndex = calculateRainfallIndex(farm.getLocation());
        
        // Tarefas
        Integer pendingTasks = taskRepository.countByFarmIdAndStatus(farmId, TaskStatus.PENDING);
        Integer inProgressTasks = taskRepository.countByFarmIdAndStatus(farmId, TaskStatus.IN_PROGRESS);
        Integer completedTasks = taskRepository.countByFarmIdAndStatus(farmId, TaskStatus.COMPLETED);
        
        // Atividades recentes
        List<RecentActivity> recentActivities = getRecentActivities(farmId, 5);
        
        // Top preços de mercado
        List<MarketPriceResponse> topPrices = getTopMarketPrices(5);
        
        return DashboardStatsResponse.builder()
                .activeCrops(activeCrops)
                .totalArea(totalArea != null ? totalArea : 0.0)
                .expectedHarvest(expectedHarvest != null ? expectedHarvest : 0.0)
                .rainfallIndex(rainfallIndex)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)
                .completedTasks(completedTasks)
                .recentActivities(recentActivities)
                .topMarketPrices(topPrices)
                .build();
    }
    
    private Double calculateRainfallIndex(String location) {
        // Buscar dados dos últimos 30 dias
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(30);
        
        List<WeatherData> weatherData = weatherRepository
                .findByLocationAndForecastDateBetween(location, startDate, endDate);
        
        return weatherData.stream()
                .mapToDouble(w -> w.getPrecipitation() != null ? w.getPrecipitation() : 0)
                .sum();
    }
    
    private List<RecentActivity> getRecentActivities(Long farmId, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<CropActivity> activities = cropRepository
                .findRecentActivitiesByFarmId(farmId, pageable);
        
        return activities.stream()
                .map(a -> RecentActivity.builder()
                        .date(a.getDate())
                        .activity(a.getType().toString())
                        .crop(a.getCrop().getName())
                        .area(a.getCrop().getPlantedArea() + " ha")
                        .build())
                .toList();
    }
    
    private List<MarketPriceResponse> getTopMarketPrices(int limit) {
        Pageable pageable = PageRequest.of(0, limit, 
                Sort.by("variationPercentage").descending());
        
        return marketRepository.findAll(pageable).stream()
                .map(this::toMarketPriceResponse)
                .toList();
    }
}
```

---

## 8. CONFIGURAÇÕES

### 8.1 application.yml
```yaml
spring:
  application:
    name: agriconnect-api
  
  datasource:
    url: jdbc:postgresql://localhost:5432/agriconnect
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
  
  cache:
    type: redis
  
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}

server:
  port: ${SERVER_PORT:8080}

jwt:
  secret: ${JWT_SECRET:your-secret-key-here-must-be-at-least-256-bits}
  expiration: 86400000
  refresh-expiration: 604800000

weather:
  api:
    key: ${WEATHER_API_KEY:}
    url: https://api.openweathermap.org/data/2.5

logging:
  level:
    com.agriconnect: DEBUG
    org.springframework.security: INFO
```

### 8.2 SecurityConfig.java
```java
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api-docs/**", "/swagger-ui/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .anyRequest().authenticated()
            )
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## 9. INSTRUÇÕES FINAIS

### 9.1 Requisitos Funcionais
1. Implementar todas as entidades com relacionamentos corretos
2. Criar todos os endpoints REST documentados
3. Implementar autenticação JWT completa
4. Criar validações de entrada em todos os DTOs
5. Implementar tratamento de erros global
6. Criar testes unitários e de integração
7. Documentar API com Swagger/OpenAPI
8. Implementar logging adequado
9. Criar migrations de banco de dados (Flyway/Liquibase)

### 9.2 Requisitos Não-Funcionais
1. Performance: resposta < 200ms para 95% das requisições
2. Segurança: criptografia de dados sensíveis
3. Escalabilidade: arquitetura preparada para microserviços
4. Disponibilidade: tratamento de erros graceful
5. Manutenibilidade: código limpo e documentado

### 9.3 Prioridades de Implementação
1. **Alta**: Autenticação, Usuários, Culturas, Tarefas
2. **Média**: Dashboard, Mercado, Notificações
3. **Baixa**: Clima (integração externa), Relatórios avançados

---

## 10. EXEMPLO DE USO

### Criar Cultura
```bash
POST /api/crops
Authorization: Bearer {token}
Content-Type: application/json

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
```

### Resposta
```json
{
  "id": 1,
  "name": "Soja",
  "variety": "BRS 284",
  "sectorName": "Setor 3",
  "farmName": "Fazenda São José",
  "plantedArea": 120.0,
  "plantedDate": "2024-09-15",
  "expectedHarvestDate": "2025-02-15",
  "status": "PLANTED",
  "health": "GOOD",
  "irrigation": "AUTOMATIC",
  "progressPercentage": 10,
  "expectedYield": 180.0,
  "createdAt": "2024-09-15T10:30:00"
}
```
