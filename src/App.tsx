import { Header } from './components/layout/Header'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Footer } from './components/layout/Footer'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import { Hero, RoadStrip, Mission, WhyUs, HowItWorks, Pricing, Materials, Reviews, Branches, FAQ, CTA } from './components/sections'
import { useSeo } from './seo/useSeo'

export default function App() {
  useSeo()

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <RoadStrip />
        <Pricing />
        <WhyUs />
        <HowItWorks />
        <Mission />
        <Materials />
        <Reviews />
        <Branches />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
