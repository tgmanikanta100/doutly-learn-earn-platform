
import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and freelancers who are already building their dreams. 
            Start your journey today - it's completely free!
          </p>

          {/* Newsletter Signup */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-6">Get the latest updates, tips, and opportunities delivered to your inbox</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="pl-10 bg-white text-gray-900 border-0"
                />
              </div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start as Student
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
              Join as Freelancer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Final Tagline */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              "Learn and Earn"
            </h3>
            <p className="text-blue-100 mt-2">Your journey to success starts here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
