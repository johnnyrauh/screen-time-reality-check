import { useState, useEffect } from 'react';

export default function LoadingStep() {
  const messages = [
    "Analyzing your screen time patterns...",
    "Calculating opportunity costs...",
    "Generating your personalized report...",
    "This might be uncomfortable. That's the point.",
    "Almost there... preparing your reality check..."
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-block relative">
            <div className="w-24 h-24 border-8 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-4xl">
              📱
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 h-16 flex items-center justify-center">
          {messages[currentMessage]}
        </h2>

        <div className="flex gap-2 justify-center">
          {messages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentMessage ? 'bg-purple-500 w-8' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
