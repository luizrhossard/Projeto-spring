'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Droplets, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  SojaIcon,
  MilhoIcon,
  CafeIcon,
  FeijaoIcon,
  AlgodaoIcon,
  CanaIcon,
  GenericCropIcon
} from './crop-icons'
import { Card3D, Progress3D } from './animations'
import api, { CulturaRequest } from '@/lib/api'

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
  Icon: React.ComponentType<{ className?: string }> | null
}

interface CropManagementProps {
  compact?: boolean
  culturas?: CropData[]
  onCulturaCreated?: () => void
}

const getIconForCrop = (name: string): React.ComponentType<{ className?: string }> => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Soja': SojaIcon,
    'Milho': MilhoIcon,
    'Café': CafeIcon,
    'Feijão': FeijaoIcon,
    'Algodão': AlgodaoIcon,
    'Cana-de-Açúcar': CanaIcon,
  }
  return iconMap[name] || GenericCropIcon
}

const defaultCrops: CropData[] = [
  {
    id: 1,
    name: 'Soja',
    variety: 'BRS 284',
    area: '120 ha',
    status: 'growing',
    progress: 65,
    plantedDate: '2024-09-15',
    harvestDate: '2025-02-15',
    health: 'good',
    irrigation: 'Automática',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    Icon: SojaIcon
  },
  {
    id: 2,
    name: 'Milho',
    variety: 'Híbrido 2B587',
    area: '80 ha',
    status: 'growing',
    progress: 45,
    plantedDate: '2024-10-01',
    harvestDate: '2025-03-01',
    health: 'warning',
    irrigation: 'Manual',
    color: '#f59e0b',
    gradient: 'from-amber-400 to-orange-500',
    Icon: MilhoIcon
  },
  {
    id: 3,
    name: 'Café',
    variety: 'Arábica',
    area: '150 ha',
    status: 'harvest',
    progress: 90,
    plantedDate: '2024-03-01',
    harvestDate: '2025-01-15',
    health: 'good',
    irrigation: 'Gotejamento',
    color: '#a16207',
    gradient: 'from-amber-600 to-yellow-700',
    Icon: CafeIcon
  },
  {
    id: 4,
    name: 'Feijão',
    variety: 'Carioca',
    area: '50 ha',
    status: 'planted',
    progress: 20,
    plantedDate: '2024-11-20',
    harvestDate: '2025-02-20',
    health: 'good',
    irrigation: 'Automática',
    color: '#b45309',
    gradient: 'from-orange-500 to-amber-600',
    Icon: FeijaoIcon
  },
  {
    id: 5,
    name: 'Algodão',
    variety: 'FM 966',
    area: '50 ha',
    status: 'growing',
    progress: 55,
    plantedDate: '2024-09-01',
    harvestDate: '2025-04-01',
    health: 'excellent',
    irrigation: 'Pivô Central',
    color: '#84cc16',
    gradient: 'from-lime-400 to-green-500',
    Icon: AlgodaoIcon
  },
  {
    id: 6,
    name: 'Cana-de-Açúcar',
    variety: 'RB867515',
    area: '100 ha',
    status: 'growing',
    progress: 70,
    plantedDate: '2024-04-15',
    harvestDate: '2025-05-15',
    health: 'good',
    irrigation: 'Automática',
    color: '#4ade80',
    gradient: 'from-green-400 to-emerald-500',
    Icon: CanaIcon
  }
]

const statusConfig = {
  planted: { label: 'Plantado', color: 'bg-sky-100 text-sky-700', icon: Calendar },
  growing: { label: 'Crescimento', color: 'bg-emerald-100 text-emerald-700', icon: TrendingUp },
  harvest: { label: 'Colheita', color: 'bg-amber-100 text-amber-700', icon: CheckCircle }
}

const healthConfig = {
  excellent: { label: 'Excelente', color: 'text-emerald-600', bg: 'bg-emerald-500' },
  good: { label: 'Bom', color: 'text-green-600', bg: 'bg-green-500' },
  warning: { label: 'Atenção', color: 'text-amber-600', bg: 'bg-amber-500' },
  critical: { label: 'Crítico', color: 'text-red-600', bg: 'bg-red-500' }
}

