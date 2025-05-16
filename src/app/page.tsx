import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="bg-green-500 text-white text-center py-2">Tailwind CSS is working!</div>
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Creative Marketing Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Transforming ideas into impactful marketing campaigns that drive results
            </p>
            <Link href="#projects" className="btn btn-primary">
              View My Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <Link
                    href={project.link}
                    className="text-primary hover:underline"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to take your marketing to the next level? Get in touch!
            </p>
            <Link href="#contact" className="btn btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: 'Digital Marketing',
    description:
      'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
  },
  {
    title: 'Content Creation',
    description:
      'Engaging content that tells your story and connects with your target audience.',
  },
  {
    title: 'Brand Strategy',
    description:
      'Strategic brand development to help you stand out in a crowded marketplace.',
  },
]

const projects = [
  {
    title: 'E-commerce Brand Launch',
    description:
      'Successfully launched a new e-commerce brand with a comprehensive marketing strategy.',
    image: '/images/project1.jpg',
    link: '/projects/ecommerce-launch',
  },
  {
    title: 'Social Media Campaign',
    description:
      'Viral social media campaign that increased engagement by 300% in just one month.',
    image: '/images/project2.jpg',
    link: '/projects/social-campaign',
  },
] 