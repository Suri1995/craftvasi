import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero, Services, WhyChoose, Portfolio, CTASection, AboutCraftvasi, OurProcess } from '@/components/Home'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutCraftvasi />
      <Services />
      <OurProcess />
      <Portfolio />
      <WhyChoose />
      <CTASection />
      <Footer />
    </main>
  )
}
