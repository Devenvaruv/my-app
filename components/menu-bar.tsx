"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { Play, Map, BarChart3, Users } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  screen: string
  gradient: string
  iconColor: string
}

interface MenuBarProps {
  onNavigate?: (screen: string) => void
}

const menuItems: MenuItem[] = [
  {
    icon: <Play className="h-5 w-5" />,
    label: "Demo",
    href: "#demo",
    screen: "demo",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Map className="h-5 w-5" />,
    label: "Map",
    href: "#map",
    screen: "map",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: "Charts",
    href: "#charts",
    screen: "charts",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "About Us",
    href: "#about",
    screen: "about",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar({ onNavigate }: MenuBarProps) {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState<string>("demo")

  const isDarkTheme = theme === "dark"

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, screen: string) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(screen)
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      const mapSection = document.getElementById("map")
      const chartsSection = document.getElementById("charts")
      const aboutSection = document.getElementById("about")

      if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection("about")
      } else if (chartsSection && scrollPosition >= chartsSection.offsetTop) {
        setActiveSection("charts")
      } else if (mapSection && scrollPosition >= mapSection.offsetTop) {
        setActiveSection("map")
      } else {
        setActiveSection("demo")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <motion.nav
      className="p-2 rounded-2xl bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
            : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />
      <ul className="flex items-center gap-2 relative z-10">
        {menuItems.map((item) => (
          <motion.li key={item.label} className="relative">
            <motion.div
              className="block rounded-xl overflow-visible group relative"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                variants={glowVariants}
                style={{
                  background: item.gradient,
                  opacity: 0,
                  borderRadius: "16px",
                }}
              />
              <motion.a
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl ${
                  activeSection === item.screen
                    ? "text-foreground font-medium"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                variants={itemVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                onClick={(e) => handleNavigation(e, item.screen)}
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === item.screen ? item.iconColor : "text-foreground group-hover:" + item.iconColor
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </motion.a>
              <motion.a
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl ${
                  activeSection === item.screen
                    ? "text-foreground font-medium"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                variants={backVariants}
                transition={sharedTransition}
                style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                onClick={(e) => handleNavigation(e, item.screen)}
              >
                <span
                  className={`transition-colors duration-300 ${
                    activeSection === item.screen ? item.iconColor : "text-foreground group-hover:" + item.iconColor
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </motion.a>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}
