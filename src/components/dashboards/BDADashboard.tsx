
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Phone, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BDADashboard = () => {
  const { user } = useAuth();
  const [assignedLeads, setAssignedLeads] = useState(25);
  const [conversionRate, setConversionRate] = useState(22);
  const [callsMade, setCallsMade] = useState(18);

  const leadsList = [
    { id: 'L001', name: 'Tech Startup MVP', status: 'new', priority: 'high', contact: '+1234567890' },
    { id: 'L002', name: 'E-commerce Platform', status: 'interested', priority: 'medium', contact: '+1234567891' },
    { id: 'L003', name: 'Mobile App Development', status: 'follow-up', priority: 'high', contact: '+1234567892' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">BDA Dashboard</h1>
          <p className="text-gray-600 mt-2">Convert leads and drive sales - {user?.email?.split('.')[0]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Leads</CardTitle>
              <Target className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedLeads}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-green-600">Above average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calls Made</CardTitle>
              <Phone className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{callsMade}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>My Leads</CardTitle>
            <CardDescription>Leads assigned to you for conversion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadsList.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{lead.name}</h4>
                    <p className="text-sm text-gray-600">ID: {lead.id}</p>
                    <p className="text-xs text-gray-500">Contact: {lead.contact}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                        lead.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'interested' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {lead.status}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        lead.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.priority}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                    </div>
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

export default BDADashboard;
