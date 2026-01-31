import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadStep from './steps/UploadStep';
import VerifyStep from './steps/VerifyStep';
import DreamStep from './steps/DreamStep';
import WorkContextStep from './steps/WorkContextStep';
import RegretStep from './steps/RegretStep';
import PatternStep from './steps/PatternStep';
import RelationshipStep from './steps/RelationshipStep';
import StakesStep from './steps/StakesStep';
import LoadingStep from './steps/LoadingStep';
import { ScreenTimeData } from '../types';

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState({
    screenTimeData: null as ScreenTimeData | null,
    dreamGoal: '',
    workHours: '',
    role: '',
    regretApp: '',
    regretReason: '',
    wantTimeBack: [] as string[],
    phoneRelationship: '',
    changeSeriousness: '',
    successDefinition: '',
  });

  const totalSteps = 8;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const result = await response.json();
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error('Error analyzing data:', error);
      alert('Something went wrong. Please try again.');
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <LoadingStep />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          {currentStep === 1 && (
            <UploadStep 
              onNext={nextStep}
              onDataExtracted={(data) => updateFormData('screenTimeData', data)}
            />
          )}
          {currentStep === 2 && formData.screenTimeData && (
            <VerifyStep 
              data={formData.screenTimeData}
              onNext={nextStep}
              onBack={prevStep}
              onUpdate={(data) => updateFormData('screenTimeData', data)}
            />
          )}
          {currentStep === 3 && (
            <DreamStep 
              value={formData.dreamGoal}
              onChange={(value) => updateFormData('dreamGoal', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <WorkContextStep 
              workHours={formData.workHours}
              role={formData.role}
              onWorkHoursChange={(value) => updateFormData('workHours', value)}
              onRoleChange={(value) => updateFormData('role', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 5 && (
            <RegretStep 
              regretApp={formData.regretApp}
              regretReason={formData.regretReason}
              onRegretAppChange={(value) => updateFormData('regretApp', value)}
              onRegretReasonChange={(value) => updateFormData('regretReason', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 6 && (
            <PatternStep 
              selectedPatterns={formData.wantTimeBack}
              onChange={(value) => updateFormData('wantTimeBack', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 7 && (
            <RelationshipStep 
              value={formData.phoneRelationship}
              onChange={(value) => updateFormData('phoneRelationship', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 8 && (
            <StakesStep 
              changeSeriousness={formData.changeSeriousness}
              successDefinition={formData.successDefinition}
              onChangeChange={(value) => updateFormData('changeSeriousness', value)}
              onSuccessChange={(value) => updateFormData('successDefinition', value)}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
