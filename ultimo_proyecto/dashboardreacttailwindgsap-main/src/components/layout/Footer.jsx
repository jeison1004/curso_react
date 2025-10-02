import React from 'react'

const Footer = () => {
  return (
    <footer className="
      bg-white border-t border-gray-200 py-4 
      text-center text-gray-500 text-sm w-full
    ">
      © {new Date().getFullYear()} Dashboard Pro tailwindcss / React --  Ar Sistema
    </footer>
  )
}

export default Footer