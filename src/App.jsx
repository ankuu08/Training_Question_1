import React, { useState } from 'react';
import { CameraDetection } from './components/CameraDetection';
import { useObjectDetection } from './hooks/useObjectDetection';

function App() {
  const [predictions, setPredictions] = useState(null);
  const { detectObjects, loading } = useObjectDetection();

  const handleFrame = async (frame) => {
    const results = await detectObjects(frame);
    if (results && results.length > 0) {
      setPredictions(results);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Real-time Object Detection</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-lg">Loading object detection model...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <CameraDetection onFrame={handleFrame} />
            </div>
            
            {predictions && predictions.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-3">Detected Objects</h2>
                <ul className="space-y-2">
                  {predictions.map((pred, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="font-medium">
                        {pred.class} ({Math.round(pred.score * 100)}%)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;