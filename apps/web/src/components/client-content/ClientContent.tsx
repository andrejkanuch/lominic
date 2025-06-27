import React from 'react';
import DashboardContent from './DashboardContent';
import HealthMetricsContent from './HealthMetricsContent';
import VitalSignsContent from './VitalSignsContent';
import HeartRateContent from './HeartRateContent';
import ActivitiesContent from './ActivitiesContent';
import WorkoutsContent from './WorkoutsContent';
import GoalsContent from './GoalsContent';
import LocationContent from './LocationContent';
import CalendarContent from './CalendarContent';
import ProfileContent from './ProfileContent';
import SettingsContent from './SettingsContent';

interface ClientContentProps {
  activeItem: string;
}

const ClientContent: React.FC<ClientContentProps> = ({ activeItem }) => {
  switch (activeItem) {
    case '/client/dashboard':
      return <DashboardContent />;
    case '/client/health':
      return <HealthMetricsContent />;
    case '/client/vitals':
      return <VitalSignsContent />;
    case '/client/heart-rate':
      return <HeartRateContent />;
    case '/client/activities':
      return <ActivitiesContent />;
    case '/client/workouts':
      return <WorkoutsContent />;
    case '/client/goals':
      return <GoalsContent />;
    case '/client/location':
      return <LocationContent />;
    case '/client/calendar':
      return <CalendarContent />;
    case '/client/profile':
      return <ProfileContent />;
    case '/client/settings':
      return <SettingsContent />;
    default:
      return <DashboardContent />;
  }
};

export default ClientContent;
