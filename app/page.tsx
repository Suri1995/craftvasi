import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero, Services, WhyChoose, Portfolio, CTASection } from '@/components/Home'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <WhyChoose />
      <CTASection />
      <Footer />
    </main>
  )
}
