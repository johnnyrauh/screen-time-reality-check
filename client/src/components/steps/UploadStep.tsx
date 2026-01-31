import { useState } from 'react';
import { ScreenTimeData } from '../../types';

interface UploadStepProps {
  onNext: () => void;
  onDataExtracted: (data: ScreenTimeData) => void;
}

export default function UploadStep({ onNext, onDataExtracted }: UploadStepProps) {
  const [uploading, setUploading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('screenshot', file);

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('OCR failed');

      const data = await response.json();
      onDataExtracted(data);
      onNext();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Could not process screenshot. Please try again or enter data manually.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        First, let's see what we're working with
      </h2>
      <p className="text-gray-300 mb-2">
        Upload a screenshot of your <strong className="text-purple-300">weekly</strong> Screen Time (not daily)
      </p>
      <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-3 mb-8 text-sm text-purple-200">
        💡 <strong>Important:</strong> Make sure "Week" is selected at the top when you take your screenshot. Weekly view gives us way more accurate data than daily.
      </div>

      <div className="mb-6">
        <label 
          htmlFor="screenshot-upload"
          className={`
            block w-full p-12 border-4 border-dashed rounded-xl cursor-pointer
            transition-all
            ${uploading 
              ? 'border-purple-500 bg-purple-500/20' 
              : 'border-gray-500 hover:border-purple-400 bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <div className="text-6xl mb-4">📱</div>
          <div className="text-white font-bold text-lg mb-2">
            {uploading ? 'Processing...' : 'Click to upload screenshot'}
          </div>
          <div className="text-gray-400 text-sm">
            or drag and drop
          </div>
        </label>
        <input
          id="screenshot-upload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="hidden"
        />
      </div>

      <button
        onClick={() => setShowInstructions(!showInstructions)}
        className="text-purple-400 hover:text-purple-300 text-sm underline mb-4"
      >
        {showInstructions ? 'Hide' : 'Show'} instructions
      </button>

      {showInstructions && (
        <div className="bg-white/5 rounded-lg p-6 text-left space-y-4">
          <div>
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">📱</span>
              iOS (iPhone)
            </h4>
            <ol className="text-gray-300 text-sm space-y-1 ml-8 list-decimal">
              <li>Open Settings</li>
              <li>Tap "Screen Time"</li>
              <li>Tap "See All Activity"</li>
              <li><strong className="text-purple-300">Make sure "Week" is selected at the top</strong> (not "Day")</li>
              <li>Scroll to show your top apps</li>
              <li>Take a screenshot (Volume Up + Power Button)</li>
            </ol>
          </div>

          <div>
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Android
            </h4>
            <ol className="text-gray-300 text-sm space-y-1 ml-8 list-decimal">
              <li>Open Settings</li>
              <li>Tap "Digital Wellbeing & parental controls"</li>
              <li>Tap on the graph to see details</li>
              <li>Take a screenshot (Power + Volume Down)</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-gray-500">
        Your data stays private. We don't store screenshots.
      </div>
    </div>
  );
}
