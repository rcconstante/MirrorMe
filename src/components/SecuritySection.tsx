  import React from 'react';
  import { motion } from 'framer-motion';
  import { useInView } from 'react-intersection-observer';
  import { Lock, Shield, Key, FileCheck } from 'lucide-react';

  const SecuritySection = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const features = [
      {
        icon: <Lock className="w-6 h-6" />,
        title: "End-to-End Encryption",
        description: "Your data is encrypted in transit and at rest using industry-standard protocols."
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: "GDPR Compliant",
        description: "Full compliance with global data protection regulations and privacy laws."
      },
      {
        icon: <Key className="w-6 h-6" />,
        title: "Access Control",
        description: "Granular access controls and role-based permissions for enterprise security."
      },
      {
        icon: <FileCheck className="w-6 h-6" />,
        title: "Data Governance",
        description: "Comprehensive audit trails and data governance frameworks."
      }
    ];

    return (
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
                Security
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your data security and privacy are our top priorities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5BC0BE] to-[#6E44FF] flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a href="#" className="text-[#5BC0BE] hover:text-[#6E44FF] transition-colors duration-300 flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Learn more about our security measures
            </a>
          </motion.div>
        </div>
      </section>
    );
  };

  export default SecuritySection;