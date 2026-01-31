interface RelationshipStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RelationshipStep({ value, onChange, onNext, onBack }: RelationshipStepProps) {
  const canContinue = value !== '';

  const relationshipOptions = [
    { value: 'tool', label: 'A tool I control', icon: '🔧' },
    { value: 'habit', label: "A habit I don't think about", icon: '🔄' },
    { value: 'crutch', label: "A crutch when I'm uncomfortable", icon: '🩹' },
    { value: 'addiction', label: "An addiction I'm aware of", icon: '⚠️' },
    { value: 'lifeline', label: 'My lifeline to everything important', icon: '🔗' },
    { value: 'unsure', label: "Honestly? I'm not sure anymore", icon: '🤷' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Finish this sentence: My phone is...
      </h2>
      <p className="text-gray-300 mb-8">
        Be honest with yourself
      </p>

      <div className="space-y-2 mb-6">
        {relationshipOptions.map((option) => (
          <label
            key={option.value}
            className={`
              block p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3
              ${value === option.value 
                ? 'bg-purple-500/30 border-2 border-purple-400' 
                : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }
            `}
          >
            <input
              type="radio"
              name="relationship"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <span className="text-2xl">{option.icon}</span>
            <span className="text-white">{option.label}</span>
          </label>
        ))}
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
