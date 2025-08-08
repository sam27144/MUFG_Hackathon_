import React, { useState } from 'react';
import { ChevronRight, Target, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { UserProfile } from '../App';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 30,
    retirementAge: 65,
    currentSuper: 50000,
    monthlyContribution: 500,
    riskTolerance: 'balanced' as const,
    financialGoals: [] as string[],
  });

  const goalOptions = [
    'Maximize retirement savings',
    'Generate steady income',
    'Leave an inheritance',
    'Buy property before retirement',
    'Early retirement',
    'Travel and lifestyle goals'
  ];

  const riskOptions = [
    { value: 'conservative', label: 'Conservative', desc: 'Steady growth, lower risk' },
    { value: 'balanced', label: 'Balanced', desc: 'Mix of growth and stability' },
    { value: 'growth', label: 'Growth', desc: 'Higher potential returns' },
    { value: 'aggressive', label: 'Aggressive', desc: 'Maximum growth potential' },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({
        ...formData,
        completed: true
      });
    }
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      financialGoals: prev.financialGoals.includes(goal)
        ? prev.financialGoals.filter(g => g !== goal)
        : [...prev.financialGoals, goal]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's get to know you</h2>
              <p className="text-slate-600">Tell us about yourself to personalize your investment advice</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Planned Retirement Age</label>
                <input
                  type="number"
                  value={formData.retirementAge}
                  onChange={(e) => setFormData(prev => ({ ...prev, retirementAge: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years to Retirement</label>
                <input
                  type="number"
                  value={formData.retirementAge - formData.age}
                  disabled
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Financial Situation</h2>
              <p className="text-slate-600">Help us understand your current superannuation position</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Superannuation Balance</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={formData.currentSuper}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentSuper: parseInt(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyContribution}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyContribution: parseInt(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Projected Retirement Balance</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${Math.round(formData.currentSuper + (formData.monthlyContribution * 12 * (formData.retirementAge - formData.age) * 1.07)).toLocaleString()}
              </p>
              <p className="text-sm text-slate-600 mt-1">Based on 7% average annual return</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Risk Tolerance</h2>
              <p className="text-slate-600">Choose your investment approach based on your comfort with market volatility</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {riskOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData(prev => ({ ...prev, riskTolerance: option.value as any }))}
                  className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.riskTolerance === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <h3 className="font-semibold text-slate-900 mb-2">{option.label}</h3>
                  <p className="text-slate-600">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Financial Goals</h2>
              <p className="text-slate-600">Select all goals that align with your retirement vision</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.financialGoals.includes(goal)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="font-medium text-slate-900">{goal}</span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-600">Step {step} of 4</span>
            <span className="text-sm font-medium text-slate-600">{Math.round((step / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200"
              >
                Previous
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.name}
              className="ml-auto flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
            >
              <span>{step === 4 ? 'Complete Setup' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};