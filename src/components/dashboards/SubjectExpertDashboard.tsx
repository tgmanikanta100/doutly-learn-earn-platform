
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SubjectExpertDashboard = () => {
  const { user } = useAuth();
  const [expertise, setExpertise] = useState(['Mathematics', 'Physics', 'Computer Science']);
  const [studentsHelped, setStudentsHelped] = useState(45);
  const [rating, setRating] = useState(4.8);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subject Expert Dashboard</h1>
          <p className="text-gray-600 mt-2">Share your expertise and help students - {user?.email?.split('.')[0]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Helped</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentsHelped}</div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expertise Areas</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expertise.length}</div>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Award className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rating}</div>
              <p className="text-xs text-green-600">Excellent feedback</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Expertise</CardTitle>
            <CardDescription>Subjects you can help students with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {expertise.map((subject, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {subject}
                </span>
              ))}
            </div>
            <Button>Add New Subject</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubjectExpertDashboard;
