import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Calendar, HelpCircle, Briefcase, Plus, MessageCircle, Ticket } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doubtsService, projectsService, eventsService, userProfileService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ subject: '', title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [doubtsData, projectsData, eventsData, profileData] = await Promise.all([
        doubtsService.getAll(user.uid),
        projectsService.getAll(user.uid),
        eventsService.getAll(),
        userProfileService.get(user.uid)
      ]);
      
      setDoubts(doubtsData);
      setProjects(projectsData);
      setEvents(eventsData);
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDoubt = async () => {
    if (!user || !newDoubt.subject || !newDoubt.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmittingDoubt(true);
    try {
      const result = await doubtsService.create({
        ...newDoubt,
        userId: user.uid,
        userEmail: user.email
      });
      
      setNewDoubt({ subject: '', title: '', description: '' });
      setIsDialogOpen(false);
      await loadData();
      toast.success(`Doubt submitted successfully! Ticket #${result.ticketNumber} has been generated.`);
    } catch (error) {
      console.error('Error submitting doubt:', error);
      toast.error('Failed to submit doubt. Please try again.');
    } finally {
      setIsSubmittingDoubt(false);
    }
  };

  const formatTimeAgo = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
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

  if (loading) {
    return (
      <DashboardLayout title="Student Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Learn and Earn</h2>
          <p className="text-gray-600">Welcome back, {user?.email?.split('@')[0]}</p>
          {userProfile?.tickets && (
            <p className="text-sm text-blue-600 mt-1">
              Total Tickets Raised: {userProfile.tickets.length}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Doubts</CardTitle>
              <HelpCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doubts.length}</div>
              <p className="text-xs text-muted-foreground">
                {doubts.filter(d => d.status === 'resolved').length} resolved
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProfile?.tickets?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Lifetime tickets</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {projects.filter(p => p.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">Available to join</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  <Button className="w-full" variant="outline" onClick={() => toast.info(`${action.title} feature coming soon!`)}>
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
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject2">Subject</Label>
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
                      <Label htmlFor="title2">Title</Label>
                      <Input 
                        id="title2"
                        value={newDoubt.title}
                        onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                        placeholder="Brief title of your doubt"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description2">Description</Label>
                      <Textarea 
                        id="description2"
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doubts.length > 0 ? (
                doubts.slice(0, 5).map((doubt: any) => (
                  <div key={doubt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">{doubt.title}</p>
                        <p className="text-xs text-gray-600">
                          {doubt.subject} - {formatTimeAgo(doubt.createdAt)}
                        </p>
                        {doubt.ticketNumber && (
                          <p className="text-xs text-blue-600 font-mono">
                            Ticket: {doubt.ticketNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        doubt.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        doubt.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doubt.status || 'pending'}
                      </span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No doubts submitted yet.</p>
                  <p className="text-sm">Submit your first doubt to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
