import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main>
      <Header />

      <section className="min-h-screen bg-gradient-to-b from-secondary to-background flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <div className="text-9xl font-heading font-bold text-accent mb-4">
              404
            </div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist. Let's get you back
              on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
