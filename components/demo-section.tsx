"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Play, FastForward } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DemoSectionProps {
  onVideoEnd: () => void
}

export function DemoSection({ onVideoEnd }: DemoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      const handleEnded = () => {
        onVideoEnd()
      }
      videoElement.addEventListener("ended", handleEnded)
      return () => {
        videoElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [onVideoEnd])

  const handleSkip = () => {
    onVideoEnd()
  }

  return (
    <motion.div
      className="w-full mx-auto flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
     

      <motion.div
        className="relative w-full overflow-hidden shadow-2xl mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="aspect-video bg-black relative">
          {/* Using the provided video file */}
          <video ref={videoRef} className="w-full h-full object-cover" controls autoPlay muted loop>
            <source src="/videos/Deven_Varu_Demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute bottom-4 right-4 z-10">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
              onClick={handleSkip}
            >
              <FastForward className="h-4 w-4 mr-2" />
              Skip to Map
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-muted-foreground">
          <p className="text-sm mb-2">Scroll Down</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  )
}
