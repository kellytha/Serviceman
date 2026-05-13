'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Settings, LogOut, CheckCircle, Clock, DollarSign, Star, MapPin, Phone } from 'lucide-react';

interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  role: 'CUSTOMER' | 'ARTISAN';
  nin?: string;
  isVerified: boolean;
}

interface Job {
  id: string;
  customerName: string;
  service: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  amount: number;
  location: string;
}

export default function ArtisanDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [earnings, setEarnings] = useState({ total: 0, thisMonth: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        if (userData.role !== 'ARTISAN') {
          router.push('/dashboard/customer');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboardData = async () => {
    // Load jobs, earnings, etc.
    // This would typically fetch from your API
    // Mock data for now
    setActiveJobs([
      {
        id: '1',
        customerName: 'John Doe',
        service: 'Plumbing Repair',
        status: 'in-progress',
        date: '2024-01-15',
        amount: 5000,
        location: 'Lagos, Nigeria'
      }
    ]);

    setCompletedJobs([
      {
        id: '2',
        customerName: 'Jane Smith',
        service: 'Electrical Installation',
        status: 'completed',
        date: '2024-01-10',
        amount: 8000,
        location: 'Abuja, Nigeria'
      }
    ]);

    setEarnings({
      total: 45000,
      thisMonth: 13000,
      pending: 2000
    });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ServiceMan</h1>
              <span className="ml-4 text-sm text-gray-600">Artisan Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                {user?.isVerified && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Verification Status */}
            {!user?.isVerified && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-yellow-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Verification Required
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Complete your NIN verification to start accepting jobs and build trust with customers.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
                        Verify NIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Jobs</h2>
              <div className="space-y-4">
                {activeJobs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No active jobs</p>
                ) : (
                  activeJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{job.service}</h4>
                          <p className="text-sm text-gray-600">Customer: {job.customerName}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500">{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-500">{job.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₦{job.amount.toLocaleString()}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {job.status}
                          </span>
                          <div className="mt-2 space-x-2">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              Update Status
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Job History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job History</h2>
              <div className="space-y-4">
                {completedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{job.service}</h4>
                        <p className="text-sm text-gray-600">Customer: {job.customerName}</p>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{job.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">₦{job.amount.toLocaleString()}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Earnings Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Earnings</span>
                  <span className="text-lg font-semibold text-gray-900">₦{earnings.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-lg font-semibold text-green-600">₦{earnings.thisMonth.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Payment</span>
                  <span className="text-lg font-semibold text-yellow-600">₦{earnings.pending.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone</span>
                  <span className="text-sm font-medium text-gray-900">{user?.phoneNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification</span>
                  <span className={`text-sm font-medium ${user?.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">4.8</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  Update Availability
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  Manage Skills
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  View Reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}