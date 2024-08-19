import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className='flex bg-violet-950 text-white justify-center px-4 h-12 items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
      <p className='text-center'>Copyright &copy; {currentYear} Get Me A Chai - All Rights Reserved</p>
    </footer>
  )
}

export default Footer