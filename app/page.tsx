"use client"

import { useRef } from "react"
import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { DemoSection } from "@/components/demo-section"
import { MapSection } from "@/components/map-section"
import { FallbackChartsSection } from "@/components/fallback-charts"
import { AboutSection } from "@/components/about-section"
import { motion } from "framer-motion"

export default function Page() {
  const mapRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const chartsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (section: string) => {
    switch (section) {
      case "demo":
        demoRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "map":
        mapRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "charts":
        chartsRef.current?.scrollIntoView({ behavior: "smooth" })
        break
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" })
        break
    }
  }

  const handleVideoEnd = () => {
    mapRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <MenuBar onNavigate={scrollToSection} />
      </div>

      <main className="w-full">
        <section id="demo" ref={demoRef} className="min-h-screen flex items-center justify-center">
          <DemoSection onVideoEnd={handleVideoEnd} />
        </section>

        <motion.div
          className="w-full h-24 bg-gradient-to-b from-transparent to-background/10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <section id="map" ref={mapRef} className="min-h-screen py-20">
          <MapSection />
        </section>

        <motion.div
          className="w-full h-24 bg-gradient-to-b from-transparent to-background/10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <section id="charts" ref={chartsRef} className="min-h-screen py-20">
          <FallbackChartsSection />
        </section>

        <motion.div
          className="w-full h-24 bg-gradient-to-b from-transparent to-background/10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <section id="about" ref={aboutRef} className="min-h-screen py-20">
          <AboutSection />
        </section>
      </main>
    </div>
  )
}
