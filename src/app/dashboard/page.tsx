import SessionQuickStart from '@/components/dashboard/SessionQuickStart';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-4">
        <div className="container mx-auto h-16 flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-full"></div>
            <span className="text-slate-800 font-semibold text-lg">FOBOS</span>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Let's Start Your Session
          </h1>
          <SessionQuickStart />
        </div>
      </main>
    </div>
  );
}
