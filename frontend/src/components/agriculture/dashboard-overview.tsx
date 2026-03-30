'use client'

import { useState, useEffect } from 'react'
import {
  Sprout,
  MapPin,
  ClipboardList,
  CheckCircle2,
  Calendar,
  X,
  CircleDot,
  Droplets,
  Sun,
  Wheat,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import api from '@/lib/api'

interface CropData {
  id: number
  name: string
  area: string
}

interface TarefaData {
  id: number
  status: string
}

interface DashboardOverviewProps {
  culturas?: CropData[]
  tarefas?: TarefaData[]
}

interface AgendaItem {
  id: number
  titulo: string
  data: string
  tipo: 'tarefa' | 'cultura'
  status?: string
  prioridade?: string
  icone: string
  corFundo: string
  descricao?: string
}

export function DashboardOverview({ culturas = [], tarefas = [] }: DashboardOverviewProps) {
  const [isAgendaOpen, setIsAgendaOpen] = useState(false)
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const culturasAtivas = culturas.length || 12
  const totalArea = culturas.reduce((acc, c) => acc + parseFloat(c.area.replace(' ha', '')), 0) || 450
  const tarefasPendentes = tarefas.filter(t => t.status === 'pending').length || 5
  const tarefasConcluidas = tarefas.filter(t => t.status === 'completed').length || 7

  useEffect(() => {
    if (isAgendaOpen) {
      carregarAgenda()
    }
  }, [isAgendaOpen])

  const carregarAgenda = async () => {
    try {
      setIsLoading(true)
      const [tarefasData, culturasData] = await Promise.all([
        api.tarefas.getAll(),
        api.culturas.getAll()
      ])

      const items: AgendaItem[] = []

      tarefasData.forEach(tarefa => {
        items.push({
          id: tarefa.id,
          titulo: tarefa.titulo,
          data: tarefa.dataVencimento,
          tipo: 'tarefa',
          status: tarefa.status,
          prioridade: tarefa.prioridade,
          icone: getIconeTarefa(tarefa.titulo),
          corFundo: getCorFundoTarefa(tarefa.status),
          descricao: tarefa.descricao || ''
        })
      })

      culturasData.forEach(cultura => {
        items.push({
          id: cultura.id,
          titulo: `${cultura.nome} - ${cultura.status}`,
          data: cultura.dataPlantio,
          tipo: 'cultura',
          status: cultura.status,
          icone: getIconeCultura(cultura.status),
          corFundo: getCorFundoCultura(cultura.status),
          descricao: `${cultura.area} ha`
        })
      })

      items.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
      setAgendaItems(items)
    } catch (error) {
      console.error('Erro ao carregar agenda:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIconeTarefa = (titulo: string): string => {
    const t = titulo.toLowerCase()
    if (t.includes('irrig')) return 'droplet'
    if (t.includes('fertil')) return 'flask'
    if (t.includes('praga')) return 'bug'
    if (t.includes('colheita')) return 'wheat'
    if (t.includes('plantio')) return 'sprout'
    if (t.includes('manuten')) return 'wrench'
    return 'circle'
  }

  const getIconeCultura = (status: string): string => {
    const s = status?.toLowerCase() || ''
    if (s.includes('plantio') || s.includes('crescendo')) return 'sprout'
    if (s.includes('colheita')) return 'wheat'
    if (s.includes('tratos')) return 'flask'
    if (s.includes('finalizada')) return 'check'
    return 'sprout'
  }

  const getCorFundoTarefa = (status: string): string => {
    const s = status?.toLowerCase() || ''
    if (s.includes('pending') || s.includes('pendente')) return 'bg-amber-100 text-amber-600'
    if (s.includes('progress') || s.includes('andamento')) return 'bg-blue-100 text-blue-600'
    if (s.includes('completed') || s.includes('concluida')) return 'bg-emerald-100 text-emerald-600'
    return 'bg-gray-100 text-gray-600'
  }

  const getCorFundoCultura = (status: string): string => {
    const s = status?.toLowerCase() || ''
    if (s.includes('plantio') || s.includes('crescendo')) return 'bg-emerald-100 text-emerald-600'
    if (s.includes('colheita')) return 'bg-amber-100 text-amber-600'
    if (s.includes('tratos')) return 'bg-violet-100 text-violet-600'
    if (s.includes('finalizada')) return 'bg-emerald-100 text-emerald-600'
    return 'bg-gray-100 text-gray-600'
  }

  const renderIcone = (icone: string, className: string = 'w-5 h-5') => {
    switch (icone) {
      case 'sprout': return <Sprout className={className} />
      case 'droplet': return <Droplets className={className} />
      case 'flask': return <Sun className={className} />
      case 'bug': return <AlertCircle className={className} />
      case 'wheat': return <Wheat className={className} />
      case 'check': return <CheckCircle2 className={className} />
      default: return <CircleDot className={className} />
    }
  }

  const formatarData = (data: string) => {
    const date = new Date(data + 'T00:00:00')
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const diffTime = date.getTime() - hoje.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hoje'
    if (diffDays === 1) return 'Amanha'
    if (diffDays === -1) return 'Ontem'
    if (diffDays > 1 && diffDays <= 7) return date.toLocaleDateString('pt-BR', { weekday: 'long' })
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  const stats = [
    {
      title: 'Culturas Ativas',
      value: culturasAtivas.toString(),
      change: '+2%',
      description: 'vs mes anterior',
      icon: Sprout,
      bar: 'bg-emerald-500'
    },
    {
      title: 'Area Total',
      value: `${totalArea} ha`,
      change: '+12%',
      description: 'vs mes anterior',
      icon: MapPin,
      bar: 'bg-blue-500'
    },
    {
      title: 'Tarefas Pendentes',
      value: tarefasPendentes.toString(),
      change: '-5%',
      description: 'vs mes anterior',
      icon: ClipboardList,
      bar: 'bg-amber-500'
    },
    {
      title: 'Tarefas Concluidas',
      value: tarefasConcluidas.toString(),
      change: '+9%',
      description: 'vs mes anterior',
      icon: CheckCircle2,
      bar: 'bg-sky-500'
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500">Visao geral da sua fazenda</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsAgendaOpen(true)}
          className="border-[#d5e4da] text-emerald-700 hover:bg-emerald-50"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Ver agenda
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border border-[#dce8df] shadow-sm bg-white overflow-hidden">
              <div className={`h-1 ${stat.bar}`} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{stat.title}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-800">{stat.value}</p>
                    <p className="mt-1 text-xs text-emerald-600 font-medium">{stat.change}</p>
                    <p className="text-xs text-slate-400">{stat.description}</p>
                  </div>
                  <div className="h-9 w-9 rounded-lg bg-[#f1f6f3] flex items-center justify-center text-emerald-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={isAgendaOpen} onOpenChange={setIsAgendaOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Agenda de Atividades
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAgendaOpen(false)}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
              </div>
            ) : agendaItems.length > 0 ? (
              <div className="space-y-3">
                {agendaItems.map((item, index) => (
                  <div
                    key={`${item.tipo}-${item.id}-${index}`}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2.5 rounded-lg ${item.corFundo} shrink-0`}>
                      {renderIcone(item.icone, 'w-5 h-5')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-800">{item.titulo}</p>
                          {item.descricao && (
                            <p className="text-sm text-gray-600 mt-0.5">{item.descricao}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className="text-xs capitalize">
                            {item.tipo}
                          </Badge>
                          {item.prioridade && (
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.prioridade.toLowerCase()}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatarData(item.data)}</span>
                        </div>
                        {item.status && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span className="capitalize">{item.status.replace('_', ' ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-3 opacity-20" />
                <p className="text-lg font-medium">Nenhuma atividade na agenda</p>
                <p className="text-sm mt-1">Adicione tarefas ou culturas para ver sua agenda</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

