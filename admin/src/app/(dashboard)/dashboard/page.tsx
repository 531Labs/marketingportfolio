'use client';

import { useState, useEffect } from 'react';
import {
  FolderIcon,
  UserIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalProjects: number;
  totalUsers: number;
  totalMessages: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalUsers: 0,
    totalMessages: 0,
  });

  useEffect(() => {
    // TODO: Fetch actual stats from the API
    setStats({
      totalProjects: 12,
      totalUsers: 3,
      totalMessages: 25,
    });
  }, []);

  const statsItems = [
    {
      name: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: UserIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Total Messages',
      value: stats.totalMessages,
      icon: EnvelopeIcon,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statsItems.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className={`absolute rounded-md ${item.color} p-3`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
} 