export function CropManagement({ compact = false, culturas, onCulturaCreated }: CropManagementProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [novaCultura, setNovaCultura] = useState<CulturaRequest>({
    nome: '',
    area: 0,
    dataPlantio: new Date().toISOString().split('T')[0]
  })

  const handleCriarCultura = async () => {
    if (!novaCultura.nome || !novaCultura.area) return
    
    try {
      setIsLoading(true)
      await api.culturas.create(novaCultura)
      setIsDialogOpen(false)
      setNovaCultura({ nome: '', area: 0, dataPlantio: new Date().toISOString().split('T')[0] })
      onCulturaCreated?.()
    } catch (error) {
      console.error('Erro ao criar cultura:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const crops = culturas || defaultCrops

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'all' || crop.status === filter
    return matchesSearch && matchesFilter
  })

  const displayCrops = compact ? filteredCrops.slice(0, 4) : filteredCrops

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-white to-gray-50">
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </motion.div>
          Gestão de Culturas
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Nova Cultura
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Cultura</DialogTitle>
              <DialogDescription>
                Adicione uma nova cultura ao seu cadastro
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="nome" className="text-sm font-medium">Nome da Cultura</label>
                <Input
                  id="nome"
                  placeholder="Ex: Soja, Milho, Café..."
                  value={novaCultura.nome}
                  onChange={(e) => setNovaCultura({ ...novaCultura, nome: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="area" className="text-sm font-medium">Área (ha)</label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Ex: 100"
                  value={novaCultura.area || ''}
                  onChange={(e) => setNovaCultura({ ...novaCultura, area: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="dataPlantio" className="text-sm font-medium">Data de Plantio</label>
                <Input
                  id="dataPlantio"
                  type="date"
                  value={novaCultura.dataPlantio}
                  onChange={(e) => setNovaCultura({ ...novaCultura, dataPlantio: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button 
                onClick={handleCriarCultura} 
                disabled={isLoading || !novaCultura.nome || !novaCultura.area}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Criar Cultura
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <motion.div 
            className="relative flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar culturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all"
            />
          </motion.div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Todas</TabsTrigger>
              <TabsTrigger value="growing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Crescendo</TabsTrigger>
              <TabsTrigger value="harvest" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Colheita</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Crops Grid */}
        <div className={`grid gap-5 ${compact ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          <AnimatePresence mode="popLayout">
            {displayCrops.map((crop, index) => {
              const status = statusConfig[crop.status as keyof typeof statusConfig]
              const health = healthConfig[crop.health as keyof typeof healthConfig]
              const StatusIcon = status.icon
              const CropIcon = crop.Icon || getIconForCrop(crop.name)

              return (
                <motion.div
                  key={crop.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100 
                  }}
                >
                  <Card3D intensity={8}>
                    <Card className="border border-gray-100 hover:shadow-2xl transition-shadow duration-500 overflow-hidden group">
                      <CardContent className="p-0">
                        {/* Header with gradient */}
                        <div className={`p-4 bg-gradient-to-r ${crop.gradient} relative overflow-hidden`}>
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <motion.div 
                              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]"
                              animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                          </div>
                          
                          <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-3">
                              {/* Floating Icon */}
                              <motion.div 
                                className="p-2 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"
                                animate={{ 
                                  y: [0, -5, 0],
                                  rotateZ: [0, 2, -2, 0]
                                }}
                                transition={{ 
                                  duration: 4, 
                                  repeat: Infinity, 
                                  ease: 'easeInOut',
                                  delay: index * 0.2
                                }}
                              >
                                <CropIcon className="w-10 h-10" />
                              </motion.div>
                              <div>
                                <h3 className="font-bold text-white text-lg drop-shadow-sm">{crop.name}</h3>
                                <p className="text-sm text-white/80">{crop.variety}</p>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                <DropdownMenuItem>Registrar Atividade</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4 bg-gradient-to-b from-white to-gray-50/50">
                          {/* Status and Area */}
                          <div className="flex items-center justify-between">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <Badge className={`${status.color} shadow-sm`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </motion.div>
                            <span className="text-sm font-bold text-gray-600">{crop.area}</span>
                          </div>

                          {/* Progress with 3D effect */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 font-medium">Progresso</span>
                              <motion.span 
                                className="font-bold text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={crop.progress}
                              >
                                {crop.progress}%
                              </motion.span>
                            </div>
                            <Progress3D value={crop.progress} color={crop.color} />
                          </div>

                          {/* Health Indicator */}
                          <div className="flex items-center justify-between">
                            <motion.div 
                              className="flex items-center gap-2"
                              whileHover={{ scale: 1.02 }}
                            >
                              {crop.health === 'warning' ? (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 500 }}
                                >
                                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                                </motion.div>
                              )}
                              <span className={`text-sm font-medium ${health.color}`}>
                                {health.label}
                              </span>
                            </motion.div>
                            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <Droplets className="w-3 h-3" />
                              <span className="text-xs font-medium">{crop.irrigation}</span>
                            </div>
                          </div>

                          {/* Dates */}
                          <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Plantio: {new Date(crop.plantedDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Colheita: {new Date(crop.harvestDate).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Card3D>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {compact && crops.length > 4 && (
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300">
              Ver Todas as Culturas ({crops.length})
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
