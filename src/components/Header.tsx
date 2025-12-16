import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'

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
            <span className="skew-x-10 flex items-center gap-2">
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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header menu */}
        <div className="flex items-center justify-between p-6 border-b">
          <span className="font-black text-lg text-red-600">MENU</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-900 hover:text-red-600 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <div className="p-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-slate-800 hover:text-red-600 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <a
            href="tel:3473020924"
            className="flex items-center w-fit gap-2 px-5 py-2.5 bg-red-600 hover:bg-slate-900 text-white font-bold rounded-none skew-x-[-10deg] transition-all transform hover:scale-105"
          >
            <span className="skew-x-10 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              CHIAMA
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
