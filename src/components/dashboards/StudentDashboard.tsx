
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Calendar, HelpCircle, Briefcase, Plus, MessageCircle, Ticket, User, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { doubtsService, projectsService, eventsService, userProfileService, leadsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [newDoubt, setNewDoubt] = useState({
    subject: '',
    title: '',
    description: '',
    tutorType: 'instant',
    scheduledDate: '',
    scheduledTime: ''
  });
  
  const [techBoxRequest, setTechBoxRequest] = useState({
    type: 'choose',
    projectDescription: '',
    customization: ''
  });
  
  const [isDoubtDialogOpen, setIsDoubtDialogOpen] = useState(false);
  const [isTechBoxDialogOpen, setIsTechBoxDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [doubtsData, projectsData, eventsData, profileData] = await Promise.all([
        doubtsService.getAll(user.uid),
        projectsService.getPopular(),
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

    if (newDoubt.tutorType === 'scheduled' && (!newDoubt.scheduledDate || !newDoubt.scheduledTime)) {
      toast.error('Please select date and time for scheduled tutoring');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit doubt
      const result = await doubtsService.create({
        ...newDoubt,
        userId: user.uid,
        userEmail: user.email
      });

      // Also create a lead for business tracking
      await leadsService.create({
        name: user.displayName || user.email?.split('@')[0] || 'Student',
        email: user.email,
        phone: userProfile?.phone || 'Not provided',
        source: 'Schedule Tutor',
        type: 'tutoring',
        details: {
          subject: newDoubt.subject,
          tutorType: newDoubt.tutorType,
          scheduledDate: newDoubt.scheduledDate,
          scheduledTime: newDoubt.scheduledTime
        }
      });
      
      setNewDoubt({
        subject: '',
        title: '',
        description: '',
        tutorType: 'instant',
        scheduledDate: '',
        scheduledTime: ''
      });
      setIsDoubtDialogOpen(false);
      await loadData();
      toast.success(`Doubt submitted successfully! Ticket #${result.ticketNumber} has been generated.`);
    } catch (error) {
      console.error('Error submitting doubt:', error);
      toast.error('Failed to submit doubt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechBoxRequest = async () => {
    if (!user || !techBoxRequest.projectDescription) {
      toast.error('Please fill in the project description');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create lead for tech box request
      await leadsService.create({
        name: user.displayName || user.email?.split('@')[0] || 'Student',
        email: user.email,
        phone: userProfile?.phone || 'Not provided',
        source: 'Tech Box',
        type: 'project',
        details: {
          requestType: techBoxRequest.type,
          projectDescription: techBoxRequest.projectDescription,
          customization: techBoxRequest.customization
        }
      });

      setTechBoxRequest({
        type: 'choose',
        projectDescription: '',
        customization: ''
      });
      setIsTechBoxDialogOpen(false);
      toast.success('Tech Box request submitted successfully! Our team will contact you soon.');
    } catch (error) {
      console.error('Error submitting tech box request:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventRegister = async (eventId: string, eventTitle: string) => {
    if (!user) return;
    
    try {
      await eventsService.register(eventId, user.uid);
      toast.success(`Successfully registered for ${eventTitle}!`);
      await loadData();
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register for event');
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
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Learn and Earn</h2>
          <p className="text-gray-600">Welcome back, {user?.email?.split('@')[0]}</p>
          {userProfile?.tickets && (
            <p className="text-sm text-blue-600 mt-1">
              Total Tickets Raised: {userProfile.tickets.length}
            </p>
          )}
        </div>

        {/* Stats Cards */}
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
              <CardTitle className="text-sm font-medium">Projects Available</CardTitle>
              <Briefcase className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">In Tech Box</p>
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

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Schedule Tutor */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Schedule Tutor</CardTitle>
              <CardDescription>Get instant help or schedule a session</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isDoubtDialogOpen} onOpenChange={setIsDoubtDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Schedule Now</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Schedule Tutor</DialogTitle>
                    <DialogDescription>
                      Get help from our expert tutors
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Subject</Label>
                      <Select onValueChange={(value) => setNewDoubt({...newDoubt, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Tutor Type</Label>
                      <RadioGroup 
                        value={newDoubt.tutorType} 
                        onValueChange={(value) => setNewDoubt({...newDoubt, tutorType: value})}
                        className="flex space-x-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="instant" id="instant" />
                          <Label htmlFor="instant">Instant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scheduled" id="scheduled" />
                          <Label htmlFor="scheduled">Scheduled</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {newDoubt.tutorType === 'scheduled' && (
                      <>
                        <div>
                          <Label>Date</Label>
                          <Input 
                            type="date"
                            value={newDoubt.scheduledDate}
                            onChange={(e) => setNewDoubt({...newDoubt, scheduledDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Time</Label>
                          <Input 
                            type="time"
                            value={newDoubt.scheduledTime}
                            onChange={(e) => setNewDoubt({...newDoubt, scheduledTime: e.target.value})}
                          />
                        </div>
                      </>
                    )}
                    
                    <div>
                      <Label>Doubt Title</Label>
                      <Input 
                        value={newDoubt.title}
                        onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                        placeholder="Brief title of your doubt"
                      />
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={newDoubt.description}
                        onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
                        placeholder="Describe your doubt in detail"
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleSubmitDoubt}
                      disabled={isSubmitting || !newDoubt.subject || !newDoubt.title}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Tech Box */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Tech Box</CardTitle>
              <CardDescription>Projects and custom development</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={isTechBoxDialogOpen} onOpenChange={setIsTechBoxDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">Explore Projects</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tech Box Request</DialogTitle>
                    <DialogDescription>
                      Choose from our project options
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Project Type</Label>
                      <RadioGroup 
                        value={techBoxRequest.type} 
                        onValueChange={(value) => setTechBoxRequest({...techBoxRequest, type: value})}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="choose" id="choose" />
                          <Label htmlFor="choose">Choose own project + guide</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buy" id="buy" />
                          <Label htmlFor="buy">Buy existing project + guidance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customize" id="customize" />
                          <Label htmlFor="customize">Customize existing project</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label>Project Description</Label>
                      <Textarea 
                        value={techBoxRequest.projectDescription}
                        onChange={(e) => setTechBoxRequest({...techBoxRequest, projectDescription: e.target.value})}
                        placeholder="Describe your project idea or requirements"
                        rows={4}
                      />
                    </div>
                    
                    {techBoxRequest.type === 'customize' && (
                      <div>
                        <Label>Customization Details</Label>
                        <Textarea 
                          value={techBoxRequest.customization}
                          onChange={(e) => setTechBoxRequest({...techBoxRequest, customization: e.target.value})}
                          placeholder="What customizations do you need?"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      onClick={handleTechBoxRequest}
                      disabled={isSubmitting || !techBoxRequest.projectDescription}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Events</CardTitle>
              <CardDescription>Hackathons, workshops & seminars</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => toast.info('Events section coming soon!')}>
                View Events
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Doubts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Doubts
                <Button size="sm" onClick={() => setIsDoubtDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
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
                              #{doubt.ticketNumber}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        doubt.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        doubt.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {doubt.status || 'pending'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No doubts submitted yet.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Popular Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Projects</CardTitle>
              <CardDescription>Trending in Tech Box</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {projects.slice(0, 4).map((project: any, index) => (
                  <div key={project.id || index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">{project.title}</p>
                      <p className="text-xs text-gray-600">{project.category}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
