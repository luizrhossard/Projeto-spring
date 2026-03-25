'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  ChevronRight,
  Droplets,
  Beaker,
  Search,
  Wrench,
  Microscope
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TasksPanelProps {
  compact?: boolean
}

const taskTypeConfig: Record<string, { color: string; bg: string; Icon: React.ComponentType<{ className?: string }> }> = {
  irrigation: { color: 'text-sky-600', bg: 'bg-sky-100', Icon: Droplets },
  fertilizer: { color: 'text-emerald-600', bg: 'bg-emerald-100', Icon: Beaker },
  monitoring: { color: 'text-purple-600', bg: 'bg-purple-100', Icon: Search },
  harvest: { color: 'text-amber-600', bg: 'bg-amber-100', Icon: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" fill="#a16207" />
      <path d="M12 6v12M8 10l4-4 4 4M8 14l4 4 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )},
  maintenance: { color: 'text-gray-600', bg: 'bg-gray-100', Icon: Wrench },
  analysis: { color: 'text-teal-600', bg: 'bg-teal-100', Icon: Microscope }
}

const tasks = [
  {
    id: 1,
    title: 'Irrigar lavoura de soja - Setor 3',
    description: 'Aplicar 15mm de água conforme planejamento',
    priority: 'high',
    status: 'pending',
    dueDate: '2025-01-12',
    assignedTo: 'João Pedro',
    location: 'Setor 3 - Soja',
    type: 'irrigation'
  },
  {
    id: 2,
    title: 'Aplicar fertilizante NPK',
    description: 'Segunda aplicação de fertilizante no milho',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-01-13',
    assignedTo: 'Maria Santos',
    location: 'Setor 2 - Milho',
    type: 'fertilizer'
  },
  {
    id: 3,
    title: 'Monitorar pragas - Área norte',
    description: 'Verificar presença de lagartas na soja',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2025-01-12',
    assignedTo: 'Carlos Silva',
    location: 'Área Norte',
    type: 'monitoring'
  },
  {
    id: 4,
    title: 'Colheita de café',
    description: 'Iniciar colheita mecanizada do setor 1',
    priority: 'high',
    status: 'pending',
    dueDate: '2025-01-15',
    assignedTo: 'Equipe Colheita',
    location: 'Setor 1 - Café',
    type: 'harvest'
  },
  {
    id: 5,
    title: 'Manutenção equipamentos',
    description: 'Revisão do sistema de irrigação pivô central',
    priority: 'low',
    status: 'completed',
    dueDate: '2025-01-10',
    assignedTo: 'Pedro Técnico',
    location: 'Galpão Principal',
    type: 'maintenance'
  },
  {
    id: 6,
    title: 'Amostragem de solo',
    description: 'Coletar amostras para análise de fertilidade',
    priority: 'medium',
    status: 'pending',
    dueDate: '2025-01-14',
    assignedTo: 'Ana Agrônoma',
    location: 'Setor 4 - Algodão',
    type: 'analysis'
  }
]

const priorityConfig = {
  high: { label: 'Alta', color: 'bg-red-100 text-red-700 border-red-200', gradient: 'from-red-400 to-rose-500' },
  medium: { label: 'Média', color: 'bg-amber-100 text-amber-700 border-amber-200', gradient: 'from-amber-400 to-orange-500' },
  low: { label: 'Baixa', color: 'bg-gray-100 text-gray-700 border-gray-200', gradient: 'from-gray-400 to-slate-500' }
}

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-sky-100 text-sky-700', icon: Clock },
  in_progress: { label: 'Em Progresso', color: 'bg-amber-100 text-amber-700', icon: AlertTriangle },
  completed: { label: 'Concluído', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle }
}

