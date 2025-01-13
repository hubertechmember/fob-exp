import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Public Speaking',
    icon: '🎤',
    description: 'Practice public speaking in various conference settings',
    color: 'bg-teal-100'
  },
  {
    id: 2,
    name: 'Public Places',
    icon: '🏢',
    description: 'Experience different public space scenarios',
    color: 'bg-blue-100'
  },
  {
    id: 3,
    name: 'Shopping',
    icon: '🛍️',
    description: 'Navigate shopping and queue situations',
    color: 'bg-purple-100'
  },
  {
    id: 4,
    name: 'Cinema Queue',
    icon: '🎬',
    description: 'Handle cinema queue scenarios',
    color: 'bg-orange-100'
  },
  {
    id: 5,
    name: 'Restaurant',
    icon: '🍽️',
    description: 'Practice restaurant interactions',
    color: 'bg-pink-100'
  },
  {
    id: 6,
    name: 'Bus/Coach',
    icon: '🚌',
    description: 'Experience public transportation scenarios',
    color: 'bg-green-100'
  }
];

export default function CategorySelection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Choose a scenario category to begin:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(category => (
          <Link
            key={category.id}
            href={`/session/setup?category=${category.id}`}
            className={`p-6 rounded-lg ${category.color} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
