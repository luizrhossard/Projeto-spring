'use client'

import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const productionData = [
  { month: 'Ago', soja: 180, milho: 120, cafe: 85 },
  { month: 'Set', soja: 220, milho: 140, cafe: 90 },
  { month: 'Out', soja: 280, milho: 160, cafe: 95 },
  { month: 'Nov', soja: 320, milho: 180, cafe: 100 },
  { month: 'Dez', soja: 350, milho: 200, cafe: 110 },
  { month: 'Jan', soja: 380, milho: 220, cafe: 120 },
]

const performanceMetrics = [
  { 
    label: 'Produtividade Média', 
    value: '3.2 ton/ha', 
    change: '+8.5%', 
    trend: 'up',
    description: 'vs. safra anterior'
  },
  { 
    label: 'Eficiência Hídrica', 
    value: '92%', 
    change: '+3.2%', 
    trend: 'up',
    description: 'uso de água'
  },
  { 
    label: 'Custo por Hectare', 
    value: 'R$ 2.450', 
    change: '-5.8%', 
    trend: 'up',
    description: 'redução de custos'
  },
  { 
    label: 'Área Colhida', 
    value: '380 ha', 
    change: '+12%', 
    trend: 'up',
    description: 'este mês'
  },
]

const recentActivities = [
  { date: '12 Jan', activity: 'Colheita iniciada', crop: 'Café', area: '50 ha', icon: '☕' },
  { date: '11 Jan', activity: 'Irrigação aplicada', crop: 'Soja', area: '120 ha', icon: '💧' },
  { date: '10 Jan', activity: 'Fertilizante NPK', crop: 'Milho', area: '80 ha', icon: '🧪' },
  { date: '09 Jan', activity: 'Controle de pragas', crop: 'Soja', area: '100 ha', icon: '🐛' },
  { date: '08 Jan', activity: 'Plantio concluído', crop: 'Feijão', area: '50 ha', icon: '🌱' },
]

export function AnalyticsPanel() {
  const maxValue = Math.max(...productionData.flatMap(d => [d.soja, d.milho, d.cafe]))

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label} className="border-0 shadow-md">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-gray-500">{metric.label}</p>
              <div className="flex items-end justify-between mt-2">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-gray-400">{metric.description}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Chart */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Produção por Cultura
            </CardTitle>
            <div className="flex items-center gap-2">
              <Tabs defaultValue="6months">
                <TabsList className="h-8">
                  <TabsTrigger value="6months" className="text-xs">6 meses</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Ano</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-gray-600">Soja</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-600">Milho</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-sm text-gray-600">Café</span>
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-4">
              {productionData.map((data) => (
                <div key={data.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                    <div className="flex-1 flex gap-2 mx-4">
                      {/* Soja Bar */}
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${(data.soja / maxValue) * 100}%` }}
                        />
                      </div>
                      {/* Milho Bar */}
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${(data.milho / maxValue) * 100}%` }}
                        />
                      </div>
                      {/* Café Bar */}
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${(data.cafe / maxValue) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export */}
            <div className="flex justify-end mt-6">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{activity.activity}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {activity.crop}
                      </Badge>
                      <span className="text-xs text-gray-400">{activity.area}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{activity.date}</span>
                </div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
              Ver Todas as Atividades
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Insights Banner */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-emerald-600">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Insights da Safra</h3>
                <p className="text-emerald-100">
                  Baseado nos dados atuais, a produtividade está 15% acima da média histórica
                </p>
              </div>
            </div>
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50">
              Ver Análise Completa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
