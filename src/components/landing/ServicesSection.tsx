
import React from 'react';
import { BookOpen, Code, Users, Briefcase, MessageCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const studentServices = [
    {
      icon: MessageCircle,
      title: "Schedule a Tutor",
      description: "Get instant help or schedule sessions with expert tutors",
      color: "bg-blue-500"
    },
    {
      icon: Code,
      title: "Tech Box",
      description: "Buy projects, submit custom ideas, or customize existing ones",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Turn to Tutor",
      description: "Apply to become a tutor and start earning",
      color: "bg-green-500"
    },
    {
      icon: Briefcase,
      title: "Events & Workshops",
      description: "Join hackathons, workshops, and networking events",
      color: "bg-orange-500"
    }
  ];

  const freelancerServices = [
    {
      icon: BookOpen,
      title: "Doubt Solving",
      description: "Help students with their academic queries and earn",
      color: "bg-indigo-500"
    },
    {
      icon: Lightbulb,
      title: "Project Guidance",
      description: "Guide students through complex projects",
      color: "bg-pink-500"
    },
    {
      icon: Code,
      title: "Custom Development",
      description: "Build custom solutions for startups and businesses",
      color: "bg-teal-500"
    },
    {
      icon: Briefcase,
      title: "Freelance Marketplace",
      description: "Access high-quality freelance opportunities",
      color: "bg-red-500"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Students Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Services for Students
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn and Earn - Everything you need to excel in your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Freelancers Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Services for Freelancers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Work Smart, Not Hard - Monetize your skills and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freelancerServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
