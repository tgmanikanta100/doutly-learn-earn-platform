
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target, Users, DollarSign, Calendar } from 'lucide-react';
import { analyticsService } from '@/services/firebaseService';
import { useAuth } from '@/contexts/AuthContext';

const DailySalesWhiteboard = () => {
  const { user, userRole } = useAuth();
  const [salesData, setSalesData] = useState({
    totalLeads: 0,
    newLeads: 0,
    interestedLeads: 0,
    boughtLeads: 0,
    conversionRate: '0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSalesData();
  }, [user, userRole]);

  const loadSalesData = async () => {
    if (!user || !userRole) return;
    
    try {
      const data = await analyticsService.getDailySalesData(user.email!, userRole);
      setSalesData(data);
    } catch (error) {
      console.error('Error loading sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Daily Sales Whiteboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const metrics = [
    {
      title: "Total Leads",
      value: salesData.totalLeads,
      icon: Users,
      color: "text-blue-200"
    },
    {
      title: "New Today",
      value: salesData.newLeads,
      icon: Target,
      color: "text-green-200"
    },
    {
      title: "Interested",
      value: salesData.interestedLeads,
      icon: Calendar,
      color: "text-yellow-200"
    },
    {
      title: "Converted",
      value: salesData.boughtLeads,
      icon: DollarSign,
      color: "text-green-200"
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Daily Sales Whiteboard - {new Date().toLocaleDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <metric.icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm opacity-90">{metric.title}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{salesData.conversionRate}%</div>
          <div className="text-sm opacity-90">Conversion Rate</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySalesWhiteboard;
