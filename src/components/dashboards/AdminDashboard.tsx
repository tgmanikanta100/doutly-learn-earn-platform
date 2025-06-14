
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, Settings, Bell, Calendar, Plus, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeLeads: 89,
    resolvedDoubts: 432,
    conversionRate: 23.5
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'tutor', status: 'active', joinDate: '2024-01-10' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'freelancer', status: 'pending', joinDate: '2024-01-20' }
  ]);

  const [leads, setLeads] = useState([
    { id: 1, name: 'Tech Startup', contact: 'startup@example.com', vertical: 'Technology', status: 'new', assignedTo: 'Unassigned', value: '$50,000' },
    { id: 2, name: 'E-commerce Site', contact: 'ecom@example.com', vertical: 'Retail', status: 'in-progress', assignedTo: 'Sarah Wilson', value: '$25,000' }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });
  const [newLead, setNewLead] = useState({ name: '', contact: '', vertical: '', value: '' });

  const handleCreateUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
    setStats(prev => ({ ...prev, totalUsers: prev.totalUsers + 1 }));
    setNewUser({ name: '', email: '', role: 'student' });
    alert('User created successfully!');
  };

  const handleCreateLead = () => {
    const lead = {
      id: leads.length + 1,
      ...newLead,
      status: 'new',
      assignedTo: 'Unassigned'
    };
    setLeads([...leads, lead]);
    setStats(prev => ({ ...prev, activeLeads: prev.activeLeads + 1 }));
    setNewLead({ name: '', contact: '', vertical: '', value: '' });
    alert('Lead created successfully!');
  };

  const assignLead = (leadId, assignee) => {
    setLeads(leads.map(lead => 
      lead.id === leadId ? { ...lead, assignedTo: assignee, status: 'in-progress' } : lead
    ));
    alert(`Lead assigned to ${assignee}`);
  };

  const metrics = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      change: "+12%",
      color: "text-blue-600"
    },
    {
      title: "Active Leads",
      value: stats.activeLeads,
      icon: Target,
      change: "+8%",
      color: "text-green-600"
    },
    {
      title: "Resolved Doubts",
      value: stats.resolvedDoubts,
      icon: TrendingUp,
      change: "+15%",
      color: "text-purple-600"
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: Settings,
      change: "+2.1%",
      color: "text-orange-600"
    }
  ];

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
                {users.slice(0, 3).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email} - {user.role}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
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
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-gray-600">{lead.vertical} - {lead.value}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {lead.status}
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
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">New doubt submitted</p>
                  <p className="text-xs text-gray-600">Mathematics - Student ID: S12345</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Target className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Lead converted to purchase</p>
                  <p className="text-xs text-gray-600">Tech Box Project - Lead ID: L67890</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">New tutor application</p>
                  <p className="text-xs text-gray-600">Physics Expert - Pending Review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
