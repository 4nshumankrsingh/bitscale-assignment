import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bitscale Assignment',
  description:
    'Bitscale is a signal-first GTM automation platform that makes SDRs and growth teams 10x more effective.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}