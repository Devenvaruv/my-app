"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"

// Fallback chart component that renders static visualizations
export function FallbackBarChart() {
  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <div className="w-full h-full flex items-end justify-around px-4">
        {[425, 429, 433, 435, 440, 445].map((value, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="bg-blue-500 w-12 rounded-t-md transition-all duration-500"
              style={{ height: `${(value / 450) * 200}px` }}
            ></div>
            <span className="text-xs mt-2">{2018 + i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FallbackPieChart() {
  const data = [
    { name: "White", value: 35, color: "#3b82f6" },
    { name: "Black", value: 24, color: "#06b6d4" },
    { name: "Hispanic", value: 27, color: "#4f46e5" },
    { name: "Asian", value: 16, color: "#8b5cf6" },
    { name: "Other", value: 8, color: "#a855f7" },
  ]

  return (
    <div className="h-[300px] w-full flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 mb-4">
        {data.map((segment, i) => {
          const startAngle = data.slice(0, i).reduce((sum, d) => sum + d.value, 0) * 3.6
          const endAngle = startAngle + segment.value * 3.6
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                background: `conic-gradient(transparent ${startAngle}deg, ${segment.color} ${startAngle}deg, ${segment.color} ${endAngle}deg, transparent ${endAngle}deg)`,
                borderRadius: "50%",
              }}
            ></div>
          )
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data.map((segment, i) => (
          <div key={i} className="flex items-center">
            <div className="w-3 h-3 mr-1" style={{ backgroundColor: segment.color }}></div>
            <span className="text-xs">
              {segment.name}: {segment.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FallbackLineChart() {
  return (
    <div className="h-[300px] w-full flex items-center justify-center">
      <div className="w-full h-full relative px-4 pt-10 pb-10">
        {/* Rent line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points="0,80 8.3,78 16.6,76 25,74 33.3,72 41.6,70 50,68 58.3,66 66.6,64 75,62 83.3,60 91.6,58 100,56"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
        </svg>

        {/* Home prices line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points="0,50 8.3,49.5 16.6,49 25,48.5 33.3,48 41.6,47.5 50,47 58.3,46.5 66.6,46 75,45.5 83.3,45 91.6,44.5 100,44"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
          {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((month, i) => (
            <span key={i} className="text-xs">
              {month}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute top-0 right-4 flex gap-4">
          <div className="flex items-center">
            <div className="w-3 h-1 bg-blue-500 mr-1"></div>
            <span className="text-xs">Rent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-1 bg-green-500 mr-1"></div>
            <span className="text-xs">Home Prices</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FallbackChartsSection() {
  return (
    <motion.div
      className="w-full mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <h2 className="text-3xl font-bold mb-2">Oakland Data Insights</h2>
          <p className="text-muted-foreground">Interactive charts and visualizations of Oakland's key metrics</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Population Growth</CardTitle>
                <CardDescription>Annual population changes in Oakland</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <FallbackBarChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Racial and ethnic composition</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              <FallbackPieChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="px-4 max-w-6xl mx-auto"
      >
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Housing Market Trends</CardTitle>
              <CardDescription>Average rent and home sale prices</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <DownloadIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <FallbackLineChart />
          </CardContent>
        </Card>
      </motion.div>

      <div className="w-full bg-gradient-to-b from-background/0 via-background/5 to-background/10 h-24 mt-12" />
    </motion.div>
  )
}
