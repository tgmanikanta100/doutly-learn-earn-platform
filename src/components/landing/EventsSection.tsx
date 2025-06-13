
import React from 'react';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "React Hackathon 2025",
      date: "Jan 20-22, 2025",
      location: "Online",
      participants: 500,
      prize: "$10,000",
      category: "Hackathon",
      description: "Build innovative React applications in 48 hours",
      image: "🚀"
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
      image: "🤖"
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
      image: "💡"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Events & Hackathons</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Participate in exciting events, compete with peers, and win amazing prizes while learning new skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{event.image}</div>
                  <Badge variant={event.category === 'Hackathon' ? 'default' : event.category === 'Workshop' ? 'secondary' : 'outline'}>
                    {event.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.participants} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>Prize: {event.prize}</span>
                </div>
                <Button className="w-full mt-4">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
