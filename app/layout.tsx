import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bruno Mbachu | Frontend Engineer',
  description: 'Frontend Engineer with 5+ years of experience building scalable React and TypeScript applications. Specialized in product development, accessibility, and performance optimization.',
  keywords: 'Frontend Engineer, React Developer, TypeScript, Web Development, Bruno Mbachu',
  authors: [{ name: 'Bruno Chidozie Mbachu' }],
  openGraph: {
    title: 'Bruno Mbachu | Frontend Engineer',
    description: 'Frontend Engineer specializing in React, TypeScript, and scalable web applications',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  )
}
