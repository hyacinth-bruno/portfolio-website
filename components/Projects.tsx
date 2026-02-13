'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const experiences = [
    {
      company: 'Redcare Pharmacy',
      role: 'Product Development - Frontend Engineer',
      period: 'June 2024 - Present',
      location: 'Cologne, Germany',
      description:
        'Leading development of React/TypeScript product interfaces integrating Jira data to support planning and tracking across 500+ deliverables.',
      achievements: [
        'Built data-dense dashboards with advanced filtering, grouping, and real-time status visualization',
        'Reduced WCAG violations by 70% across 6-market e-commerce platform through automated Playwright testing',
        'Designed intuitive UI components optimized for performance and usability',
        'Collaborated with product managers and designers to deliver scalable frontend solutions',
      ],
      tags: ['React', 'TypeScript', 'Playwright', 'Node.js', 'Koa.js', 'Redis', 'CI/CD'],
    },
    {
      company: 'Hope Rising Foundation Inc',
      role: 'Frontend Developer (Volunteer)',
      period: 'March 2016 - May 2024',
      location: 'Miami, USA - Remote',
      description:
        'Led end-to-end development of the foundation website, delivering a scalable, responsive platform communicating the organization\'s mission and impact.',
      achievements: [
        'Converted complex social-impact initiatives into intuitive web content',
        'Improved outreach, donor trust, and community engagement through professional UX',
        'Applied accessibility and performance best practices across all devices',
        'Collaborated with non-technical stakeholders to refine messaging and improve platform',
      ],
      tags: ['React', 'Next.js', 'UI/UX', 'Accessibility', 'Responsive Design'],
    },
    {
      company: 'Integrify',
      role: 'Fullstack Development Trainee',
      period: 'Nov 2022 - April 2023',
      location: 'Helsinki, Finland - Remote',
      description:
        'Built full-stack applications in team-based agile environment using modern web technologies.',
      achievements: [
        'Developed applications using Node.js, TypeScript, MySQL, and Express.js',
        'Implemented RESTful APIs and GraphQL endpoints with React.js/Redux frontends',
        'Utilized Docker containers and GitHub Actions for CI/CD automation',
        'Contributed to 5+ collaborative projects with effective code review practices',
      ],
      tags: ['Node.js', 'TypeScript', 'React', 'Redux', 'GraphQL', 'MySQL', 'Docker'],
    },
  ]

  return (
    <section id="projects" ref={ref} className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold tracking-tight">
            Work <span className="text-accent">Experience</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Professional journey building scalable applications and delivering impactful solutions
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm transition-all hover:border-accent/50"
            >
              <div className="p-8">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {exp.role}
                    </h3>
                    <div className="mt-2 flex flex-col gap-1 text-muted">
                      <p className="font-medium text-foreground">{exp.company}</p>
                      <p className="text-sm">{exp.location}</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>

                <p className="mb-6 text-muted leading-relaxed">{exp.description}</p>

                <div className="mb-6 space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <p className="text-sm text-muted leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/hyacinth-bruno"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-8 py-4 font-medium backdrop-blur-sm transition-all hover:border-accent hover:text-accent"
          >
            View More on GitHub
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
