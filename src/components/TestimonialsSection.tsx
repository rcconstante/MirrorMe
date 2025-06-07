import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    image: "https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Mirror Me has revolutionized how we approach cultural competency in therapy. It's like having a universal translator for emotions.",
    rating: 5
  },
  {
    name: "James Rodriguez",
    role: "DEI Consultant",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "This tool has become indispensable in our corporate training programs. It bridges cultural gaps like nothing else I've seen.",
    rating: 5
  },
  {
    name: "Aisha Patel",
    role: "Global Team Leader",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Managing a global team became significantly easier with Mirror Me. It's like having an emotional intelligence superpower.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Global Leaders
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how Mirror Me is transforming communication and understanding across cultures
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
            >
              <Quote className="w-10 h-10 text-[#5BC0BE] mb-4" />
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mt-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#5BC0BE] fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;