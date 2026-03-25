'use client'

import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  SojaIcon,
  MilhoIcon,
  CafeIcon,
  FeijaoIcon,
  AlgodaoIcon,
  CanaIcon,
  GenericCropIcon
} from './crop-icons'

// Ícone de Açúcar personalizado
function AcucarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="20" fill="url(#acucar-gradient)" />
      <rect x="14" y="16" width="20" height="16" rx="3" fill="white" opacity="0.9" />
      <rect x="16" y="18" width="16" height="12" rx="2" fill="#fef3c7" />
      <circle cx="20" cy="22" r="2" fill="white" opacity="0.7" />
      <circle cx="26" cy="24" r="2" fill="white" opacity="0.7" />
      <circle cx="22" cy="26" r="1.5" fill="white" opacity="0.7" />
      <circle cx="28" cy="20" r="1.5" fill="white" opacity="0.7" />
      <path
        d="M18 14C18 14 20 10 24 10C28 10 30 14 30 14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="acucar-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const marketData = [
  {
    id: 1,
    product: 'Soja',
    unit: 'saca 60kg',
    currentPrice: 185.50,
    previousPrice: 182.00,
    variation: 1.92,
    trend: 'up',
    market: 'CBOT',
    Icon: SojaIcon
  },
  {
    id: 2,
    product: 'Milho',
    unit: 'saca 60kg',
    currentPrice: 89.20,
    previousPrice: 91.50,
    variation: -2.52,
    trend: 'down',
    market: 'BM&F',
    Icon: MilhoIcon
  },
  {
    id: 3,
    product: 'Café Arábica',
    unit: 'saca 60kg',
    currentPrice: 1250.00,
    previousPrice: 1200.00,
    variation: 4.17,
    trend: 'up',
    market: 'ICE',
    Icon: CafeIcon
  },
  {
    id: 4,
    product: 'Algodão',
    unit: '@ 15kg',
    currentPrice: 142.30,
    previousPrice: 140.80,
    variation: 1.06,
    trend: 'up',
    market: 'ICE',
    Icon: AlgodaoIcon
  },
  {
    id: 5,
    product: 'Feijão Carioca',
    unit: 'saca 60kg',
    currentPrice: 320.00,
    previousPrice: 320.00,
    variation: 0,
    trend: 'stable',
    market: 'CEPEA',
    Icon: FeijaoIcon
  },
  {
    id: 6,
    product: 'Açúcar Cristal',
    unit: 'saca 50kg',
    currentPrice: 165.80,
    previousPrice: 163.50,
    variation: 1.41,
    trend: 'up',
    market: 'ICE',
    Icon: AcucarIcon
  }
]

const topProducts = [
  { name: 'Soja', change: 12.5, trend: 'up' },
  { name: 'Café', change: 8.3, trend: 'up' },
  { name: 'Milho', change: -5.2, trend: 'down' },
]

export function MarketPrices() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-emerald-600 to-teal-600">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Cotações do Mercado</h2>
              <p className="text-emerald-100">Acompanhe os preços em tempo real das principais commodities</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-emerald-100">Última atualização</p>
                <p className="text-white font-medium">12 de Jan, 10:45</p>
              </div>
              <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30">
                <RefreshCw className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Em Alta</p>
                <p className="text-2xl font-bold text-gray-800">4 produtos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Em Queda</p>
                <p className="text-2xl font-bold text-gray-800">1 produto</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Minus className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Estáveis</p>
                <p className="text-2xl font-bold text-gray-800">1 produto</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prices Table */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-800">Preços Atuais</span>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="grains">Grãos</TabsTrigger>
                  <TabsTrigger value="others">Outros</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Produto</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Unidade</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Preço</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Variação</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Mercado</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((item) => {
                    const ItemIcon = item.Icon
                    return (
                      <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="p-1 rounded-lg bg-gray-50">
                              <ItemIcon className="w-8 h-8" />
                            </div>
                            <span className="font-medium text-gray-800">{item.product}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">{item.unit}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-lg font-bold text-gray-800">
                            R$ {item.currentPrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className={`inline-flex items-center gap-1 font-medium ${
                            item.trend === 'up' ? 'text-emerald-600' : 
                            item.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {item.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                            {item.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                            {item.trend === 'stable' && <Minus className="w-4 h-4" />}
                            {item.variation > 0 ? '+' : ''}{item.variation.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.market}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Movers */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800">
              Maiores Variações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-lg font-bold text-gray-600">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">Últimos 7 dias</p>
                </div>
                <div className={`flex items-center gap-1 font-bold ${
                  product.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {product.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {product.change > 0 ? '+' : ''}{product.change}%
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-gray-100">
              <div className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Próximo Relatório</p>
                    <p className="text-sm text-amber-600">USDA - 15 de Janeiro</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
