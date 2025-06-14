
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Target, TrendingDown, ArrowRight, UserPlus, CheckSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { leadsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DailySalesWhiteboard from '@/components/common/DailySalesWhiteboard';

const VerticalHeadDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
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

  const handleBulkAssign = async (assigneeEmail: string, level: string) => {
    if (selectedLeads.length === 0) {
      toast.error('Please select leads to assign');
      return;
    }

    try {
      await leadsService.bulkAssign(selectedLeads, assigneeEmail, user?.email || '', level);
      setSelectedLeads([]);
      await loadLeads();
      toast.success(`${selectedLeads.length} leads assigned successfully`);
    } catch (error) {
      console.error('Error assigning leads:', error);
      toast.error('Failed to assign leads');
    }
  };

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'assigned-manager': return 'bg-yellow-100 text-yellow-800';
      case 'assigned-teamlead': return 'bg-purple-100 text-purple-800';
      case 'interested': return 'bg-green-100 text-green-800';
      case 'bought': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Vertical Head Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Vertical Head Dashboard">
      <DailySalesWhiteboard />
      
      {/* Bulk Assignment Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Bulk Lead Assignment ({selectedLeads.length} selected)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={() => handleBulkAssign('manager@doutly.com', 'manager')}
              disabled={selectedLeads.length === 0}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Assign to Manager
            </Button>
            <Button 
              onClick={() => handleBulkAssign('teamlead@doutly.com', 'teamlead')}
              disabled={selectedLeads.length === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Assign to Team Leader
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assigned Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignment</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.filter(l => l.status === 'new' || l.status === 'assigned-vh').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leads.length > 0 ? ((leads.filter(l => l.status === 'bought').length / leads.length) * 100).toFixed(1) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Management */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
          <CardDescription>Manage and assign leads to managers and team leaders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    checked={selectedLeads.includes(lead.id)}
                    onCheckedChange={() => handleSelectLead(lead.id)}
                  />
                  <div>
                    <h3 className="font-semibold">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.contact} - {lead.vertical}</p>
                    <p className="text-xs text-gray-500">ID: {lead.leadId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                  <div className="text-right text-sm">
                    <p className="font-medium">{lead.value || 'N/A'}</p>
                    <p className="text-gray-500">
                      {lead.assignedTo ? `→ ${lead.assignedTo}` : 'Unassigned'}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leads assigned yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default VerticalHeadDashboard;
