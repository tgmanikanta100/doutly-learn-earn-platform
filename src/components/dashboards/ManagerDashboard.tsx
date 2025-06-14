
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, CheckCircle, ArrowRight, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { leadsService, usersService, doubtsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [assignedLeads, setAssignedLeads] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [subjectExperts, setSubjectExperts] = useState([]);
  const [successRate, setSuccessRate] = useState(78.5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const [leadsData, tlData, expertsData] = await Promise.all([
        leadsService.getByAssignee(user.email),
        usersService.getByRole('teamleader'),
        usersService.getByRole('subjectexpert')
      ]);
      
      setAssignedLeads(leadsData);
      setTeamLeaders(tlData);
      setSubjectExperts(expertsData);
    } catch (error) {
      console.error('Error loading manager data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignLead = async (leadId: string, assigneeEmail: string, assigneeRole: string) => {
    try {
      await leadsService.update(leadId, {
        assignedTo: assigneeEmail,
        status: `assigned-${assigneeRole}`,
        assignedLevel: assigneeRole,
        assignedBy: user.email,
        assignedAt: new Date()
      });
      
      toast.success(`Lead assigned to ${assigneeEmail}`);
      await loadData();
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Failed to assign lead');
    }
  };

  const taskMetrics = [
    { title: 'Total Leads', value: assignedLeads.length, color: 'text-blue-600', change: '+12%' },
    { title: 'Team Leaders', value: teamLeaders.length, color: 'text-purple-600', change: '+2' },
    { title: 'Subject Experts', value: subjectExperts.length, color: 'text-green-600', change: '+5' },
    { title: 'Success Rate', value: `${successRate}%`, color: 'text-orange-600', change: '+3.2%' }
  ];

  if (loading) {
    return (
      <DashboardLayout title="Manager Dashboard">
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
    <DashboardLayout title="Manager Dashboard">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Manager Dashboard</h2>
          <p className="text-gray-600">Manage teams and track outcomes - {user?.email?.split('@')[0]}</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {taskMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Target className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-green-600">{metric.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Leads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Assigned Leads
                <Badge variant="secondary">{assignedLeads.length} active</Badge>
              </CardTitle>
              <CardDescription>Leads assigned to you by Vertical Head</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {assignedLeads.length > 0 ? (
                  assignedLeads.map((lead: any) => (
                    <div key={lead.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{lead.name}</h4>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                          <p className="text-xs text-blue-600 font-mono">ID: {lead.leadId}</p>
                        </div>
                        <Badge variant={lead.source === 'Tech Box' ? 'default' : 'secondary'}>
                          {lead.source}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Select onValueChange={(value) => {
                          const [email, role] = value.split('|');
                          handleAssignLead(lead.id, email, role);
                        }}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Assign to..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="" disabled>Team Leaders</SelectItem>
                            {teamLeaders.map((tl: any) => (
                              <SelectItem key={tl.id} value={`${tl.email}|teamleader`}>
                                {tl.name} (TL)
                              </SelectItem>
                            ))}
                            <SelectItem value="" disabled>Subject Experts</SelectItem>
                            {subjectExperts.map((expert: any) => (
                              <SelectItem key={expert.id} value={`${expert.email}|subjectexpert`}>
                                {expert.name} (Expert)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No leads assigned yet.</p>
                    <p className="text-sm">Leads from Vertical Head will appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>Task success rate and team analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Success Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Conversion Rate</p>
                    <p className="font-semibold text-green-700">{successRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Avg Response Time</p>
                    <p className="font-semibold text-green-700">2.3 hours</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Completed Tasks</p>
                    <p className="font-semibold text-green-700">156</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customer Satisfaction</p>
                    <p className="font-semibold text-green-700">4.7/5</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Top Performers</h4>
                {[
                  { name: 'Sarah Wilson', role: 'Team Leader', score: 95 },
                  { name: 'John Smith', role: 'Subject Expert', score: 92 },
                  { name: 'Mike Johnson', role: 'Team Leader', score: 89 }
                ].map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-800">{performer.name}</p>
                      <p className="text-sm text-blue-600">{performer.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-800">{performer.score}%</p>
                      <p className="text-xs text-blue-600">Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your team and track progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="flex items-center gap-2" variant="outline">
                <Users className="h-4 w-4" />
                Team Overview
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <Calendar className="h-4 w-4" />
                Schedule Review
              </Button>
              <Button className="flex items-center gap-2" variant="outline">
                <Award className="h-4 w-4" />
                Performance Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
