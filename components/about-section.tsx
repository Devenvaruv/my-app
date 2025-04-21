"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    bio: "Alex specializes in geospatial data visualization and has been working with mapping technologies for over 5 years.",
    image: "/placeholder.svg?height=400&width=400&text=Alex",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
      email: "alex@example.com",
    },
  },
  {
    name: "Jordan Lee",
    role: "UX Designer",
    bio: "Jordan focuses on creating intuitive user experiences for complex data visualization tools and interactive maps.",
    image: "/placeholder.svg?height=400&width=400&text=Jordan",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
      email: "jordan@example.com",
    },
  },
  {
    name: "Jordan Lee",
    role: "UX Designer",
    bio: "Jordan focuses on creating intuitive user experiences for complex data visualization tools and interactive maps.",
    image: "/placeholder.svg?height=400&width=400&text=Jordan",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
      email: "jordan@example.com",
    },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export function AboutSection() {
  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.div className="mb-12 text-center" variants={itemVariants}>
        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the talented individuals behind the Oakland Data Explorer project. Our diverse team brings together
          expertise in development, data science, and design.
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
        {teamMembers.map((member, index) => (
          <motion.div key={member.name} variants={itemVariants}>
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                <p className="text-sm mb-6 flex-grow">{member.bio}</p>
                <div className="flex space-x-2">
                  {member.social.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                  {member.social.twitter && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </a>
                    </Button>
                  )}
                  {member.social.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </a>
                    </Button>
                  )}
                  {member.social.email && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${member.social.email}`}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  )
}
