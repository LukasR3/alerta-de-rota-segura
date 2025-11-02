
import React from 'react';
import { MapIcon, BellIcon } from './Icons';

type View = 'map' | 'notifications';

interface BottomNavProps {
  activeView: View;
  onNavClick: (view: View) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ease-in-out focus:outline-none ${
        isActive ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'
      }`}
    >
      {icon}
      <span className="text-xs font-medium mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onNavClick }) => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-lg sticky bottom-0 z-10">
      <div className="container mx-auto flex justify-around">
        <NavItem
          label="Mapa"
          icon={<MapIcon className="w-6 h-6" />}
          isActive={activeView === 'map'}
          onClick={() => onNavClick('map')}
        />
        <NavItem
          label="Alertas"
          icon={<BellIcon className="w-6 h-6" />}
          isActive={activeView === 'notifications'}
          onClick={() => onNavClick('notifications')}
        />
      </div>
    </footer>
  );
};

export default BottomNav;
