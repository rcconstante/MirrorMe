import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Starter",
      price: "49",
      description: "Perfect for individuals and small teams",
      features: [
        "Basic emotion detection",
        "Cultural context analysis",
        "Chat support",
        "1 user license",
        "Basic API access"
      ]
    },
    {
      name: "Professional",
      price: "99",
      description: "Ideal for growing businesses",
      features: [
        "Advanced emotion detection",
        "Real-time cultural insights",
        "Priority support",
        "5 user licenses",
        "Full API access",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Enterprise-grade security",
        "Dedicated support team",
        "Unlimited users",
        "Custom AI model training",
        "Advanced analytics",
        "SLA guarantee"
      ]
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
            Simple,
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Transparent
            </span>
            Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-8 border ${
                plan.popular 
                  ? 'border-[#5BC0BE]' 
                  : 'border-[#5BC0BE]/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#5BC0BE]" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white hover:shadow-lg hover:shadow-[#6E44FF]/30'
                  : 'bg-transparent border border-[#5BC0BE] text-[#5BC0BE] hover:bg-[#5BC0BE]/10'
              }`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;