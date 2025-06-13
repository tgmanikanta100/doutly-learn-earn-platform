
import React from 'react';
import { GraduationCap, Users, Rocket } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What is Doutly?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Doutly is a revolutionary platform that connects students, freelancers, and startups in one ecosystem. 
            We believe in empowering everyone to learn, earn, and grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Students</h3>
            <p className="text-gray-600">
              Get instant doubt resolution, access expert tutors, join hackathons, and even become a tutor yourself. 
              Learn while you earn.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Freelancers</h3>
            <p className="text-gray-600">
              Work smart, not hard. Take on projects that match your skills, build your portfolio, 
              and earn consistently through our Tech Box marketplace.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Startups</h3>
            <p className="text-gray-600">
              Turn your dream into a product. Access skilled developers, get custom solutions, 
              and bring your ideas to life with our expert team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
