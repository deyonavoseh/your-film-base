import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
};

export const Skeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-700 h-96 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

export default Loader;