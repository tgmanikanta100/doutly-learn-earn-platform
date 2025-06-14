
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Star, DollarSign, Clock, Users, Calendar, MapPin, Trophy } from 'lucide-react';
import { eventsService, projectsService } from '@/services/firebaseService';

const TechBox = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample projects data (you can replace with Firebase data)
  const sampleProjects = [
    {
      id: 1,
      title: 'E-commerce React App',
      description: 'Complete e-commerce solution with payment integration',
      price: 299,
      rating: 4.8,
      reviews: 45,
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
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
      technologies: ['React Native', 'TypeScript', 'Expo'],
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
      technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Real-time analytics dashboard with charts',
      price: 199,
      rating: 4.6,
      reviews: 67,
      category: 'web',
      technologies: ['React', 'D3.js', 'Chart.js', 'Firebase'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Blockchain Voting System',
      description: 'Secure voting application using blockchain',
      price: 599,
      rating: 4.9,
      reviews: 23,
      category: 'blockchain',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'IoT Home Automation',
      description: 'Smart home control system with sensors',
      price: 449,
      rating: 4.5,
      reviews: 34,
      category: 'iot',
      technologies: ['Arduino', 'Raspberry Pi', 'Node.js', 'MQTT'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop'
    }
  ];

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: "React Hackathon 2025",
      date: "Jan 20-22, 2025",
      location: "Online",
      participants: 500,
      prize: "$10,000",
      category: "Hackathon",
      description: "Build innovative React applications in 48 hours",
      status: "upcoming"
    },
    {
      id: 2,
      title: "AI/ML Workshop",
      date: "Jan 25, 2025",
      location: "Mumbai",
      participants: 100,
      prize: "Certificate",
      category: "Workshop",
      description: "Learn machine learning fundamentals with hands-on projects",
      status: "registration-open"
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "Feb 1-2, 2025",
      location: "Bangalore",
      participants: 200,
      prize: "$25,000",
      category: "Competition",
      description: "Present your startup idea to top investors",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Blockchain Bootcamp",
      date: "Feb 10-14, 2025",
      location: "Delhi",
      participants: 75,
      prize: "Job Placement",
      category: "Bootcamp",
      description: "5-day intensive blockchain development course",
      status: "registration-open"
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [eventsData, projectsData] = await Promise.all([
        eventsService.getAll(),
        projectsService.getAll()
      ]);
      
      // Combine with sample data for now
      setEvents([...eventsData, ...sampleEvents]);
      setProjects([...projectsData, ...sampleProjects]);
    } catch (error) {
      console.error('Error loading data:', error);
      // Use sample data as fallback
      setEvents(sampleEvents);
      setProjects(sampleProjects);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'iot', name: 'IoT' },
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
          Discover ready-made projects, join exciting events, or submit custom ideas
        </p>
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map((event: any) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={event.category === 'Hackathon' ? 'default' : 'secondary'}>
                    {event.category}
                  </Badge>
                  <Badge variant="outline" className={event.status === 'registration-open' ? 'bg-green-50 text-green-700' : ''}>
                    {event.status === 'registration-open' ? 'Open' : 'Upcoming'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Trophy className="h-4 w-4" />
                  <span>Prize: {event.prize}</span>
                </div>
                <Button className="w-full" size="sm">
                  {event.status === 'registration-open' ? 'Register Now' : 'Learn More'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
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
        {filteredProjects.map((project: any) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <div 
              className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge variant="outline" className="capitalize">{project.category}</Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.map((tech: string, index: number) => (
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
