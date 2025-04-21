"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Layers, MapIcon, Filter, Maximize, Minimize, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"

export function MapSection() {
  const [mapView, setMapView] = useState("standard")
  const [showTraffic, setShowTraffic] = useState(false)
  const [showPoints, setShowPoints] = useState(true)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [elevation, setElevation] = useState([50])
  const [isFullscreen, setIsFullscreen] = useState(false)

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
          <h2 className="text-3xl font-bold mb-2">Oakland Interactive Map</h2>
          <p className="text-muted-foreground">Explore Oakland's geography, demographics, and infrastructure</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            Oakland, CA
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Live Data
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 max-w-6xl mx-auto">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`overflow-hidden ${isFullscreen ? "fixed inset-4 z-50" : ""}`}>
            <CardContent className="p-0 relative">
              <div className="aspect-[16/9] lg:aspect-[21/9] bg-muted relative">
                {/* Static map image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image src="/images/1-1-2024.jpg" alt="Oakland Map" fill className="object-cover" priority />

                  {/* Overlay elements that change based on toggles */}
                  {showPoints && (
                    <div className="absolute inset-0 z-10">
                      <div
                        className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"
                        style={{ top: "30%", left: "40%" }}
                      ></div>
                      <div
                        className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"
                        style={{ top: "45%", left: "55%" }}
                      ></div>
                      <div
                        className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"
                        style={{ top: "60%", left: "35%" }}
                      ></div>
                      <div
                        className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"
                        style={{ top: "25%", left: "60%" }}
                      ></div>
                      <div
                        className="absolute h-3 w-3 rounded-full bg-orange-500 animate-pulse"
                        style={{ top: "50%", left: "70%" }}
                      ></div>
                    </div>
                  )}

                  {showTraffic && (
                    <div className="absolute inset-0 z-10">
                      <div
                        className="absolute h-1 bg-green-500/70"
                        style={{ top: "40%", left: "20%", width: "30%", transform: "rotate(30deg)" }}
                      ></div>
                      <div
                        className="absolute h-1 bg-yellow-500/70"
                        style={{ top: "50%", left: "30%", width: "20%", transform: "rotate(-15deg)" }}
                      ></div>
                      <div
                        className="absolute h-1 bg-red-500/70"
                        style={{ top: "60%", left: "50%", width: "25%", transform: "rotate(5deg)" }}
                      ></div>
                    </div>
                  )}

                  {showHeatmap && (
                    <div className="absolute inset-0 z-10">
                      <div
                        className="absolute bg-gradient-radial from-red-500/40 via-orange-500/20 to-transparent"
                        style={{
                          top: "40%",
                          left: "50%",
                          width: "60%",
                          height: "60%",
                          transform: "translate(-50%, -50%)",
                        }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        >
                          <Layers className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Layers</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Map Information</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                Map Controls
              </CardTitle>
              <CardDescription>Customize your map view</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Map Type</h3>
                <Tabs defaultValue="standard" value={mapView} onValueChange={setMapView} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="standard">Standard</TabsTrigger>
                    <TabsTrigger value="satellite">Satellite</TabsTrigger>
                    <TabsTrigger value="terrain">Terrain</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Layers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="traffic" className="text-sm">
                      Traffic
                    </label>
                    <Switch id="traffic" checked={showTraffic} onCheckedChange={setShowTraffic} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="points" className="text-sm">
                      Points of Interest
                    </label>
                    <Switch id="points" checked={showPoints} onCheckedChange={setShowPoints} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="heatmap" className="text-sm">
                      Population Density
                    </label>
                    <Switch id="heatmap" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">3D Elevation</h3>
                  <span className="text-xs text-muted-foreground">{elevation[0]}%</span>
                </div>
                <Slider value={elevation} min={0} max={100} step={1} onValueChange={setElevation} />
              </div>

              <Button className="w-full">
                <MapIcon className="h-4 w-4 mr-2" />
                Reset View
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="w-full bg-gradient-to-b from-background/0 via-background/5 to-background/10 h-24 mt-12" />
    </motion.div>
  )
}
