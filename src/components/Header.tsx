import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'HOME', href: '#top' },
    { label: 'CHI SIAMO', href: '#chi-siamo' },
    { label: 'SERVIZI', href: '#servizi' },
    { label: 'ABBONAMENTI', href: '#abbonamenti' },
    { label: 'CONTATTI', href: '#contatti' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-3xl font-black italic tracking-tighter text-slate-900 group-hover:text-red-600 transition-colors">
            WOLF
            <span className="text-red-600 group-hover:text-slate-900 transition-colors">
              GYM
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-slate-800 hover:text-red-600 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:3473020924"
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-slate-900 text-white font-bold rounded-none skew-x-[-10deg] transition-all transform hover:scale-105"
          >
            <span className="skew-x-[10deg] flex items-center gap-2">
              <Phone className="w-4 h-4" />
              347 302 0924
            </span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-900 hover:text-red-600 transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-slate-800 hover:text-red-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:3473020924"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white font-bold"
          >
            <Phone className="w-4 h-4" />
            CHIAMA ORA
          </a>
        </div>
      )}
    </header>
  )
}
