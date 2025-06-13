
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const VerticalHeadDashboard = () => {
  const { user } = useAuth();
  const [assignedLeads, setAssignedLeads] = useState(45);
  const [managersCount, setManagersCount] = useState(8);
  const [conversionRate, setConversionRate] = useState(28.5);

  const recentLeads = [
    { id: 'L001', name: 'Tech Startup MVP', status: 'new', manager: 'Not Assigned', priority: 'high' },
    { id: 'L002', name: 'E-learning Platform', status: 'assigned', manager: 'John Manager', priority: 'medium' },
    { id: 'L003', name: 'Mobile App Development', status: 'in-progress', manager: 'Sarah Manager', priority: 'high' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vertical Head Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your vertical and assign leads to managers - {user?.email?.split('.')[0]}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Leads</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedLeads}</div>
              <p className="text-xs text-green-600">+12% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Managers</CardTitle>
              <Users className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{managersCount}</div>
              <p className="text-xs text-muted-foreground">Under supervision</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-green-600">+3.2% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Lead Assignment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Leads assigned to your vertical</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <p className="text-sm text-gray-600">ID: {lead.id}</p>
                      <p className="text-xs text-gray-500">Manager: {lead.manager}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        lead.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.status}
                      </span>
                      <Button size="sm" variant="outline" className="ml-2">
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your vertical operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Manage Team Members
              </Button>
              <Button className="w-full" variant="outline">
                <Target className="mr-2 h-4 w-4" />
                Bulk Assign Leads
              </Button>
              <Button className="w-full" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Performance Reports
              </Button>
              <Button className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" />
                Review Completed Projects
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerticalHeadDashboard;
