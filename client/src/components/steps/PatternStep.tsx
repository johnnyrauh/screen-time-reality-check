interface PatternStepProps {
  selectedPatterns: string[];
  onChange: (value: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PatternStep({ selectedPatterns, onChange, onNext, onBack }: PatternStepProps) {
  const canContinue = selectedPatterns.length > 0;

  const patternOptions = [
    { value: 'morning', label: 'First thing in the morning (before I start my day)', icon: '🌅' },
    { value: 'work-hours', label: 'During work/school hours (when I should be focused)', icon: '💼' },
    { value: 'evenings', label: 'Evenings (my peak creative/family time)', icon: '🌆' },
    { value: 'bedtime', label: 'Right before bed (ruins my sleep)', icon: '😴' },
    { value: 'weekends', label: 'Weekends (when I could be doing what I love)', icon: '🎨' },
    { value: 'social', label: 'During meals or social time', icon: '🍽️' },
    { value: 'fine', label: "Honestly, I use it when I'm bored and that's fine", icon: '😌' },
  ];

  const togglePattern = (value: string) => {
    if (selectedPatterns.includes(value)) {
      onChange(selectedPatterns.filter(p => p !== value));
    } else {
      onChange([...selectedPatterns, value]);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        When do you most want your time back?
      </h2>
      <p className="text-gray-300 mb-8">
        Check all that apply
      </p>

      <div className="space-y-2 mb-6">
        {patternOptions.map((option) => {
          const isSelected = selectedPatterns.includes(option.value);
          
          return (
            <label
              key={option.value}
              className={`
                block p-4 rounded-lg cursor-pointer transition-all flex items-start gap-3
                ${isSelected 
                  ? 'bg-purple-500/30 border-2 border-purple-400' 
                  : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }
              `}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => togglePattern(option.value)}
                className="sr-only"
              />
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className={`
                    w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-400'}
                  `}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className="text-white">{option.label}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="flex gap-4">
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
