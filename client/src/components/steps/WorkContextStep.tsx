interface WorkContextStepProps {
  workHours: string;
  role: string;
  onWorkHoursChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WorkContextStep({ 
  workHours, 
  role, 
  onWorkHoursChange, 
  onRoleChange, 
  onNext, 
  onBack 
}: WorkContextStepProps) {
  const canContinue = workHours && role;

  const workHoursOptions = [
    { value: '<20', label: 'Less than 20 hours' },
    { value: '20-40', label: '20-40 hours' },
    { value: '40-50', label: '40-50 hours' },
    { value: '50-60', label: '50-60 hours' },
    { value: '60+', label: '60+ hours' },
    { value: 'non-traditional', label: "I don't work traditional hours" },
  ];

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'ic', label: 'Individual Contributor' },
    { value: 'manager', label: 'Manager/Lead' },
    { value: 'executive', label: 'Executive' },
    { value: 'entrepreneur', label: 'Freelancer/Entrepreneur' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Quick context about your life
      </h2>
      <p className="text-gray-300 mb-8">
        This helps us put your screen time in perspective
      </p>

      <div className="space-y-6">
        {/* Work Hours */}
        <div>
          <label className="block text-white font-bold mb-3">
            How many hours do you work per week?
          </label>
          <div className="space-y-2">
            {workHoursOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  block p-4 rounded-lg cursor-pointer transition-all
                  ${workHours === option.value 
                    ? 'bg-purple-500/30 border-2 border-purple-400' 
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="workHours"
                  value={option.value}
                  checked={workHours === option.value}
                  onChange={(e) => onWorkHoursChange(e.target.value)}
                  className="sr-only"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-white font-bold mb-3">
            What's your role?
          </label>
          <div className="space-y-2">
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  block p-4 rounded-lg cursor-pointer transition-all
                  ${role === option.value 
                    ? 'bg-purple-500/30 border-2 border-purple-400' 
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={(e) => onRoleChange(e.target.value)}
                  className="sr-only"
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`
            flex-1 font-bold py-3 px-6 rounded-lg transition-all
            ${canContinue 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
