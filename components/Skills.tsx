'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 95 },
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'Redux', level: 90 },
        { name: 'HTML5/CSS3', level: 95 },
      ],
    },
    {
      title: 'UI & Testing',
      skills: [
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Material UI', level: 85 },
        { name: 'Mantine', level: 85 },
        { name: 'Jest', level: 85 },
        { name: 'React Testing Library', level: 85 },
        { name: 'Playwright', level: 80 },
      ],
    },
    {
      title: 'Backend & DevOps',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express/Koa.js', level: 80 },
        { name: 'GraphQL', level: 80 },
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 80 },
        { name: 'AWS', level: 75 },
      ],
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'Redis', level: 75 },
      ],
    },
  ]

  const certifications = [
    'AWS Cloud Practitioner',
    'AI Career Essentials (ALX Africa)',
    'Data Science with Python (Udacity)',
    'Web Designing (NIIT)',
    'ERP with SAP S/4HANA',
  ]

  return (
    <section id="skills" ref={ref} className="relative py-32 bg-background/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold tracking-tight">
            Skills & <span className="text-accent">Expertise</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Comprehensive technical toolkit built through years of product development and continuous learning
          </p>
        </motion.div>

        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group rounded-2xl border border-border bg-background/50 p-8 backdrop-blur-sm transition-all hover:border-accent/50"
            >
              <h3 className="mb-6 text-2xl font-semibold">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="rounded-2xl border border-border bg-background/50 p-8 backdrop-blur-sm"
        >
          <h3 className="mb-6 text-2xl font-semibold text-center">Certifications</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm transition-all hover:border-accent hover:text-accent"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'PostgreSQL'].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
