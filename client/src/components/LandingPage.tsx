import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          You don't have a time problem.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            You have a time awareness problem.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Find out what you're really doing with your phone—and what it's costing you.
        </p>

        <button
          onClick={() => navigate('/assess')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-xl transition-all transform hover:scale-105 shadow-2xl"
        >
          Get Your Reality Check
        </button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-white font-bold text-lg mb-2">Upload Screenshot</h3>
            <p className="text-gray-300 text-sm">
              One screenshot of your Screen Time. No apps to install.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-white font-bold text-lg mb-2">AI Analysis</h3>
            <p className="text-gray-300 text-sm">
              Claude AI analyzes your patterns and creates a personalized reality check.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-white font-bold text-lg mb-2">Get Your Plan</h3>
            <p className="text-gray-300 text-sm">
              Personalized action steps to reclaim your time. No judgment, just honesty.
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-12">
          Your data stays private. We don't store screenshots or personal information.
        </p>
      </div>
    </div>
  );
}
