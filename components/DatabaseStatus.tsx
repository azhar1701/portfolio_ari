import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DatabaseStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const useSupabase = import.meta.env.VITE_USE_SUPABASE === 'true';

  useEffect(() => {
    const checkConnection = async () => {
      if (!useSupabase) {
        setStatus('disconnected');
        return;
      }

      try {
        const { error } = await supabase.from('profiles').select('id').limit(1);
        setStatus(error ? 'disconnected' : 'connected');
      } catch {
        setStatus('disconnected');
      }
    };

    checkConnection();
  }, [useSupabase]);

  if (!useSupabase) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        <span className="text-gray-600">Local Storage</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${
        status === 'checking' ? 'bg-yellow-400 animate-pulse' :
        status === 'connected' ? 'bg-green-400' : 'bg-red-400'
      }`}></div>
      <span className={`${
        status === 'connected' ? 'text-green-600' : 
        status === 'disconnected' ? 'text-red-600' : 'text-yellow-600'
      }`}>
        {status === 'checking' ? 'Checking...' :
         status === 'connected' ? 'Supabase Connected' : 'Supabase Disconnected'}
      </span>
    </div>
  );
};

export default DatabaseStatus;