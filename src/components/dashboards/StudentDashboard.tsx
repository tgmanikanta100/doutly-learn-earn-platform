
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Calendar, HelpCircle, Briefcase } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [doubtsCount, setDoubtsCount] = useState(8);
  const [projectsCount, setProjectsCount] = useState(3);
  const [eventsCount, setEventsCount] = useState(5);

  const quickActions = [
    {
      title: "Schedule a Tutor",
      description: "Get instant help or schedule a session",
      icon: Calendar,
      color: "bg-blue-500",
      action: () => console.log('Schedule tutor')
    },
    {
      title: "Tech Box",
      description: "Browse projects or submit custom ideas",
      icon: Briefcase,
      color: "bg-purple-500",
      action: () => console.log('Tech box')
    },
    {
      title: "Turn to Tutor",
      description: "Apply to become a tutor and earn",
      icon: BookOpen,
      color: "bg-green-500",
      action: () => console.log('Become tutor')
    },
    {
      title: "Events",
      description: "Join hackathons and workshops",
      icon: Trophy,
      color: "bg-orange-500",
      action: () => console.log('Events')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Learn and Earn - Welcome back, {user?.email?.split('@')[0]}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doubts</CardTitle>
              <HelpCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doubtsCount}</div>
              <p className="text-xs text-muted-foreground">2 resolved this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsCount}</div>
              <p className="text-xs text-muted-foreground">1 in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventsCount}</div>
              <p className="text-xs text-muted-foreground">Next: React Workshop</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardHeader className="text-center">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" onClick={action.action}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Math doubt resolved</p>
                  <p className="text-xs text-gray-600">Calculus integration - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Briefcase className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Project delivered</p>
                  <p className="text-xs text-gray-600">React Todo App - Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Trophy className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Event joined</p>
                  <p className="text-xs text-gray-600">AI Workshop - 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
