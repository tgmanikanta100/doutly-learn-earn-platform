
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Calendar, HelpCircle, Briefcase, Plus, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [doubtsCount, setDoubtsCount] = useState(8);
  const [projectsCount, setProjectsCount] = useState(3);
  const [eventsCount, setEventsCount] = useState(5);
  const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ subject: '', title: '', description: '' });

  const handleSubmitDoubt = async () => {
    setIsSubmittingDoubt(true);
    // Simulate API call
    setTimeout(() => {
      setDoubtsCount(prev => prev + 1);
      setNewDoubt({ subject: '', title: '', description: '' });
      setIsSubmittingDoubt(false);
      alert('Doubt submitted successfully! A tutor will respond soon.');
    }, 1000);
  };

  const quickActions = [
    {
      title: "Submit a Doubt",
      description: "Get instant help with your studies",
      icon: HelpCircle,
      color: "bg-blue-500",
      action: "doubt"
    },
    {
      title: "Tech Box",
      description: "Browse projects or submit custom ideas",
      icon: Briefcase,
      color: "bg-purple-500",
      action: "techbox"
    },
    {
      title: "Schedule Tutor",
      description: "Book a one-on-one session",
      icon: Calendar,
      color: "bg-green-500",
      action: "schedule"
    },
    {
      title: "Join Events",
      description: "Participate in hackathons and workshops",
      icon: Trophy,
      color: "bg-orange-500",
      action: "events"
    }
  ];

  const recentDoubts = [
    { id: 1, subject: 'Mathematics', title: 'Calculus Integration', status: 'Resolved', time: '2 hours ago' },
    { id: 2, subject: 'Physics', title: 'Quantum Mechanics', status: 'Pending', time: '1 day ago' },
    { id: 3, subject: 'Chemistry', title: 'Organic Reactions', status: 'In Progress', time: '2 days ago' }
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
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doubts</CardTitle>
              <HelpCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doubtsCount}</div>
              <p className="text-xs text-muted-foreground">2 resolved this week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectsCount}</div>
              <p className="text-xs text-muted-foreground">1 in progress</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
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
                {action.action === 'doubt' ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        Get Started
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit a Doubt</DialogTitle>
                        <DialogDescription>
                          Describe your question and get help from our expert tutors
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Select onValueChange={(value) => setNewDoubt({...newDoubt, subject: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="chemistry">Chemistry</SelectItem>
                              <SelectItem value="computer-science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input 
                            id="title"
                            value={newDoubt.title}
                            onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                            placeholder="Brief title of your doubt"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description"
                            value={newDoubt.description}
                            onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
                            placeholder="Describe your doubt in detail"
                            rows={4}
                          />
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleSubmitDoubt}
                          disabled={isSubmittingDoubt || !newDoubt.subject || !newDoubt.title}
                        >
                          {isSubmittingDoubt ? 'Submitting...' : 'Submit Doubt'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="w-full" variant="outline" onClick={() => alert(`${action.title} feature coming soon!`)}>
                    Get Started
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Doubts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Doubts
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Doubt
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit a New Doubt</DialogTitle>
                  </DialogHeader>
                  {/* Same form as above */}
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDoubts.map((doubt) => (
                <div key={doubt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{doubt.title}</p>
                      <p className="text-xs text-gray-600">{doubt.subject} - {doubt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      doubt.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      doubt.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doubt.status}
                    </span>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
