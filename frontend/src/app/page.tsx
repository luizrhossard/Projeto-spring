'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  DashboardHeader,
  DashboardOverview,
  CropManagement,
  MarketPrices,
  TasksPanel,
  WeatherWidget,
  AnalyticsPanel
} from '@/components/agriculture'
import api, { CulturaResponse, TarefaResponse, PrecoMercadoResponse } from '@/lib/api'

interface CropData {
  id: number
  name: string
  variety: string
  area: string
  status: 'planted' | 'growing' | 'harvest'
  progress: number
  plantedDate: string
  harvestDate: string
  health: 'excellent' | 'good' | 'warning' | 'critical'
  irrigation: string
  color: string
  gradient: string
  Icon: null
}

interface TarefaData {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed'
  dueDate: string
  assignedTo: string
  location: string
  type: 'irrigation' | 'fertilizer' | 'monitoring' | 'harvest' | 'maintenance' | 'analysis'
}

interface PrecoData {
  id: number
  produto: string
  preco: number
  variacao: number | null
}

const mapCulturaToCropData = (cultura: CulturaResponse): CropData => {
  const statusMap: Record<string, 'planted' | 'growing' | 'harvest'> = {
    'PLANTED': 'planted',
    'GROWING': 'growing',
    'HARVEST': 'harvest'
  }
  const healthMap: Record<'excellent' | 'good' | 'warning' | 'critical', string> = {
    'excellent': '#22c55e',
    'good': '#22c55e',
    'warning': '#f59e0b',
    'critical': '#ef4444'
  }
  const gradientMap: Record<string, string> = {
    'PLANTED': 'from-sky-400 to-blue-500',
    'GROWING': 'from-green-500 to-emerald-600',
    'HARVEST': 'from-amber-400 to-orange-500'
  }
  
  return {
    id: cultura.id,
    name: cultura.nome,
    variety: cultura.nome,
    area: `${cultura.area} ha`,
    status: statusMap[cultura.status] || 'growing',
    progress: Math.floor(Math.random() * 60) + 20,
    plantedDate: cultura.dataPlantio,
    harvestDate: cultura.previsaoColheita || '',
    health: 'good',
    irrigation: 'Automática',
    color: healthMap.good,
    gradient: gradientMap[cultura.status] || 'from-green-500 to-emerald-600',
    Icon: null
  }
}

const mapTarefaToTarefaData = (tarefa: TarefaResponse): TarefaData => {
  const priorityMap: Record<string, 'high' | 'medium' | 'low'> = {
    'HIGH': 'high',
    'MEDIUM': 'medium',
    'LOW': 'low'
  }
  const statusMap: Record<string, 'pending' | 'in_progress' | 'completed'> = {
    'PENDING': 'pending',
    'IN_PROGRESS': 'in_progress',
    'COMPLETED': 'completed'
  }
  
  return {
    id: tarefa.id,
    title: tarefa.titulo,
    description: tarefa.descricao || '',
    priority: priorityMap[tarefa.prioridade] || 'medium',
    status: statusMap[tarefa.status] || 'pending',
    dueDate: tarefa.dataVencimento,
    assignedTo: 'Usuário',
    location: tarefa.culturaNome || 'Geral',
    type: 'monitoring'
  }
}

const mapPrecoToPrecoData = (preco: PrecoMercadoResponse): PrecoData => ({
  id: preco.id,
  produto: preco.produto,
  preco: preco.preco,
  variacao: preco.variacao
})

const defaultCulturas: CropData[] = [
  { id: 1, name: 'Soja', variety: 'BRS 284', area: '120 ha', status: 'growing', progress: 65, plantedDate: '2024-09-15', harvestDate: '2025-02-15', health: 'good', irrigation: 'Automática', color: '#22c55e', gradient: 'from-green-500 to-emerald-600', Icon: null },
  { id: 2, name: 'Milho', variety: 'Híbrido 2B587', area: '80 ha', status: 'growing', progress: 45, plantedDate: '2024-10-01', harvestDate: '2025-03-01', health: 'warning', irrigation: 'Manual', color: '#f59e0b', gradient: 'from-amber-400 to-orange-500', Icon: null },
  { id: 3, name: 'Café', variety: 'Arábica', area: '150 ha', status: 'harvest', progress: 90, plantedDate: '2024-03-01', harvestDate: '2025-01-15', health: 'good', irrigation: 'Gotejamento', color: '#a16207', gradient: 'from-amber-600 to-yellow-700', Icon: null },
  { id: 4, name: 'Feijão', variety: 'Carioca', area: '50 ha', status: 'planted', progress: 20, plantedDate: '2024-11-20', harvestDate: '2025-02-20', health: 'good', irrigation: 'Automática', color: '#b45309', gradient: 'from-orange-500 to-amber-600', Icon: null },
  { id: 5, name: 'Algodão', variety: 'FM 966', area: '50 ha', status: 'growing', progress: 55, plantedDate: '2024-09-01', harvestDate: '2025-04-01', health: 'excellent', irrigation: 'Pivô Central', color: '#84cc16', gradient: 'from-lime-400 to-green-500', Icon: null },
  { id: 6, name: 'Cana-de-Açúcar', variety: 'RB867515', area: '100 ha', status: 'growing', progress: 70, plantedDate: '2024-04-15', harvestDate: '2025-05-15', health: 'good', irrigation: 'Automática', color: '#4ade80', gradient: 'from-green-400 to-emerald-500', Icon: null }
]

