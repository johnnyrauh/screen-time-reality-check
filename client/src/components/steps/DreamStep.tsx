interface DreamStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DreamStep({ value, onChange, onNext, onBack }: DreamStepProps) {
  const canContinue = value.trim().length > 0;

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        If you had 10 extra hours this week...
      </h2>
      <p className="text-gray-300 mb-8">
        What would you do with it?
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Examples: 'Finally launch my side project' / 'Actually finish the books on my nightstand' / 'Spend real time with my kids without checking my phone'"
        className="w-full h-40 bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-none"
      />

      <div className="flex gap-4 mt-6">
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
