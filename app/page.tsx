'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Stethoscope, Activity } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 aurora-bg z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center px-4 max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass text-sm font-medium text-purple-300 border-purple-500/30">
            ✨ The Future of Healthcare
          </div>
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-8">
            Gravity <span className="text-gradient">Health</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience healthcare without friction. Zero waiting. Zero gravity.
            <br />Just pure, seamless care.
          </p>

          <Link href="/book">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-xl flex items-center gap-3 mx-auto overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-shadow"
            >
              <span className="relative z-10">Book Appointment</span>
              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {[
          { icon: Calendar, title: "Instant Booking", desc: "No waiting on hold. Book in seconds." },
          { icon: Stethoscope, title: "Top Specialists", desc: "Access to world-class doctors." },
          { icon: Activity, title: "Real-time Tracking", desc: "Track your health journey live." },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="p-10 rounded-3xl glass glass-hover group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  )
}
