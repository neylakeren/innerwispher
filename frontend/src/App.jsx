function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Neyla Web Platform</h1>
        <p className="text-slate-600 mb-6">Laravel 12 API + React SPA is being built.</p>
        <div className="flex justify-center space-x-4">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">React JSX</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Tailwind v3</span>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Vite</span>
        </div>
      </div>
    </div>
  )
}

export default App
