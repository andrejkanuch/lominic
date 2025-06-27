import React from 'react'

export function ClientFooter() {
  return (
    <footer className="bg-card border-t border-border px-6 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <p className="text-foreground">
            &copy; 2024 Lominic Health Hub. Your wellness, our priority.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-pulse-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-pulse-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-pulse-600 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}
