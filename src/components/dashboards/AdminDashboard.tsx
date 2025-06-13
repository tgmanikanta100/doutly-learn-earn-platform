
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, Settings, Bell, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeLeads: 89,
    resolvedDoubts: 432,
    conversionRate: 23.5
  });

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

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                View All Users
              </Button>
              <Button className="w-full" variant="outline">
                Create New User
              </Button>
              <Button className="w-full" variant="outline">
                Bulk Import Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Lead Assignment
              </CardTitle>
              <CardDescription>
                Assign leads to vertical heads and track progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                View All Leads
              </Button>
              <Button className="w-full" variant="outline">
                Assign Leads
              </Button>
              <Button className="w-full" variant="outline">
                Lead Analytics
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
