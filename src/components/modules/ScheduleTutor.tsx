
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Zap, BookOpen, Star } from 'lucide-react';

const ScheduleTutor = () => {
  const [scheduleType, setScheduleType] = useState('instant');
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology'
  ];

  const featuredTutors = [
    {
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      rating: 4.9,
      experience: '8 years',
      avatar: '👩‍🏫',
      price: '$25/hour'
    },
    {
      name: 'Prof. Mike Chen',
      subject: 'Physics',
      rating: 4.8,
      experience: '12 years',
      avatar: '👨‍🔬',
      price: '$30/hour'
    },
    {
      name: 'Dr. Emily Davis',
      subject: 'Computer Science',
      rating: 5.0,
      experience: '6 years',
      avatar: '👩‍💻',
      price: '$35/hour'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Schedule a Tutor</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get instant help or schedule a session with our expert tutors
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Schedule Type Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card 
            className={`cursor-pointer transition-all ${scheduleType === 'instant' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'}`}
            onClick={() => setScheduleType('instant')}
          >
            <CardHeader className="text-center">
              <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Instant Help</CardTitle>
              <CardDescription>Get help right now from available tutors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Usually responds in 5-10 minutes
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${scheduleType === 'scheduled' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'}`}
            onClick={() => setScheduleType('scheduled')}
          >
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Schedule Session</CardTitle>
              <CardDescription>Book a session at your preferred time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Choose your preferred date & time
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doubt Submission Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submit Your Doubt</CardTitle>
            <CardDescription>
              {scheduleType === 'instant' 
                ? 'Describe your doubt and get instant help' 
                : 'Schedule a session with detailed information'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>

            <div>
              <Label>Subject</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="title">Doubt Title</Label>
              <Input id="title" placeholder="Brief title of your doubt" />
            </div>

            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                id="description" 
                placeholder="Explain your doubt in detail..."
                rows={4}
              />
            </div>

            {scheduleType === 'scheduled' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
            )}

            <Button className="w-full" size="lg">
              {scheduleType === 'instant' ? 'Get Instant Help' : 'Schedule Session'}
            </Button>
          </CardContent>
        </Card>

        {/* Featured Tutors */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Tutors</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTutors.map((tutor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{tutor.avatar}</div>
                  <CardTitle className="text-lg">{tutor.name}</CardTitle>
                  <CardDescription>{tutor.subject}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{tutor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{tutor.experience} experience</p>
                  <p className="font-semibold text-green-600">{tutor.price}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTutor;
