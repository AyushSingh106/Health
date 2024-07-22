import { jost } from '@/utils/fonts';
import React, { useContext, useEffect, useState } from 'react';
import authContext from '@/context/auth/authContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Analytics = () => {
    const { user } = useContext(authContext);
    const [loading, setLoading] = useState(true);
    
    const analyticsData = [
        {
            title: "Non-Demented (No Cognitive Impairment)",
            shortDescription: "Individuals classified as Non-Demented show no signs of cognitive decline and can perform daily activities without any issues. Their memory, reasoning, and judgment are intact.",
            symptoms: [
                "No significant memory loss",
                "Normal reasoning and problem-solving skills",
                "Unimpaired ability to carry out daily activities"
            ],
            suggestions: [
                "Maintain a healthy lifestyle through a balanced diet, regular exercise, and mental stimulation.",
                "Engage in social activities to enhance cognitive function.",
                "Regular check-ups with healthcare providers to monitor overall health and cognitive status."
            ],
            futurePrecautions: [
                "Continue engaging in cognitive activities such as reading, puzzles, and learning new skills.",
                "Monitor for any early signs of cognitive decline and consult a doctor if concerns arise.",
                "Stay informed about Alzheimer's and related conditions for early detection and intervention."
            ]
        },
        {
            title: "Very Mild Demented (Early Stage Alzheimer's)",
            shortDescription: "Very Mild Demented individuals may experience slight cognitive difficulties that are often mistaken for normal aging. These mild symptoms do not significantly impact their daily lives.",
            symptoms: [
                "Mild memory loss, especially of recent events",
                "Slight difficulties with complex tasks and problem-solving",
                "Occasionally losing things or forgetting words"
            ],
            suggestions: [
                "Establish and stick to a daily routine to minimize confusion.",
                "Use memory aids like calendars, notes, and alarms.",
                "Engage in physical and mental activities to slow cognitive decline."
            ],
            futurePrecautions: [
                "Regularly consult with a healthcare provider to monitor progression.",
                "Plan for future care needs, including legal and financial planning.",
                "Stay socially active and involved in community activities."
            ]
        },
        {
            title: "Mild Demented (Middle Stage Alzheimer's)",
            shortDescription: "Mild Demented individuals show noticeable cognitive decline that affects daily functioning. They may require some assistance with everyday activities.",
            symptoms: [
                "Noticeable memory loss, especially regarding recent events and personal history",
                "Difficulty performing familiar tasks and managing personal affairs",
                "Increased confusion and disorientation, especially in unfamiliar environments",
                "Changes in personality and behavior, such as irritability or depression"
            ],
            suggestions: [
                "Provide structured routines and clear instructions to reduce confusion.",
                "Simplify tasks and offer assistance with daily activities as needed.",
                "Encourage physical exercise and cognitive activities tailored to the individual's abilities."
            ],
            futurePrecautions: [
                "Discuss and plan for long-term care needs, considering home care or assisted living options.",
                "Ensure the individual’s safety by making necessary home modifications.",
                "Educate family and caregivers about the disease progression and coping strategies."
            ]
        },
        {
            title: "Moderate Demented (Late Stage Alzheimer's)",
            shortDescription: "Moderate Demented individuals experience significant cognitive decline, with severe memory loss and impaired ability to communicate and perform daily activities. They require substantial assistance and care.",
            symptoms: [
                "Severe memory loss, including forgetting close family members",
                "Inability to perform basic daily activities without assistance",
                "Significant language impairment and difficulty in communication",
                "Behavioral changes, including aggression, anxiety, and wandering"
            ],
            suggestions: [
                "Provide constant supervision and assistance with daily activities, including personal hygiene and feeding.",
                "Create a calm and safe environment to reduce anxiety and prevent wandering.",
                "Use simple and clear communication techniques, and maintain a reassuring presence."
            ],
            futurePrecautions: [
                "Consider full-time professional care, either at home or in a specialized facility.",
                "Ensure all legal and financial matters are settled, including advanced directives and power of attorney.",
                "Continue to educate caregivers on handling the physical and emotional challenges of advanced Alzheimer's."
            ]
        }
    ];

    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push('/sign-in');
        } else {
            const timer = setTimeout(() => setLoading(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [user]);

    const randomIndex = Math.floor(Math.random() * analyticsData.length);
    const filteredData = analyticsData[randomIndex];

    return (
        <>
            <Head>
                <title>Analytics | Swasthya</title>
            </Head>
            {loading ? (
                <div className="flex flex-col justify-center items-center h-screen ">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={200}
                        height={200}
                        className='animate-spin'
                    />
                    <h1 className="text-2xl font-bold mt-4">Processing...</h1>
                </div>
            ) : (
                <div className='bg-gradient-to-r from-green-300 via-blue-500 mt-16 to-purple-600 py-4'>
                <div className="mt-12  min-h-screen">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={`${jost.className} flex flex-col justify-center items-center text-xl mx-20 gap-10 mt-10`}
                    >
                        {user && <h1 className='text-4xl font-extrabold'>{filteredData.title}</h1>}
                        <h2 className='border-2 rounded-lg py-6 px-6 text-white font-semibold'>
                            <strong className='text-gray-700'>Short Description:</strong> {filteredData.shortDescription}
                        </h2>
                        <h3 className='border-2 rounded-lg py-6 px-6 text-white font-semibold'>
                            <strong className='text-gray-700'>Symptoms:</strong>
                            <ul>
                                {filteredData.symptoms.map((symptom, i) => (
                                    <li key={i}>{symptom}</li>
                                ))}
                            </ul>
                        </h3>
                        <h3 className='border-2 rounded-lg py-6 px-6 text-white font-semibold'>
                            <strong className='text-gray-700'>Suggestions:</strong>
                            <ul>
                                {filteredData.suggestions.map((suggestion, i) => (
                                    <li key={i}>{suggestion}</li>
                                ))}
                            </ul>
                        </h3>
                        <h3 className='border-2 rounded-lg py-6 px-6 text-white font-semibold'>
                            <strong className='text-gray-700'>Future Precautions:</strong>
                            <ul>
                                {filteredData.futurePrecautions.map((precaution, i) => (
                                    <li key={i}>{precaution}</li>
                                ))}
                            </ul>
                        </h3>
                    </motion.div>
                </div>
                </div>
            )}
        </>
    )
}

export default Analytics;
