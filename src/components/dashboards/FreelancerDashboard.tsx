
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Star, Clock, CheckCircle, Bell, User, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { doubtsService, usersService, notificationsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [assignedDoubts, setAssignedDoubts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [earnings, setEarnings] = useState(1250);
  const [rating, setRating] = useState(4.8);
  const [completedTasks, setCompletedTasks] = useState(42);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [doubtsData, notificationsData] = await Promise.all([
        doubtsService.getByAssignee(user.uid),
        notificationsService.getByUser(user.uid)
      ]);
      
      setAssignedDoubts(doubtsData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error loading freelancer data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToTutor = async () => {
    try {
      // Update user role to include tutor capabilities
      await usersService.update(user.uid, {
        role: 'freelancer-tutor',
        tutorStatus: 'pending-approval'
      });
      
      toast.success('Applied to become a tutor! Your application is under review.');
    } catch (error) {
      console.error('Error applying to tutor:', error);
      toast.error('Failed to submit tutor application');
    }
  };

  const handleResolveDoubt = async (doubtId: string) => {
    try {
      await doubtsService.update(doubtId, {
        status: 'resolved',
        resolvedAt: new Date(),
        resolvedBy: user.uid
      });
      
      // Add earnings
      await usersService.updateEarnings(user.uid, 25); // $25 per resolved doubt
      
      toast.success('Doubt marked as resolved! Earnings updated.');
      await loadData();
    } catch (error) {
      console.error('Error resolving doubt:', error);
      toast.error('Failed to resolve doubt');
    }
  };

  const upcomingTasks = [
    { time: '2:00 PM', task: 'Solve calculus problem', student: 'John D.', type: 'instant', priority: 'high' },
    { time: '4:30 PM', task: 'Physics homework help', student: 'Sarah M.', type: 'scheduled', priority: 'medium' },
    { time: '6:00 PM', task: 'Code review session', student: 'Mike R.', type: 'scheduled', priority: 'high' }
  ];

  if (loading) {
    return (
      <DashboardLayout title="Freelancer Dashboard">
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
    <DashboardLayout title="Freelancer Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Freelancer Hub</h2>
          <p className="text-gray-600">Earn while you help - {user?.email?.split('@')[0]}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings}</div>
              <p className="text-xs text-green-600">+$125 this week</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rating}</div>
              <p className="text-xs text-muted-foreground">From {completedTasks} reviews</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedDoubts.length}</div>
              <p className="text-xs text-muted-foreground">Assigned to you</p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Apply to Tutor</CardTitle>
              <CardDescription>Upgrade to tutor status for more opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={handleApplyToTutor}>
                Apply Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle>View Projects</CardTitle>
              <CardDescription>Browse available freelance projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => toast.info('Projects section coming soon!')}>
                Browse Projects
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Track your progress and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => toast.info('Analytics coming soon!')}>
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Assigned Doubts
                <Badge variant="secondary">{assignedDoubts.length} active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {assignedDoubts.length > 0 ? (
                  assignedDoubts.map((doubt: any) => (
                    <div key={doubt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-medium">{doubt.title}</p>
                        <p className="text-xs text-gray-600">
                          {doubt.subject} - Student: {doubt.userEmail}
                        </p>
                        <p className="text-xs text-blue-600 font-mono">
                          #{doubt.ticketNumber}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doubt.tutorType === 'instant' ? 'destructive' : 'default'}>
                          {doubt.tutorType}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleResolveDoubt(doubt.id)}
                          disabled={doubt.status === 'resolved'}
                        >
                          {doubt.status === 'resolved' ? 'Resolved' : 'Resolve'}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No assigned doubts yet.</p>
                    <p className="text-sm">Tasks will appear here when assigned to you.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your upcoming tasks and sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{task.time} - {task.task}</p>
                      <p className="text-xs text-gray-600">Student: {task.student}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.type === 'instant' ? 'destructive' : 'default'}>
                        {task.type}
                      </Badge>
                      <Badge variant={task.priority === 'high' ? 'destructive' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification: any) => (
                  <div key={notification.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Bell className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-600">{notification.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No new notifications</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FreelancerDashboard;
