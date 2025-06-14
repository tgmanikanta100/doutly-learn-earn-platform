
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Download, Star, Eye, Filter, Search, ShoppingCart, Zap, Smartphone, Globe, Database, Cpu, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TechBoxSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: "E-commerce React App",
      description: "Full-featured online store with payment integration",
      category: "web-development",
      price: 49,
      downloads: 1250,
      rating: 4.8,
      image: "🛒",
      tech: ["React", "Node.js", "MongoDB"],
      features: ["Payment Gateway", "Admin Panel", "Responsive Design"],
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      category: "web-development",
      price: 39,
      downloads: 890,
      rating: 4.6,
      image: "📊",
      tech: ["React", "Chart.js", "Firebase"],
      features: ["Real-time Analytics", "Multi-platform", "Dark Mode"],
      level: "Advanced"
    },
    {
      id: 3,
      title: "Crypto Tracker Mobile App",
      description: "Track cryptocurrency prices and portfolio",
      category: "mobile-development",
      price: 59,
      downloads: 2100,
      rating: 4.9,
      image: "📱",
      tech: ["React Native", "API Integration"],
      features: ["Real-time Prices", "Portfolio Tracking", "Push Notifications"],
      level: "Intermediate"
    },
    {
      id: 4,
      title: "AI Chatbot Integration",
      description: "Smart chatbot with natural language processing",
      category: "ai-ml",
      price: 79,
      downloads: 650,
      rating: 4.7,
      image: "🤖",
      tech: ["Python", "TensorFlow", "OpenAI API"],
      features: ["NLP", "Context Awareness", "Multi-language"],
      level: "Advanced"
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Secure voting system using blockchain technology",
      category: "blockchain",
      price: 99,
      downloads: 320,
      rating: 4.5,
      image: "🗳️",
      tech: ["Solidity", "Web3.js", "Ethereum"],
      features: ["Secure Voting", "Transparency", "Smart Contracts"],
      level: "Expert"
    },
    {
      id: 6,
      title: "IoT Home Automation",
      description: "Complete smart home control system",
      category: "iot",
      price: 129,
      downloads: 450,
      rating: 4.8,
      image: "🏠",
      tech: ["Arduino", "Raspberry Pi", "MQTT"],
      features: ["Remote Control", "Automation", "Energy Monitoring"],
      level: "Expert"
    },
    {
      id: 7,
      title: "Learning Management System",
      description: "Complete LMS with course management and tracking",
      category: "web-development",
      price: 89,
      downloads: 780,
      rating: 4.6,
      image: "📚",
      tech: ["React", "Node.js", "PostgreSQL"],
      features: ["Course Management", "Progress Tracking", "Video Streaming"],
      level: "Advanced"
    },
    {
      id: 8,
      title: "Cybersecurity Scanner",
      description: "Automated security vulnerability scanner",
      category: "cybersecurity",
      price: 149,
      downloads: 210,
      rating: 4.9,
      image: "🔒",
      tech: ["Python", "Nmap", "Security Tools"],
      features: ["Vulnerability Detection", "Report Generation", "Network Scanning"],
      level: "Expert"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Globe },
    { value: 'web-development', label: 'Web Development', icon: Code },
    { value: 'mobile-development', label: 'Mobile Apps', icon: Smartphone },
    { value: 'ai-ml', label: 'AI & Machine Learning', icon: Cpu },
    { value: 'blockchain', label: 'Blockchain', icon: Database },
    { value: 'iot', label: 'IoT Projects', icon: Zap },
    { value: 'cybersecurity', label: 'Cybersecurity', icon: Shield }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="techbox" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Box</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready-to-use projects, custom development, and tech solutions for students and startups
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <Badge className={getLevelColor(project.level)}>
                    {project.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tech.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {project.features.slice(0, 2).map((feature, index) => (
                    <p key={index} className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                      {feature}
                    </p>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{project.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{project.rating}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <span className="text-lg font-bold text-green-600">${project.price}</span>
                    <span className="text-sm text-gray-500 ml-1">USD</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Options */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Choose & Customize</CardTitle>
              <CardDescription>
                Select from our existing projects and get them customized to your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Browse Projects</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>Custom Development</CardTitle>
              <CardDescription>
                Have a unique idea? Our expert team will build it from scratch for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Request Quote</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Ready Solutions</CardTitle>
              <CardDescription>
                Download complete projects with source code, documentation, and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View All</Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Something Custom?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our expert developers can create custom solutions 
                tailored to your specific requirements. From simple scripts to complex applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Request Custom Project</Button>
                <Button size="lg" variant="outline">Schedule Consultation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechBoxSection;
