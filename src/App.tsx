import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateBlogPage from './pages/CreateBlogPage';
import BlogDetail from './components/BlogDetail';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Adjust based on your backend data

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>

          {/* ✅ Add Pagination below blog listing if needed */}
          {/* <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          /> */}
        </main>

        {/* <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-500">© 2025 Rentamigo. All rights reserved.</p>
            </div>
          </div>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
