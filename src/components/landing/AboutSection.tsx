
import React from 'react';
import { Users, Target, Trophy, Zap } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with thousands of learners and experts worldwide"
    },
    {
      icon: Target,
      title: "Goal Oriented",
      description: "Clear pathways to achieve your academic and career goals"
    },
    {
      icon: Trophy,
      title: "Proven Results",
      description: "95% success rate with measurable outcomes"
    },
    {
      icon: Zap,
      title: "Instant Support",
      description: "Get help when you need it with 24/7 availability"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Doutly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing education by creating a seamless ecosystem where 
            learning meets earning, and dreams become reality through collaborative innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            To democratize education and create opportunities for everyone to learn, earn, and grow. 
            We believe that knowledge sharing should be rewarding for both learners and educators, 
            creating a sustainable ecosystem of continuous growth and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
