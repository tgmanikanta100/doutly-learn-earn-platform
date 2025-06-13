
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Mail, Calendar, Target } from 'lucide-react';

const LeadManagement = () => {
  const [leads, setLeads] = useState([
    {
      id: 'L001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      source: 'Tech Box',
      status: 'new',
      assignedTo: '',
      createdAt: '2025-01-15'
    },
    {
      id: 'L002',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1234567891',
      source: 'Schedule Tutor',
      status: 'interested',
      assignedTo: 'bda1@doutly.com',
      createdAt: '2025-01-14'
    },
    {
      id: 'L003',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1234567892',
      source: 'Events',
      status: 'bought',
      assignedTo: 'bda2@doutly.com',
      createdAt: '2025-01-13'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'interested': return 'bg-blue-100 text-blue-800';
      case 'bought': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
        <Button>Add New Lead</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="bought">Bought</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search leads..." className="max-w-sm" />
          </div>
        </CardContent>
      </Card>

      {/* Leads Grid */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{lead.name}</h3>
                    <p className="text-sm text-gray-600">ID: {lead.id}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{lead.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <Badge variant="outline">
                      {lead.source}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {lead.assignedTo ? `Assigned to: ${lead.assignedTo}` : 'Not assigned'}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Target className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeadManagement;
