import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Briefcase, GraduationCap, Trophy, Globe } from 'lucide-react';

const features = [
    {
        icon: <BookOpen className="text-blue-400" size={32} />,
        title: "Shared Notes",
        desc: "Access thousands of notes shared by top students from your university.",
        colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
        icon: <Users className="text-purple-400" size={32} />,
        title: "Q&A Forum",
        desc: "Get answers to your doubts from peers and alumni instantly.",
        colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
        icon: <Briefcase className="text-pink-400" size={32} />,
        title: "Job Portal",
        desc: "Exclusive job and internship opportunities for students.",
        colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
        icon: <GraduationCap className="text-green-400" size={32} />,
        title: "Alumni Connect",
        desc: "Network with successful alumni and get career guidance.",
        colSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    },
    {
        icon: <Trophy className="text-yellow-400" size={32} />,
        title: "Hackathons",
        desc: "Participate in coding battles and win exciting prizes.",
        colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
];

export default function Features() {
    return (
        <section className="py-24 px-4 relative">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white"
                >
                    Everything you need to <span className="text-brand-400">excel</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 max-w-2xl mx-auto"
                >
                    A powerful suite of tools designed to supercharge your academic journey and career.
                </motion.p>
            </div>

            {/* Bento Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
                {features.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`relative group overflow-hidden p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-brand-500/30 hover:shadow-glow-md transition-all duration-300 ${item.colSpan}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-brand-300 transition-colors">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
