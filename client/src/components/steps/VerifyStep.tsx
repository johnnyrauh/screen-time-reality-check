import { useState } from 'react';
import { ScreenTimeData, AppUsage } from '../../types';

interface VerifyStepProps {
  data: ScreenTimeData;
  onNext: () => void;
  onBack: () => void;
  onUpdate: (data: ScreenTimeData) => void;
}

export default function VerifyStep({ data, onNext, onBack, onUpdate }: VerifyStepProps) {
  const [editedData, setEditedData] = useState<ScreenTimeData>(data);
  const [isEditing, setIsEditing] = useState(false);

  const handleAppChange = (index: number, field: keyof AppUsage, value: string | number) => {
    const newApps = [...editedData.topApps];
    newApps[index] = { ...newApps[index], [field]: value };
    setEditedData({ ...editedData, topApps: newApps });
  };

  const handleConfirm = () => {
    onUpdate(editedData);
    onNext();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Does this look right?
      </h2>
      <p className="text-gray-300 mb-8">
        We extracted this from your screenshot. Fix anything that's off.
      </p>

      <div className="space-y-6">
        {/* Daily Average */}
        <div className="bg-white/5 rounded-lg p-4">
          <label className="block text-gray-400 text-sm mb-2">Daily Average</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              value={editedData.dailyAverage}
              onChange={(e) => setEditedData({ ...editedData, dailyAverage: parseFloat(e.target.value) })}
              className="bg-white/10 text-white px-4 py-2 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={!isEditing}
            />
            <span className="text-white">hours/day</span>
          </div>
        </div>

        {/* Top Apps */}
        <div className="bg-white/5 rounded-lg p-4">
          <label className="block text-gray-400 text-sm mb-4">Top Apps</label>
          <div className="space-y-3">
            {editedData.topApps.map((app, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={app.name}
                  onChange={(e) => handleAppChange(index, 'name', e.target.value)}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!isEditing}
                  placeholder="App name"
                />
                <input
                  type="number"
                  step="0.1"
                  value={app.hours}
                  onChange={(e) => handleAppChange(index, 'hours', parseFloat(e.target.value))}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!isEditing}
                />
                <span className="text-white text-sm">hrs/day</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Toggle */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          {isEditing ? '✓ Done editing' : '✏️ Edit values'}
        </button>

        {/* Navigation */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onBack}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Looks good
          </button>
        </div>
      </div>
    </div>
  );
}