const defaultTarefas: TarefaData[] = [
  { id: 1, title: 'Irrigar lavoura de soja - Setor 3', description: 'Aplicar 15mm de água conforme planejamento', priority: 'high', status: 'pending', dueDate: '2025-01-12', assignedTo: 'João Pedro', location: 'Setor 3 - Soja', type: 'irrigation' },
  { id: 2, title: 'Aplicar fertilizante NPK', description: 'Segunda aplicação de fertilizante no milho', priority: 'medium', status: 'pending', dueDate: '2025-01-13', assignedTo: 'Maria Santos', location: 'Setor 2 - Milho', type: 'fertilizer' },
  { id: 3, title: 'Monitorar pragas - Área norte', description: 'Verificar presença de lagartas na soja', priority: 'high', status: 'in_progress', dueDate: '2025-01-12', assignedTo: 'Carlos Silva', location: 'Área Norte', type: 'monitoring' },
  { id: 4, title: 'Colheita de café', description: 'Iniciar colheita mecanizada do setor 1', priority: 'high', status: 'pending', dueDate: '2025-01-15', assignedTo: 'Equipe Colheita', location: 'Setor 1 - Café', type: 'harvest' },
  { id: 5, title: 'Manutenção equipamentos', description: 'Revisão do sistema de irrigação pivô central', priority: 'low', status: 'completed', dueDate: '2025-01-10', assignedTo: 'Pedro Técnico', location: 'Galpão Principal', type: 'maintenance' },
  { id: 6, title: 'Amostragem de solo', description: 'Coletar amostras para análise de fertilidade', priority: 'medium', status: 'pending', dueDate: '2025-01-14', assignedTo: 'Ana Agrônoma', location: 'Setor 4 - Algodão', type: 'analysis' }
]

const defaultPrecos: PrecoData[] = [
  { id: 1, produto: 'Soja', preco: 145.50, variacao: 2.35 },
  { id: 2, produto: 'Milho', preco: 75.00, variacao: -1.20 },
  { id: 3, produto: 'Café', preco: 685.00, variacao: 5.50 },
  { id: 4, produto: 'Feijão', preco: 320.00, variacao: 3.80 },
  { id: 5, produto: 'Algodão', preco: 185.00, variacao: 1.15 },
  { id: 6, produto: 'Açúcar', preco: 135.00, variacao: -0.90 }
]

export default function Home() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [culturas, setCulturas] = useState<CropData[]>([])
  const [tarefas, setTarefas] = useState<TarefaData[]>([])
  const [precos, setPrecos] = useState<PrecoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [culturasData, tarefasData, precosData] = await Promise.all([
        api.culturas.getAll().catch(() => []),
        api.tarefas.getAll().catch(() => []),
        api.precos.getAll().catch(() => [])
      ])

      setCulturas(culturasData.map(mapCulturaToCropData))
      setTarefas(tarefasData.map(mapTarefaToTarefaData))
      setPrecos(precosData.map(mapPrecoToPrecoData))
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      setError('Erro ao carregar dados do servidor')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return false
      }
      return true
    }

    if (checkAuth()) {
      fetchData()
    }
  }, [router])

  const handleCulturaCreated = useCallback(() => {
    fetchData()
  }, [fetchData])

  const handleTarefaCreated = useCallback(() => {
    fetchData()
  }, [fetchData])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )
    }

    const culturasData = culturas.length > 0 ? culturas : defaultCulturas
    const tarefasData = tarefas.length > 0 ? tarefas : defaultTarefas
    const precosData = precos.length > 0 ? precos : defaultPrecos

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <DashboardOverview culturas={culturasData} tarefas={tarefasData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CropManagement compact culturas={culturasData} onCulturaCreated={handleCulturaCreated} />
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <TasksPanel compact tarefas={tarefasData} onTarefaCreated={handleTarefaCreated} />
              </div>
            </div>
            <AnalyticsPanel />
          </div>
        )
      case 'crops':
        return <CropManagement culturas={culturasData} onCulturaCreated={handleCulturaCreated} />
      case 'market':
        return <MarketPrices />
      case 'tasks':
        return <TasksPanel tarefas={tarefasData} onTarefaCreated={handleTarefaCreated} />
      case 'analytics':
        return <AnalyticsPanel />
      default:
        return (
          <div className="space-y-6">
            <DashboardOverview culturas={culturasData} tarefas={tarefasData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CropManagement compact culturas={culturasData} onCulturaCreated={handleCulturaCreated} />
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <TasksPanel compact tarefas={tarefasData} onTarefaCreated={handleTarefaCreated} />
              </div>
            </div>
            <AnalyticsPanel />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="lg:pl-72 transition-all duration-300">
        <DashboardHeader 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}