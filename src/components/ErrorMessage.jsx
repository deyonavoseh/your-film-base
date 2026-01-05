import React from 'react';
import { Film } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Film className="w-16 h-16 text-gray-500 mb-4" />
      <p className="text-gray-400 text-lg text-center">{message}</p>
    </div>
  );
};

export default ErrorMessage;