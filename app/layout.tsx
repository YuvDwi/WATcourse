import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WATcourse? - Data Driven Course Recommendations',
  description: 'Upload your transcript and get data-driven course recommendations',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-funnel antialiased">{children}</body>
    </html>
  )
}
