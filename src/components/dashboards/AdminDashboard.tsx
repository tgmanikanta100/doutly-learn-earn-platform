
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, Settings, Bell, Calendar, Plus, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usersService, leadsService, doubtsService } from '@/services/firebaseService';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });
  const [newLead, setNewLead] = useState({ name: '', contact: '', vertical: '', value: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, leadsData, doubtsData] = await Promise.all([
        usersService.getAll(),
        leadsService.getAll(),
        doubtsService.getAll()
      ]);
      
      setUsers(usersData);
      setLeads(leadsData);
      setDoubts(doubtsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await usersService.create({
        ...newUser,
        joinDate: new Date().toISOString().split('T')[0]
      });
      
      setNewUser({ name: '', email: '', role: 'student' });
      await loadData();
      toast.success('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user');
    }
  };

  const handleCreateLead = async () => {
    if (!newLead.name || !newLead.contact) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await leadsService.create({
        ...newLead,
        assignedTo: 'Unassigned'
      });
      
      setNewLead({ name: '', contact: '', vertical: '', value: '' });
      await loadData();
      toast.success('Lead created successfully!');
    } catch (error) {
      console.error('Error creating lead:', error);
      toast.error('Failed to create lead');
    }
  };

  const assignLead = async (leadId: string, assignee: string) => {
    try {
      await leadsService.update(leadId, {
        assignedTo: assignee,
        status: 'in-progress'
      });
      
      await loadData();
      toast.success(`Lead assigned to ${assignee}`);
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Failed to assign lead');
    }
  };

  const metrics = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      change: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Active Leads",
      value: leads.filter(l => l.status !== 'closed').length,
      icon: Target,
      change: "+8%",
      color: "text-green-600"
    },
    {
      title: "Total Doubts",
      value: doubts.length,
      icon: TrendingUp,
      change: "+15%",
      color: "text-purple-600"
    },
    {
      title: "Resolved Doubts",
      value: doubts.filter(d => d.status === 'resolved').length,
      icon: Settings,
      change: "+2.1%",
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-xs text-green-600 mt-1">{metric.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New User</DialogTitle>
                      <DialogDescription>Add a new user to the platform</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="userName">Name</Label>
                        <Input
                          id="userName"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="userEmail">Email</Label>
                        <Input
                          id="userEmail"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="email@example.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="userRole">Role</Label>
                        <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="tutor">Tutor</SelectItem>
                            <SelectItem value="freelancer">Freelancer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleCreateUser}
                        disabled={!newUser.name || !newUser.email}
                      >
                        Create User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {users.slice(0, 3).map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email} - {user.role}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status || 'active'}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Users ({users.length})
              </Button>
            </CardContent>
          </Card>

          {/* Lead Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Lead Management
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Lead</DialogTitle>
                      <DialogDescription>Add a new business lead</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="leadName">Company Name</Label>
                        <Input
                          id="leadName"
                          value={newLead.name}
                          onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="leadContact">Contact</Label>
                        <Input
                          id="leadContact"
                          value={newLead.contact}
                          onChange={(e) => setNewLead({...newLead, contact: e.target.value})}
                          placeholder="contact@company.com"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="leadVertical">Vertical</Label>
                        <Select onValueChange={(value) => setNewLead({...newLead, vertical: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vertical" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="leadValue">Estimated Value</Label>
                        <Input
                          id="leadValue"
                          value={newLead.value}
                          onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                          placeholder="$50,000"
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleCreateLead}
                        disabled={!newLead.name || !newLead.contact}
                      >
                        Create Lead
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {leads.map((lead: any) => (
                  <div key={lead.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-gray-600">{lead.vertical} - {lead.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lead.status || 'new'}
                      </span>
                      {lead.assignedTo === 'Unassigned' && (
                        <Button size="sm" onClick={() => assignLead(lead.id, 'Sarah Wilson')}>
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Leads ({leads.length})
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doubts.slice(0, 3).map((doubt: any, index) => (
                <div key={doubt.id || index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">New doubt: {doubt.title}</p>
                    <p className="text-xs text-gray-600">{doubt.subject} - {doubt.userEmail}</p>
                  </div>
                </div>
              ))}
              {leads.slice(0, 2).map((lead: any, index) => (
                <div key={lead.id || index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Target className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">New lead: {lead.name}</p>
                    <p className="text-xs text-gray-600">{lead.vertical} - {lead.value}</p>
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

export default AdminDashboard;
