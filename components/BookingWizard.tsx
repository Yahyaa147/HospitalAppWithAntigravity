'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = ['Department', 'Doctor', 'Date', 'Confirm']

export default function BookingWizard() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        department: '',
        doctor: '',
        date: '',
        time: ''
    })

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    return (
        <div className="w-full max-w-4xl glass rounded-3xl p-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            {/* Progress Bar */}
            <div className="flex justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-0" />
                <motion.div
                    className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 -z-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                {steps.map((step, i) => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                        <motion.div
                            animate={{
                                backgroundColor: i <= currentStep ? "#a855f7" : "#27272a",
                                scale: i === currentStep ? 1.2 : 1
                            }}
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg border-2 transition-colors duration-300",
                                i <= currentStep ? "border-purple-400 text-white" : "border-zinc-700 text-zinc-500 bg-zinc-900"
                            )}
                        >
                            {i < currentStep ? <Check size={18} /> : i + 1}
                        </motion.div>
                        <span className={cn(
                            "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                            i <= currentStep ? "text-white" : "text-zinc-600"
                        )}>{step}</span>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Cardiology', 'Neurology', 'Orthopedics', 'General'].map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => { setFormData({ ...formData, department: dept }); nextStep() }}
                                        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] transition-all text-left group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <h3 className="text-2xl font-bold group-hover:text-purple-300 transition-colors relative z-10">{dept}</h3>
                                        <p className="text-zinc-400 text-sm mt-2 relative z-10">World-class care</p>
                                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-purple-400" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="text-center py-10">
                                <h2 className="text-3xl font-bold mb-4">Select a <span className="text-gradient">Doctor</span></h2>
                                <p className="text-zinc-400 mb-8">Choose from our top specialists.</p>
                                {/* Placeholder for API data */}
                                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                                    <button onClick={() => { setFormData({ ...formData, doctor: 'Dr. House' }); nextStep() }} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">DR</div>
                                        <div className="text-left">
                                            <div className="font-bold">Dr. House</div>
                                            <div className="text-xs text-zinc-400">Diagnostic Medicine</div>
                                        </div>
                                    </button>
                                </div>
                                <button onClick={nextStep} className="mt-8 text-sm text-zinc-500 hover:text-white transition-colors">Skip for now</button>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="text-center py-10">
                                <h2 className="text-3xl font-bold mb-8">Select Date & Time</h2>
                                <div className="inline-flex flex-col gap-4">
                                    <button onClick={() => { setFormData({ ...formData, date: 'Tomorrow 10:00 AM' }); nextStep() }} className="px-8 py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
                                        Tomorrow 10:00 AM
                                    </button>
                                    <button onClick={nextStep} className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                        Pick another time
                                    </button>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="text-center space-y-6 py-4">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400 mb-6"
                                >
                                    <Check size={40} />
                                </motion.div>
                                <h2 className="text-4xl font-bold text-white">Ready to Book?</h2>
                                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl max-w-md mx-auto text-left space-y-4 backdrop-blur-md">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-zinc-400">Department</span>
                                        <span className="font-bold text-lg">{formData.department}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                        <span className="text-zinc-400">Doctor</span>
                                        <span className="font-bold text-lg">{formData.doctor || 'Any'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-zinc-400">Time</span>
                                        <span className="font-bold text-lg">{formData.date || 'Tomorrow 10:00 AM'}</span>
                                    </div>
                                </div>
                                <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:scale-105 transition-all">
                                    Confirm Booking
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-8 border-t border-white/10">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-zinc-400 hover:text-white"
                >
                    <ChevronLeft size={20} /> Back
                </button>
                {currentStep < steps.length - 1 && (
                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-xl hover:bg-gray-200 transition-colors font-bold shadow-lg shadow-white/10"
                    >
                        Next <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}
