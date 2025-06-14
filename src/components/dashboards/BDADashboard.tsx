
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, TrendingUp, DollarSign, Calendar, Phone, Mail, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { leadsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DailySalesWhiteboard from '@/components/common/DailySalesWhiteboard';

const BDADashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const leadsData = await leadsService.getByAssignee(user?.email || '');
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await leadsService.updateStatus(leadId, newStatus, user?.email || '');
      await loadLeads();
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update lead status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'follow-up': return 'bg-orange-100 text-orange-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'demo': return 'bg-purple-100 text-purple-800';
      case 'bought': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const metrics = [
    {
      title: "Total Leads",
      value: leads.length,
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Interested",
      value: leads.filter(l => l.status === 'interested' || l.status === 'demo').length,
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Conversions",
      value: leads.filter(l => l.status === 'bought').length,
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "This Month",
      value: leads.filter(l => {
        const leadDate = new Date(l.createdAt?.seconds * 1000 || Date.now());
        const thisMonth = new Date();
        return leadDate.getMonth() === thisMonth.getMonth();
      }).length,
      icon: Calendar,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <DashboardLayout title="BDA Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="BDA Dashboard">
      <DailySalesWhiteboard />
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.title === "Conversions" && leads.length > 0 && 
                  `${((metric.value / leads.length) * 100).toFixed(1)}% conversion rate`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead Management */}
      <Card>
        <CardHeader>
          <CardTitle>My Leads</CardTitle>
          <CardDescription>Manage your assigned leads and track progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead: any) => (
              <div key={lead.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{lead.contact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{lead.vertical}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">ID: {lead.leadId}</p>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status}
                      </Badge>
                      {lead.value && (
                        <Badge variant="outline">{lead.value}</Badge>
                      )}
                    </div>
                    
                    <Select 
                      value={lead.status} 
                      onValueChange={(value) => updateLeadStatus(lead.id, value)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="demo">Demo Scheduled</SelectItem>
                        <SelectItem value="bought">Bought</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
                
                {lead.assignmentHistory && lead.assignmentHistory.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-500">
                      Last assigned: {new Date(lead.assignmentHistory[lead.assignmentHistory.length - 1].assignedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            {leads.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No leads assigned yet</p>
                <p className="text-sm">Contact your team leader for lead assignments</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default BDADashboard;
