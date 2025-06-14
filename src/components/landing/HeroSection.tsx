
import React from 'react';
import { ArrowRight, BookOpen, Users, Award, Code, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FloatingSVG = ({ children, className, delay = 0 }: { children: React.ReactNode, className: string, delay?: number }) => (
  <div 
    className={`absolute ${className} animate-bounce`}
    style={{ animationDelay: `${delay}s`, animationDuration: '3s' }}
  >
    {children}
  </div>
);

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-pulse"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'moveBackground 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Floating SVG Elements */}
      <FloatingSVG className="top-20 left-10 text-blue-400" delay={0}>
        <Code className="h-12 w-12 opacity-60" />
      </FloatingSVG>
      <FloatingSVG className="top-32 right-20 text-purple-400" delay={1}>
        <Zap className="h-8 w-8 opacity-70" />
      </FloatingSVG>
      <FloatingSVG className="top-48 left-1/4 text-green-400" delay={0.5}>
        <Trophy className="h-10 w-10 opacity-60" />
      </FloatingSVG>
      <FloatingSVG className="top-64 right-1/3 text-orange-400" delay={1.5}>
        <Award className="h-6 w-6 opacity-80" />
      </FloatingSVG>
      <FloatingSVG className="bottom-32 left-16 text-pink-400" delay={2}>
        <BookOpen className="h-8 w-8 opacity-70" />
      </FloatingSVG>
      <FloatingSVG className="bottom-48 right-12 text-indigo-400" delay={0.8}>
        <Users className="h-10 w-10 opacity-60" />
      </FloatingSVG>

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-700 text-sm font-medium hover:scale-105 transition-transform">
                🚀 Welcome to the Future of Learning
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                One Platform,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                  {" "}Endless Possibilities
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Where students learn and solve doubts instantly, freelancers earn smart, and startups turn dreams into reality. 
                Join thousands who are already transforming their futures.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-scale-in" style={{animationDelay: '0.2s'}}>
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="#about">
                <Button variant="outline" size="lg" className="px-10 py-4 rounded-full border-2 border-gray-300 hover:border-blue-500 text-lg font-semibold hover:scale-105 transition-all duration-300">
                  Explore Features
                  <BookOpen className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats with Animation */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center lg:text-left animate-scale-in group cursor-pointer" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-110 transition-transform">
                  10K+
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">Active Students</div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mt-2 group-hover:from-blue-400 group-hover:to-purple-400 transition-colors"></div>
              </div>
              <div className="text-center lg:text-left animate-scale-in group cursor-pointer" style={{animationDelay: '0.6s'}}>
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">Expert Freelancers</div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mt-2 group-hover:from-purple-400 group-hover:to-pink-400 transition-colors"></div>
              </div>
              <div className="text-center lg:text-left animate-scale-in group cursor-pointer" style={{animationDelay: '0.8s'}}>
                <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 group-hover:scale-110 transition-transform">
                  95%
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">Success Rate</div>
                <div className="w-full h-1 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mt-2 group-hover:from-green-400 group-hover:to-blue-400 transition-colors"></div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Animated Illustration */}
          <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative group">
              {/* Main illustration container with gradient border */}
              <div className="relative p-2 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl relative">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
                  
                  {/* Content Grid */}
                  <div className="absolute inset-8 grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform">
                      <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Learn</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform">
                      <Code className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Build</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform">
                      <Trophy className="h-8 w-8 text-green-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Compete</span>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform">
                      <Zap className="h-8 w-8 text-orange-600 mb-2" />
                      <span className="text-sm font-semibold text-gray-700">Earn</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating elements with improved animations */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-bounce hover:scale-110 transition-transform cursor-pointer">
                <Award className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl animate-pulse hover:scale-110 transition-transform cursor-pointer">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce hover:scale-110 transition-transform cursor-pointer" style={{animationDelay: '0.5s'}}>
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-10px) translateY(-10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
