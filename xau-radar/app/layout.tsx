export const metadata = {
  title: 'XAU Precision Radar',
  description: 'Dashboard Trading Gold',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
