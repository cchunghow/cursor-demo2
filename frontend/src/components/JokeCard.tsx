import React from 'react';

interface JokeCardProps {
  id: string;
  setup: string;
  punchline: string;
  category: string;
  onLike?: () => void;
  onShare?: () => void;
}

const JokeCard: React.FC<JokeCardProps> = ({ id, setup, punchline, category, onLike, onShare }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {category}
          </div>
          <div className="text-xs text-gray-500">
            ID: {id}
          </div>
        </div>
        <p className="mt-2 text-gray-600 text-lg mb-4">{setup}</p>
        <p className="mt-2 text-gray-800 text-xl font-medium">{punchline}</p>
      </div>
    </div>
  );
};

export default JokeCard; 