import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, realEstate: 0, automotive: 0, pending: 0, projects: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: users },
        { count: realEstate },
        { count: automotive },
        { count: pending },
        { count: projects }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('listings').select('*', { count: 'exact', head: true }).eq('listing_type', 'real_estate'),
        supabase.from('listings').select('*', { count: 'exact', head: true }).eq('listing_type', 'vehicle'),
        supabase.from('listings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('projects').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        users: users || 0,
        realEstate: realEstate || 0,
        automotive: automotive || 0,
        pending: pending || 0,
        projects: projects || 0
      });
    };

    fetchStats();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 mb-2 font-medium">Toplam Kullanıcı</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 mb-2 font-medium">Emlak İlanı</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.realEstate}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 mb-2 font-medium">Otomotiv İlanı</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.automotive}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-200 bg-orange-50">
          <h3 className="text-orange-600 mb-2 font-medium">Bekleyen İlan</h3>
          <p className="text-3xl font-bold text-orange-700">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 mb-2 font-medium">İnşaat Projesi</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.projects}</p>
        </div>
      </div>
    </>
  );
}
