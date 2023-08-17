import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      {year} All rights reserved &copy; <a href="https://www.linkedin.com/in/1gabrielcarrizo/" target='_blank'>Gabriel</a>
    </footer>
  )
}

export default Footer