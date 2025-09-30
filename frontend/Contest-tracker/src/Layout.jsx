import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#121826] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      
      <main className="flex-grow px-4 py-8">
        <Outlet /> {/* This renders the matched child route component */}
      </main>
      
      <Footer />
    </div>
  );
};
export default Layout;