export function TasksPanel({ compact = false }: TasksPanelProps) {
  const [tasksList, setTasksList] = useState(tasks)
  const [filter, setFilter] = useState('all')

  const filteredTasks = tasksList.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const displayTasks = compact ? filteredTasks.slice(0, 3) : filteredTasks

  const toggleTask = (taskId: number) => {
    setTasksList(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const pendingCount = tasksList.filter(t => t.status === 'pending').length
  const inProgressCount = tasksList.filter(t => t.status === 'in_progress').length
  const completedCount = tasksList.filter(t => t.status === 'completed').length

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-white to-gray-50">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Calendar className="w-5 h-5 text-emerald-600" />
          </motion.div>
          Tarefas
        </CardTitle>
        {!compact && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
              <Plus className="w-4 h-4 mr-1" />
              Nova Tarefa
            </Button>
          </motion.div>
        )}
      </CardHeader>
      <CardContent className="p-5">
        {/* Quick Stats */}
        {!compact && (
          <motion.div 
            className="flex gap-3 mb-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {[
              { count: pendingCount, label: 'pendentes', color: 'sky', icon: Clock },
              { count: inProgressCount, label: 'em progresso', color: 'amber', icon: AlertTriangle },
              { count: completedCount, label: 'concluídas', color: 'emerald', icon: CheckCircle }
            ].map((stat, index) => {
              const Icon = stat.icon
              const colors: Record<string, string> = {
                sky: 'bg-sky-50 text-sky-600',
                amber: 'bg-amber-50 text-amber-600',
                emerald: 'bg-emerald-50 text-emerald-600'
              }
              return (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Icon className={`w-4 h-4 ${colors[stat.color].split(' ')[1]}`} />
                  </motion.div>
                  <span className={`text-sm font-medium ${colors[stat.color].split(' ')[1]}`}>
                    {stat.count} {stat.label}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Filter Tabs */}
        {!compact && (
          <Tabs value={filter} onValueChange={setFilter} className="mb-4">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Todas</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Pendentes</TabsTrigger>
              <TabsTrigger value="in_progress" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Em Progresso</TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Concluídas</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Tasks List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {displayTasks.map((task, index) => {
              const priority = priorityConfig[task.priority as keyof typeof priorityConfig]
              const status = statusConfig[task.status as keyof typeof statusConfig]
              const taskType = taskTypeConfig[task.type as keyof typeof taskTypeConfig]
              const StatusIcon = status.icon
              const TaskIcon = taskType?.Icon || CheckCircle

              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, x: -30, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 30, rotateY: 15 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.01,
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    task.status === 'completed' 
                      ? 'bg-gray-50/50 border-gray-200 opacity-70' 
                      : 'bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200'
                  }`}
                  style={{ perspective: 1000 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mt-1"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {/* Animated task type icon */}
                          <motion.div 
                            className={`p-1.5 rounded-lg ${taskType?.bg || 'bg-gray-100'}`}
                            animate={{ 
                              rotateZ: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity, 
                              ease: 'easeInOut',
                              delay: index * 0.2
                            }}
                          >
                            <TaskIcon className={`w-4 h-4 ${taskType?.color || 'text-gray-600'}`} />
                          </motion.div>
                          <h4 className={`font-medium ${
                            task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800'
                          }`}>
                            {task.title}
                          </h4>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Badge 
                            variant="outline" 
                            className={`${priority.color} shadow-sm`}
                          >
                            {priority.label}
                          </Badge>
                        </motion.div>
                      </div>
                      
                      <p className={`text-sm mt-1 ml-9 ${
                        task.status === 'completed' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {task.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-3 ml-9 text-xs text-gray-400">
                        <motion.div 
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.02 }}
                        >
                          <MapPin className="w-3 h-3" />
                          <span>{task.location}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.02 }}
                        >
                          <User className="w-3 h-3" />
                          <span>{task.assignedTo}</span>
                        </motion.div>
                        {task.status !== 'completed' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <Badge variant="outline" className={status.color}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {compact && tasks.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button variant="ghost" className="w-full mt-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
              Ver todas as tarefas
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.div>
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
