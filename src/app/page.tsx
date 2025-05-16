import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center bg-gray-100">
        <Image src="/hero.jpg" alt="Hero" fill className="object-cover object-center z-0" />
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 tracking-tight">Marketing Executive | Brand & Campaign Strategist | Creative-Led, Data-Driven</h1>
          <p className="text-white text-center max-w-2xl mb-6">Leading B2B & B2C marketing strategy across agency, consumer, & government sectors. Driving performance through creative clarity, cross-functional leadership, and campaigns that convert.</p>
          <Link href="#about" className="btn btn-primary">ABOUT</Link>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {competencies.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-28 h-28 relative mb-2">
                  <Image src={item.img} alt={item.title} fill className="object-cover rounded-md" />
                </div>
                <span className="font-semibold text-xs md:text-sm uppercase tracking-wide">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gray-50">
        <div className="container flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-4">ABOUT</h2>
            <p className="mb-4">Hi, I'm Brenna—a performance-driven marketing executive with over 10 years of cross-sector leadership experience. I specialize in building marketing systems that scale, messaging that resonates, and creative strategies that deliver measurable results.</p>
            <Link href="#contact" className="btn btn-primary">LEARN MORE</Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image src="/profile.jpg" alt="Brenna Hamilton" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-white">
        <div className="container text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Interested in working together? Let's connect.</h2>
          <Link href="#" className="btn btn-primary">CONTACT</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="container flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <div>BRENNA HAMILTON<br />© 2025 Brenna Hamilton. All rights reserved.</div>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#">HOME</Link>
            <Link href="#">CORE COMPETENCIES</Link>
            <Link href="#">STUDIES</Link>
            <Link href="#">ABOUT</Link>
            <Link href="#">CONTACT</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const competencies = [
  { title: 'Branding & Identity', img: '/competency1.jpg' },
  { title: 'Content & Social Media', img: '/competency2.jpg' },
  { title: 'Email & Digital Campaigns', img: '/competency3.jpg' },
  { title: 'Exhibitions & Events', img: '/competency4.jpg' },
  { title: 'Media & PR', img: '/competency5.jpg' },
  { title: 'Out-of-Home Advertising', img: '/competency6.jpg' },
  { title: 'Print, Radio, & Television', img: '/competency7.jpg' },
  { title: 'Video & Animated Content', img: '/competency8.jpg' },
  { title: 'UX/UI & Web Development', img: '/competency9.jpg' },
]; 