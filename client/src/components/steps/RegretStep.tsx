interface RegretStepProps {
  regretApp: string;
  regretReason: string;
  onRegretAppChange: (value: string) => void;
  onRegretReasonChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function RegretStep({ 
  regretApp, 
  regretReason, 
  onRegretAppChange, 
  onRegretReasonChange, 
  onNext, 
  onBack 
}: RegretStepProps) {
  const canContinue = regretApp !== '';

  const regretOptions = [
    { value: 'instagram', label: 'Instagram/Facebook', icon: '📸' },
    { value: 'tiktok', label: 'TikTok/Reels/YouTube Shorts', icon: '🎬' },
    { value: 'youtube', label: 'YouTube (long-form)', icon: '📺' },
    { value: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { value: 'reddit', label: 'Reddit', icon: '🤖' },
    { value: 'news', label: 'News apps', icon: '📰' },
    { value: 'games', label: 'Mobile games', icon: '🎮' },
    { value: 'email', label: 'Email/Slack', icon: '📧' },
    { value: 'none', label: "I don't really have regrets (okay! we'll see...)", icon: '😌' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Be honest: which app do you wish you used less?
      </h2>
      <p className="text-gray-300 mb-8">
        We won't judge. This helps us personalize your reality check.
      </p>

      <div className="space-y-2 mb-6">
        {regretOptions.map((option) => (
          <label
            key={option.value}
            className={`
              block p-4 rounded-lg cursor-pointer transition-all flex items-center gap-3
              ${regretApp === option.value 
                ? 'bg-purple-500/30 border-2 border-purple-400' 
                : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
              }
            `}
          >
            <input
              type="radio"
              name="regretApp"
              value={option.value}
              checked={regretApp === option.value}
              onChange={(e) => onRegretAppChange(e.target.value)}
              className="sr-only"
            />
            <span className="text-2xl">{option.icon}</span>
            <span className="text-white">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Optional reason */}
      {regretApp && regretApp !== 'none' && (
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            Why this one? (optional)
          </label>
          <input
            type="text"
            value={regretReason}
            onChange={(e) => onRegretReasonChange(e.target.value)}
            placeholder="e.g., 'It's not bad, I just lose track of time'"
            className="w-full bg-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
          />
        </div>
      )}

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
