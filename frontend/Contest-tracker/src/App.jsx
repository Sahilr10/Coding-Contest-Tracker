import React from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className=" min-h-screen bg-[#030712] no-scrollbar overflow-y-auto">
      <Header />
      
      <main >
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
};
export default App;