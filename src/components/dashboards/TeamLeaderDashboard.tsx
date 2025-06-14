
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserPlus, Target, Settings, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { leadsService, teamsService } from '@/services/firebaseService';
import { toast } from 'sonner';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DailySalesWhiteboard from '@/components/common/DailySalesWhiteboard';

const TeamLeaderDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [leadsData, teamsData] = await Promise.all([
        leadsService.getByAssignee(user?.email || ''),
        teamsService.getByLeader(user?.email || '')
      ]);
      setLeads(leadsData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeam.name) {
      toast.error('Please enter a team name');
      return;
    }

    try {
      await teamsService.create({
        ...newTeam,
        leaderId: user?.email
      });
      setNewTeam({ name: '', description: '' });
      await loadData();
      toast.success('Team created successfully');
    } catch (error) {
      console.error('Error creating team:', error);
      toast.error('Failed to create team');
    }
  };

  const handleAddMember = async (teamId: string) => {
    if (!newMember) {
      toast.error('Please enter a member email');
      return;
    }

    try {
      await teamsService.addMember(teamId, newMember);
      setNewMember('');
      await loadData();
      toast.success('Member added successfully');
    } catch (error) {
      console.error('Error adding member:', error);
      toast.error('Failed to add member');
    }
  };

  const assignLeadToMember = async (leadId: string, memberEmail: string) => {
    try {
      await leadsService.assignLead(leadId, memberEmail, user?.email || '', 'bda');
      await loadData();
      toast.success(`Lead assigned to ${memberEmail}`);
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast.error('Failed to assign lead');
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Team Leader Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Team Leader Dashboard">
      <DailySalesWhiteboard />
      
      {/* Team Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Teams ({teams.length})
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>Set up a new team and add members</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="teamName">Team Name</Label>
                      <Input
                        id="teamName"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                        placeholder="e.g., Sales Team Alpha"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teamDescription">Description</Label>
                      <Input
                        id="teamDescription"
                        value={newTeam.description}
                        onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                        placeholder="Team description"
                      />
                    </div>
                    <Button onClick={handleCreateTeam} className="w-full">
                      Create Team
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teams.map((team: any) => (
                <div key={team.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{team.name}</h3>
                    <Badge variant="outline">{team.members?.length || 0} members</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add member email"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      className="text-sm"
                    />
                    <Button size="sm" onClick={() => handleAddMember(team.id)}>
                      <UserPlus className="h-3 w-3" />
                    </Button>
                  </div>
                  {team.members && team.members.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {team.members.map((member: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {member}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {teams.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No teams created yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lead Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Lead Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.map((lead: any) => (
                <div key={lead.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">{lead.name}</h3>
                      <p className="text-xs text-gray-600">{lead.contact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-xs">{lead.status}</Badge>
                      {teams.length > 0 && teams[0].members && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => assignLeadToMember(lead.id, teams[0].members[0])}
                        >
                          Assign
                        </Button>
                      )}
                    </div>
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
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{teams.length}</div>
              <div className="text-sm text-gray-600">Active Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {teams.reduce((acc, team) => acc + (team.members?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{leads.length}</div>
              <div className="text-sm text-gray-600">Assigned Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {leads.filter(l => l.status === 'bought').length}
              </div>
              <div className="text-sm text-gray-600">Conversions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TeamLeaderDashboard;
