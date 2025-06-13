
import React from 'react';
import { MessageCircle, Code, Calendar, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServicesSection = () => {
  const studentServices = [
    {
      icon: MessageCircle,
      title: "Instant Doubt Resolution",
      description: "Get your doubts solved instantly by expert tutors across all subjects",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Calendar,
      title: "Schedule Tutors",
      description: "Book one-on-one sessions with subject experts at your convenience",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Trophy,
      title: "Events & Hackathons",
      description: "Participate in coding competitions and educational events",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Code,
      title: "Tech Box Projects",
      description: "Access ready-made projects or request custom solutions",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  const freelancerServices = [
    {
      icon: Code,
      title: "Project Marketplace",
      description: "Browse and bid on exciting projects that match your skills",
      color: "text-indigo-600 bg-indigo-100"
    },
    {
      icon: MessageCircle,
      title: "Tutoring Opportunities",
      description: "Earn by helping students solve their doubts and learn new concepts",
      color: "text-pink-600 bg-pink-100"
    },
    {
      icon: Trophy,
      title: "Skill Recognition",
      description: "Build your reputation and get recognized for your expertise",
      color: "text-yellow-600 bg-yellow-100"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Student Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services for Students</h2>
            <p className="text-xl text-gray-600">Everything you need to excel in your academic journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color} mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Freelancer Services */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Services for Freelancers</h2>
            <p className="text-xl text-gray-600">Work smart and build your career with us</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {freelancerServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color} mb-4`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
