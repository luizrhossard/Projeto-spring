'use client'

import { motion } from 'framer-motion'
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Card3D } from './animations'

const currentWeather = {
  temp: 28,
  condition: 'Parcialmente Nublado',
  humidity: 65,
  wind: 12,
  uv: 6,
  icon: 'partial-cloud'
}

const forecast = [
  { day: 'Hoje', icon: 'sun', temp: 28, rain: 10 },
  { day: 'Amanhã', icon: 'cloud', temp: 26, rain: 20 },
  { day: 'Qua', icon: 'rain', temp: 24, rain: 80 },
  { day: 'Qui', icon: 'rain', temp: 22, rain: 60 },
  { day: 'Sex', icon: 'cloud', temp: 25, rain: 30 },
]

function WeatherIcon({ type, className }: { type: string; className?: string }) {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 }
  }
  
  switch (type) {
    case 'sun':
      return (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          variants={iconVariants}
          initial="initial"
          animate="animate"
        >
          <motion.circle 
            cx="12" cy="12" r="4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.line
              key={angle}
              x1="12" y1="2" x2="12" y2="1"
              transform={`rotate(${angle} 12 12)`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.svg>
      )
    case 'cloud':
      return (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </motion.svg>
      )
    case 'rain':
      return (
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
          <motion.path 
            d="M16 14v6" 
            animate={{ y: [0, 2, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.path 
            d="M8 14v6" 
            animate={{ y: [0, 2, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
          <motion.path 
            d="M12 16v6" 
            animate={{ y: [0, 2, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          />
        </motion.svg>
      )
    case 'partial-cloud':
      return (
        <motion.div
          className="relative"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sun className={className} />
          <motion.div
            className="absolute -bottom-1 -right-1"
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Cloud className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>
      )
    default:
      return <Sun className={className} />
  }
}

export function WeatherWidget() {
  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Calendar className="w-5 h-5 text-emerald-600" />
          </motion.div>
          Clima
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <motion.div 
          className="flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated sun rays */}
          <motion.div 
            className="absolute -right-8 -top-8 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <div className="relative z-10">
            <motion.p 
              className="text-4xl font-bold text-gray-800"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {currentWeather.temp}°C
            </motion.p>
            <p className="text-sm text-gray-600">{currentWeather.condition}</p>
            <p className="text-xs text-gray-400 mt-1">São Paulo, SP</p>
          </div>
          <motion.div
            className="text-amber-500 relative z-10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <WeatherIcon type={currentWeather.icon} className="w-16 h-16" />
          </motion.div>
        </motion.div>

        {/* Weather Details */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Droplets, value: `${currentWeather.humidity}%`, label: 'Umidade', color: 'sky' },
            { icon: Wind, value: `${currentWeather.wind}km/h`, label: 'Vento', color: 'gray' },
            { icon: Thermometer, value: currentWeather.uv, label: 'UV', color: 'orange' }
          ].map((item, index) => {
            const Icon = item.icon
            const colors: Record<string, string> = {
              sky: 'bg-sky-50 text-sky-500',
              gray: 'bg-gray-50 text-gray-500',
              orange: 'bg-orange-50 text-orange-500'
            }
            return (
              <motion.div
                key={item.label}
                className="flex flex-col items-center p-3 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <motion.div
                  className={`p-2 rounded-lg ${colors[item.color]} mb-1`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="text-lg font-bold text-gray-800">{item.value}</span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Forecast */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-3">Previsão</p>
          <div className="flex justify-between">
            {forecast.map((day, index) => (
              <motion.div
                key={day.day}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -3 }}
              >
                <span className="text-xs font-medium text-gray-500">{day.day}</span>
                <WeatherIcon 
                  type={day.icon} 
                  className="w-5 h-5 text-gray-600" 
                />
                <span className="text-sm font-bold text-gray-800">{day.temp}°</span>
                <motion.span 
                  className="text-xs text-sky-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                >
                  {day.rain}%
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
