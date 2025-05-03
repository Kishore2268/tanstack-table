import React from 'react';
import UserTable from './components/UserTable';

/**
 * App Component
 * Main component that renders the UserTable component
 */
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-1 py-6">
        {/* UserTable component */}
        <UserTable />
      </div>
    </div>
  );
}

export default App;
