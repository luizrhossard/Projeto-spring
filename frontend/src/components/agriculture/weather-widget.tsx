'use client'

import { motion } from 'framer-motion'
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Calendar,
  Loader2,
  MapPin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAgriculturalWeather } from '@/hooks/useAgriculturalWeather'

function WeatherIcon({ type, className }: { type: string; className?: string }) {
  const conditionLower = type.toLowerCase()
  if (conditionLower.includes('chuva') || conditionLower.includes('garoa')) {
    return <CloudRain className={className} />
  }
  if (conditionLower.includes('nublado') || conditionLower.includes('nuvem')) {
    return <Cloud className={className} />
  }
  return <Sun className={className} />
}

export function WeatherWidget() {
  const { weather, insights, isLoading, error } = useAgriculturalWeather()

  const forecast = [
    { day: 'Hoje', icon: weather?.condition || 'sun', temp: Math.round(weather?.temperature ?? 28), rain: Math.min(Math.round((weather?.precipitation ?? 0) * 10), 100) },
    { day: 'Amanha', icon: 'cloud', temp: Math.round((weather?.temperature ?? 28) - 2), rain: 20 },
    { day: 'Qua', icon: 'rain', temp: Math.round((weather?.temperature ?? 28) - 4), rain: 60 },
    { day: 'Qui', icon: 'cloud', temp: Math.round((weather?.temperature ?? 28) - 1), rain: 30 },
    { day: 'Sex', icon: 'sun', temp: Math.round((weather?.temperature ?? 28) + 1), rain: 10 },
  ]

  if (isLoading) {
    return (
      <Card className="border border-[#dce8df] shadow-sm overflow-hidden bg-white">
        <CardHeader className="pb-3 border-b border-[#edf3ef] bg-[#f9fcfa]">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Clima
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="border border-[#dce8df] shadow-sm overflow-hidden bg-white">
        <CardHeader className="pb-3 border-b border-[#edf3ef] bg-[#f9fcfa]">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Clima
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <Cloud className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Nao foi possivel carregar os dados do clima</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-[#dce8df] shadow-sm overflow-hidden bg-white">
      <CardHeader className="pb-3 border-b border-[#edf3ef] bg-[#f9fcfa]">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Calendar className="w-5 h-5 text-emerald-600" />
          </motion.div>
          Clima
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3.5">
        <div className="flex items-center justify-between p-4 bg-[#f5f9f6] border border-[#e2ece5] rounded-lg">
          <div>
            <p className="text-3xl font-semibold text-slate-800">{Math.round(weather.temperature)}°C</p>
            <p className="text-sm text-slate-600">{weather.condition}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <MapPin className="w-3 h-3" />
              <span>Sao Paulo, SP</span>
            </div>
          </div>
          <div className="text-amber-500">
            <WeatherIcon type={weather.condition} className="w-16 h-16" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: Droplets, value: `${weather.humidity}%`, label: 'Umidade', color: 'bg-sky-50 text-sky-500' },
            { icon: Wind, value: `${weather.windSpeed} km/h`, label: 'Vento', color: 'bg-gray-50 text-gray-500' },
            { icon: Thermometer, value: weather.uvIndex?.toFixed(1) ?? '—', label: 'UV', color: 'bg-orange-50 text-orange-500' }
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex flex-col items-center p-2.5 rounded-lg border border-[#e6efea] bg-[#f8fbf9]">
                <div className={`p-2 rounded-lg ${item.color} mb-1`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-gray-800">{item.value}</span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            )
          })}
        </div>

        {insights.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Alertas para Agricultura</p>
            {insights.slice(0, 2).map((insight, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-xs ${
                  insight.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  insight.type === 'alert' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  insight.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-sky-50 text-sky-700 border border-sky-200'
                }`}
              >
                <p className="font-semibold">{insight.title}</p>
                <p className="mt-0.5">{insight.recommendation}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-600 mb-3">Previsao</p>
          <div className="flex justify-between">
            {forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-slate-500">{day.day}</span>
                <WeatherIcon type={day.icon} className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-bold text-gray-800">{day.temp}°</span>
                <span className="text-xs text-sky-500">{day.rain}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
