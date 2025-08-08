import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { OnboardingFlow } from './components/OnboardingFlow';
import { EducationCenter } from './components/EducationCenter';

export type UserProfile = {
  name: string;
  age: number;
  retirementAge: number;
  currentSuper: number;
  monthlyContribution: number;
  riskTolerance: 'conservative' | 'balanced' | 'growth' | 'aggressive';
  financialGoals: string[];
  completed: boolean;
};

function App() {
  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'chat' | 'education'>('onboarding');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'chat':
        return <ChatInterface userProfile={userProfile} />;
      case 'education':
        return <EducationCenter />;
      default:
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        userProfile={userProfile}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;