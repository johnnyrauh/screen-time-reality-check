interface StakesStepProps {
  changeSeriousness: string;
  successDefinition: string;
  onChangeChange: (value: string) => void;
  onSuccessChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StakesStep({ 
  changeSeriousness, 
  successDefinition, 
  onChangeChange, 
  onSuccessChange, 
  onNext, 
  onBack 
}: StakesStepProps) {
  const canContinue = changeSeriousness !== '' && successDefinition.trim() !== '';

  const seriousnessOptions = [
    { value: 'serious', label: "It's a serious problem I want to fix", icon: '🚨' },
    { value: 'moderate', label: "I'd like to cut back but it's not urgent", icon: '⚡' },
    { value: 'curious', label: "I'm curious but mostly fine with it", icon: '🔍' },
    { value: 'data', label: "I'm here for the data, not judgment", icon: '📊' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Last question: How do you feel about your current phone usage?
      </h2>
      <p className="text-gray-300 mb-8">
        This helps us match the tone to where you're at
      </p>

      <div className="space-y-6">
        {/* Seriousness */}
        <div>
          <div className="space-y-2 mb-6">
            {seriousnessOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  block p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3
                  ${changeSeriousness === option.value 
                    ? 'bg-purple-500/30 border-2 border-purple-400' 
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="radio"
                  name="seriousness"
                  value={option.value}
                  checked={changeSeriousness === option.value}
                  onChange={(e) => onChangeChange(e.target.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{option.icon}</span>
                <span className="text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Success Definition */}
        <div>
          <label className="block text-white font-bold mb-3">
            What would "success" look like for you?
          </label>
          <input
            type="text"
            value={successDefinition}
            onChange={(e) => onSuccessChange(e.target.value)}
            placeholder='Example: "Using my phone under 3 hours/day" / "No social media after 9pm" / "Just being more aware"'
            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          />
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
          Get My Reality Check
        </button>
      </div>
    </div>
  );
}
