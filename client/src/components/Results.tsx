import { useLocation, useNavigate } from 'react-router-dom';
import { AnalysisResult } from '../types';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as AnalysisResult;

  if (!result) {
    navigate('/');
    return null;
  }

  const handleShare = async () => {
    const shareText = `I just got my Screen Time Reality Check. The results were... eye-opening. Check yours at: ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Reality Check
          </h1>
          <p className="text-gray-300">
            Here's what your screen time data revealed
          </p>
        </div>

        {/* The Big Number */}
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border-2 border-red-500/30">
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-bold text-white mb-4">
              {result.bigNumber.yearlyDays}
            </div>
            <div className="text-2xl md:text-3xl text-white mb-4">
              days per year on your phone
            </div>
            <div className="text-xl text-gray-200 space-y-2">
              <p>That's {result.bigNumber.percentOfWakingLife}% of your waking life.</p>
              <p>{result.bigNumber.comparisonToWork}</p>
            </div>
          </div>
        </div>

        {/* Translation to Life */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            What you did this month
          </h2>
          <div className="space-y-4">
            {result.translation.map((item, index) => (
              <div key={index} className="flex justify-between items-start p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-bold">{item.app}</div>
                  <div className="text-gray-400 text-sm">{item.hours} hours</div>
                </div>
                <div className="text-purple-300 text-right text-sm">
                  {item.equivalent}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Gut Punch */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border-2 border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            Here's the hard truth
          </h2>
          <p className="text-white text-lg leading-relaxed whitespace-pre-line">
            {result.gutPunch}
          </p>
        </div>

        {/* Pattern Recognition */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            🔍 Patterns we noticed
          </h2>
          <ul className="space-y-3">
            {result.patterns.map((pattern, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-purple-400 flex-shrink-0">•</span>
                <span className="text-gray-200">{pattern}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunity Cost */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            What you could do instead
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-purple-400 font-bold mb-1">In 1 month</div>
              <div className="text-white">{result.opportunityCost.oneMonth}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-purple-400 font-bold mb-1">In 3 months</div>
              <div className="text-white">{result.opportunityCost.threeMonths}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-purple-400 font-bold mb-1">In 6 months</div>
              <div className="text-white">{result.opportunityCost.sixMonths}</div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg">
              <div className="text-purple-400 font-bold mb-1">In 1 year</div>
              <div className="text-white">{result.opportunityCost.oneYear}</div>
            </div>
          </div>
        </div>

        {/* Reclaim Plan */}
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border-2 border-green-500/30">
          <h2 className="text-2xl font-bold text-white mb-6">
            Your Reclaim Plan
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <div className="text-green-400 font-bold">Quick Win (This Week)</div>
              </div>
              <p className="text-white ml-8">{result.reclaimPlan.quickWin}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚀</span>
                <div className="text-green-400 font-bold">High-Impact (This Month)</div>
              </div>
              <p className="text-white ml-8">{result.reclaimPlan.highImpact}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏆</span>
                <div className="text-green-400 font-bold">Long-term Reset (This Quarter)</div>
              </div>
              <p className="text-white ml-8">{result.reclaimPlan.longTerm}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-lg transition-all"
          >
            Share Your Results
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-6 rounded-lg transition-all"
          >
            Start Over
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>This assessment is for awareness, not judgment.</p>
          <p>You're in control of what you do with this information.</p>
        </div>
      </div>
    </div>
  );
}
