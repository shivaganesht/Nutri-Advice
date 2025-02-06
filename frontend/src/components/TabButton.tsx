export default function TabButton({ isActive, onClick, children }) {
    return (
      <button
        className={`flex-1 text-center py-3 px-4 text-sm font-medium ${
          isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
  
  