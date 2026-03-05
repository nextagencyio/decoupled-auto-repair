export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-amber-900 font-display uppercase tracking-wide">Loading Apex Auto Works...</p>
      </div>
    </div>
  )
}
