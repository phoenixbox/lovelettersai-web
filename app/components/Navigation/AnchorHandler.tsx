import { useEffect } from 'react'

const AnchorHandler = () => {
  useEffect(() => {
    // Function to handle the fragment navigation
    const handleFragmentNavigation = () => {
      const hash = window.location.hash
      if (hash) {
        // Remove the '#' from the hash
        const id = hash.substring(1)
        const element = document.getElementById(id)

        if (element) {
          // Wait a brief moment to ensure the page is fully loaded
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }, 100)
        }
      }
    }

    // Handle initial load
    handleFragmentNavigation()

    // Listen for hash changes
    window.addEventListener('hashchange', handleFragmentNavigation)

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleFragmentNavigation)
    }
  }, [])

  return null
}

export default AnchorHandler
