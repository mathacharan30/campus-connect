import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-20">

            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
                {/* Platform Name */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        Campus<span className="text-brand-400">Connect</span>
                    </h1>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-400 text-sm font-medium mb-4"
                >
                    <Sparkles size={14} />
                    <span>The Future of Student Collaboration</span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6"
                >
                    Connect, collaborations, <br />
                    <span className="text-brand-400">
                        & Grow Together
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
                >
                    Your all-in-one platform for sharing notes, finding jobs, preparing for exams, and connecting with alumni.
                </motion.p>

                {/* Trust Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-4"
                >
                    <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-widest">
                        Trusted by students from top universities
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
