import React from 'react';
import { SignalIcon, WifiIcon, BatteryIcon } from './Icons';

const StatusBar: React.FC = () => {
  return (
    <div className="bg-gray-100 px-4 pt-3 pb-2 flex justify-between items-center text-xs font-semibold text-gray-900">
      <span className="w-12 text-left font-bold">9:41</span>
      <div className="flex items-center space-x-1">
        <SignalIcon className="w-4 h-4" />
        <WifiIcon className="w-4 h-4" />
        <BatteryIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default StatusBar;
