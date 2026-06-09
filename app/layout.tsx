import "./globals.css"
import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "JLPT PASS N3・N2 | Japanese Study App",
  description: "JLPT N3・N2 learning app with games, AI conversation, and AI speaking practice.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, title: "JLPT PASS N3・N2", statusBarStyle: "default" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>
}
