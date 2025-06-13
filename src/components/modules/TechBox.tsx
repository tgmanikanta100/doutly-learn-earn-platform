
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Star, DollarSign, Clock, Users } from 'lucide-react';

const TechBox = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce React App',
      description: 'Complete e-commerce solution with payment integration',
      price: 299,
      rating: 4.8,
      reviews: 45,
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Mobile App UI Kit',
      description: 'Professional mobile app design components',
      price: 149,
      rating: 4.9,
      reviews: 32,
      category: 'mobile',
      technologies: ['React Native', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'AI Chatbot Integration',
      description: 'Smart chatbot with natural language processing',
      price: 399,
      rating: 4.7,
      reviews: 28,
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'API'],
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'custom', name: 'Custom Ideas' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Tech Box</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover ready-made projects, submit custom ideas, or customize existing solutions
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Buy Existing Project</CardTitle>
            <CardDescription>Choose from our curated collection of ready-made projects</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Browse Projects</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <CardTitle>Submit Custom Idea</CardTitle>
            <CardDescription>Share your project idea and get a custom solution</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Submit Idea</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="text-center">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Customize Project</CardTitle>
            <CardDescription>Modify existing projects to fit your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Start Customizing</Button>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg"></div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge variant="outline">{project.category}</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{project.rating}</span>
                  <span className="text-sm text-gray-500">({project.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-green-600 font-bold">
                  <DollarSign className="h-4 w-4" />
                  {project.price}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1">Buy Now</Button>
                <Button variant="outline" size="sm">Preview</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechBox;
