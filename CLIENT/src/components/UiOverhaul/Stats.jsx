import React from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
    return (
        <section className="py-24 px-4 bg-dark-800/50 border-y border-white/5">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Left: Text Content */}
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Real-time insights for <br />
                        <span className="text-brand-400">better growth</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Track your learning progress, contributions, and network growth with our advanced analytics dashboard.
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-8">
                        {[
                            { label: 'Active Learners', value: '10K+' },
                            { label: 'Notes Shared', value: '50K+' },
                            { label: 'Questions Solved', value: '100K+' },
                            { label: 'Hired Students', value: '2K+' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Mockup Image/Graphic */}
                <motion.div
                    initial={{ opacity: 0, x: 50, rotate: -2 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-2xl border border-white/10 bg-dark-900 p-6 shadow-2xl overflow-hidden group"
                >
                    {/* Mockup decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative space-y-6">
                        {/* Mock Header */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 text-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 text-green-500" />
                            </div>
                            <div className="h-2 w-20 bg-white/10 rounded-full" />
                        </div>

                        {/* Mock Charts */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 bg-white/5 rounded-xl animate-pulse-slow" />
                            <div className="h-32 bg-white/5 rounded-xl animate-pulse-slow delay-75" />
                        </div>
                        <div className="h-40 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                            {/* Simulated Graph Line */}
                            <svg className="absolute inset-0 w-full h-full text-brand-500 opacity-50" preserveAspectRatio="none">
                                <path d="M0,100 C100,50 200,80 300,20 400,60 500,10" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
