"use client";
import { Phone, Shield, Smartphone } from 'lucide-react'

const features = [
  {
    name: 'Instant Connection',
    description: 'Connect in seconds, no waiting',
    href: '#',
    icon: Phone,
  },
  {
    name: 'Secure & Private',
    description: 'Your number stays protected',
    href: '#',
    icon: Shield,
  },
  {
    name: 'Mobile-First',
    description: 'Designed for your phone',
    href: '#',
    icon: Smartphone,
  },
]

export default function SimpleThreeColumnWithLargeIcons() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-primary sm:text-5xl">
            Why Choose Our Service
          </h2>
          <p className="mt-6 text-lg/8 text-white/80">
            Connect with anyone, anytime, instantly. Our platform is designed for the fast-paced, mobile-first world.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-white/80">
                  <p className="flex-auto">{feature.description}</p>
                  {/* The following 'Learn More' link is a placeholder and should be removed if not needed to maintain a cleaner aesthetic. */}
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm/6 font-semibold text-primary hover:text-primary/90">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}