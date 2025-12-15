import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  Check,
  Clock,
  Dumbbell,
  Heart,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({ component: WolfGym })

// EFFETTO WOW: Dynamic Mesh Network
function MeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Configurazione Mesh
    const points: Array<{ x: number; y: number; vx: number; vy: number }> = []
    const spacing = 100 // Distanza tra i punti della griglia di base

    const init = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      points.length = 0

      // Creiamo punti sparsi ma con una logica di base per coprire tutto lo schermo
      for (let x = -spacing; x < width + spacing; x += spacing) {
        for (let y = -spacing; y < height + spacing; y += spacing) {
          // Aggiungiamo casualità alla posizione
          points.push({
            x: x + (Math.random() - 0.5) * spacing,
            y: y + (Math.random() - 0.5) * spacing,
            vx: (Math.random() - 0.5) * 0.5, // Velocità lenta
            vy: (Math.random() - 0.5) * 0.5,
          })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Aggiorna posizioni
      points.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Reset se escono troppo
        if (p.x < -spacing * 2) p.x = width + spacing
        if (p.x > width + spacing * 2) p.x = -spacing
        if (p.y < -spacing * 2) p.y = height + spacing
        if (p.y > height + spacing * 2) p.y = -spacing
      })

      // Disegna connessioni (Triangolazione)
      points.forEach((p, i) => {
        // Connettiamo solo con i vicini nell'array per performance, o spaziale?
        // Facciamo spaziale semplice
        points.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < spacing * 1.8) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            // Colore dinamico basato sulla distanza
            const alpha = 1 - dist / (spacing * 1.8)
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha * 0.4})` // Rosso Wolf
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        })

        // Disegna punti
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(220, 38, 38)'
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    init()
    draw()

    const handleResize = () => init()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  )
}

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number
  duration?: number
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number | null = null
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  )
}

function WolfGym() {
  const stats = [
    { number: 15, suffix: '+', label: 'PROFESSIONISTI' },
    { number: 1200, suffix: '+', label: 'METRI QUADRATI' },
    { number: 80, suffix: '+', label: 'MACCHINE' },
  ]

  const services = [
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: 'SALA PESI',
      desc: '52 postazioni di lavoro Technogym, Panatta e Hammer Strength.',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'PERSONAL TRAINING',
      desc: 'Servizio one-to-one con professionisti del settore qualificati.',
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'CORSI',
      desc: 'Pilates, Total Body, MMA, GAG e funzionale.',
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: 'PREPARAZIONE',
      desc: 'Preparazione atletica per concorsi militari e sport specifici.',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'NUTRIZIONE',
      desc: 'Piani alimentari personalizzati in sinergia con l’allenamento.',
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'FISIOTERAPIA',
      desc: 'Consulenza medica, fisioterapia e posturologia in sede.',
    },
  ]

  const plans = [
    {
      name: 'MENSILE',
      price: '45€',
      period: 'AL MESE',
      features: [
        'Ingressi illimitati',
        'Sala pesi open',
        'Scheda base inclusa',
      ],
      active: false,
    },
    {
      name: 'TRIMESTRALE',
      price: '120€',
      period: 'OGNI 3 MESI',
      features: ['Risparmi il 12%', 'Sospensione 15gg', 'Ingressi illimitati'],
      active: true,
    },
    {
      name: 'ANNUALE',
      price: '400€',
      period: "ALL'ANNO",
      features: [
        'Risparmi il 26%',
        'Sospensione 90gg',
        'Kit benvenuto omaggio',
      ],
      active: false,
    },
  ]

  const reviews = [
    {
      name: 'Francesco R.',
      date: '2 settimane fa',
      text: 'Palestra top! Attrezzatura Panatta e Technogym nuova. Ambiente pulito e personale sempre disponibile. Consigliatissima!',
      rating: 5,
      avatar: 'F',
    },
    {
      name: 'Giulia M.',
      date: '1 mese fa',
      text: 'Frequento i corsi di Pilates e Total Body. Istruttori preparatissimi e simpatici. Mi sento a casa.',
      rating: 5,
      avatar: 'G',
    },
    {
      name: 'Alessandro D.',
      date: '3 giorni fa',
      text: 'Sala pesi enorme e mai troppo affollata grazie agli ampi spazi. Ottimo rapporto qualità prezzo.',
      rating: 5,
      avatar: 'A',
    },
  ]

  return (
    <div className="bg-white min-h-screen font-sans" id="top">
      {/* HERO SECTION */}
      {/* FIX: min-h-screen invece di h-screen fisso. Padding top generoso per evitare sovrapposizioni header. */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-20 md:pt-40">
        <MeshCanvas />

        {/* Background Texture Overlay opzionale per effetto 'Grain' */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          <div
            className="mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="py-2 px-6 bg-red-600 text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] skew-x-[-10deg] inline-block shadow-xl hover:scale-105 transition-transform duration-300">
              <span className="skew-x-10 block">Wolf Gym Rende</span>
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-8 leading-[0.9] tracking-tighter animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            DIVENTARE{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800 drop-shadow-sm">
              FORTE
            </span>
            <br />È UNA SCELTA
          </h1>

          <p
            className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Non è solo una palestra. È il luogo dove i tuoi limiti vengono
            distrutti. Unisciti alla community più forte di Rende.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <a
              href="#abbonamenti"
              className="px-8 py-4 bg-slate-900 text-white font-bold text-lg hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-3 group"
            >
              INIZIA OGGI{' '}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contatti"
              className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              VIENI A TROVARCI
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="bg-red-600 py-12 text-white relative z-20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="md:border-r border-red-500 last:border-0 flex flex-col items-center"
            >
              <div className="text-5xl lg:text-6xl font-black mb-2 tracking-tighter">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold tracking-[0.2em] opacity-90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION / CHI SIAMO */}
      <section id="chi-siamo" className="py-12 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 md:mb-20 uppercase tracking-tight">
            SOLO OBIETTIVI{' '}
            <span className="relative inline-block text-red-600">
              WOLF
              <span className="absolute bottom-2 left-0 w-full h-3 bg-red-100 -z-10 skew-x-[-10deg]"></span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Dumbbell size={40} />,
                title: 'Forza',
                text: "Programmi specifici per l'aumento della forza massimale e resistente, con attrezzature di livello olimpico.",
              },
              {
                icon: <Zap size={40} />,
                title: 'Velocità',
                text: 'Miglioriamo la tua performance atletica con circuiti funzionali e allenamenti ad alta intensità.',
              },
              {
                icon: <Trophy size={40} />,
                title: 'Risultati',
                text: 'Monitoraggio costante dei progressi e adeguamento dei piani per garantire il raggiungimento dei tuoi target.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-10 border border-slate-200 hover:border-red-600 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                <div className="w-20 h-20 bg-slate-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section
        id="servizi"
        className="py-12 md:py-24 bg-slate-50 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
              Cosa offriamo
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight">
              I NOSTRI SERVIZI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <div
                key={i}
                className="bg-white p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-transparent hover:border-red-600 group"
              >
                <div className="text-slate-300 group-hover:text-red-600 mb-6 transition-colors duration-300 transform group-hover:scale-110 origin-left">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-black mb-3 uppercase tracking-wide group-hover:text-red-600 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORARI */}
      <section className="py-12 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-6  flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-[0.9]">
              NON CI SONO
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                SCUSE
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
              Siamo aperti con orari estesi per permetterti di allenarti quando
              preferisci. Dalla mattina presto fino a sera tardi, il Wolf Gym è
              la tua seconda casa.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {[
                { day: 'Lun - Mer - Ven', time: '08:00 - 21:00' },
                { day: 'Mar - Gio', time: '08:00 - 19:30' },
                { day: 'Sabato', time: '10:00 - 12:30' },
                { day: 'Domenica', time: 'Chiuso' },
              ].map((orario, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-slate-800 pb-4 group hover:border-red-900 transition-colors"
                >
                  <span className="font-bold text-base mr-2 md:text-xl group-hover:text-white transition-colors text-slate-300">
                    {orario.day}
                  </span>
                  <span className="text-red-500 font-mono font-bold text-2xl group-hover:text-red-400 transition-colors">
                    {orario.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute inset-0 bg-red-600 transform translate-x-4 translate-y-4 hidden md:block"></div>
            <div className="relative bg-slate-800 p-8 md:p-12 border border-slate-700 shadow-2xl">
              <h3 className="text-2xl font-black mb-8 uppercase flex items-center gap-3">
                <span className="w-2 h-8 bg-red-600 block"></span>
                Corsi Attivi
              </h3>
              <ul className="space-y-6">
                {[
                  { name: 'PILATES', time: 'Lun & Mer: 17:30 - 18:30' },
                  { name: 'GAG', time: 'Lun & Mer: 18:30 - 19:15' },
                  { name: 'TOTAL BODY', time: 'Lun & Mer: 19:15 - 20:00' },
                  { name: 'MUAY THAI', time: 'Lun & Mer: 20:00 - 21:00' },
                ].map((course, idx) => (
                  <li key={idx} className="flex items-start gap-4 group">
                    <Clock
                      className="text-red-600 mt-1 group-hover:rotate-180 transition-transform duration-500"
                      size={20}
                    />
                    <div>
                      <strong className="block text-white text-lg font-bold tracking-wide group-hover:text-red-500 transition-colors">
                        {course.name}
                      </strong>
                      <span className="text-slate-400 text-sm font-mono">
                        {course.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABBONAMENTI */}
      <section id="abbonamenti" className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-center text-slate-900 mb-12 md:mb-20 uppercase tracking-tight">
            SCEGLI IL TUO PIANO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 transition-all duration-300 ${
                  plan.active
                    ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 border-t-8 border-red-600 py-12'
                    : 'bg-white border border-slate-200 text-slate-900 hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                {plan.active && (
                  <div className="absolute top-0 right-0 left-0 text-center -mt-4">
                    <span className="bg-red-600 text-white text-xs font-bold px-4 py-1 uppercase tracking-widest inline-block shadow-md">
                      Consigliato
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-black uppercase mb-4 tracking-wide">
                  {plan.name}
                </h3>
                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-baseline">
                    <span className="text-6xl font-black tracking-tighter">
                      {plan.price}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-bold tracking-[0.2em] block mt-2 uppercase ${plan.active ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-5 mb-10">
                  {plan.features.map((feat, k) => (
                    <li
                      key={k}
                      className="flex items-center gap-3 text-sm font-bold"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.active ? 'bg-red-600/20 text-red-500' : 'bg-slate-100 text-slate-700'}`}
                      >
                        <Check size={14} strokeWidth={3} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 font-black uppercase tracking-widest text-sm transition-all duration-300 hover:tracking-[0.3em] ${
                    plan.active
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Scegli {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI GOOGLE STYLE */}
      <section className="py-12 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              COSA DICONO I NOSTRI CLIENTI
            </h2>
            <div className="flex items-center justify-center gap-2 text-slate-600">
              <span className="font-bold">5.0</span>
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-medium">
                su Google (245 recensioni)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500">{review.date}</p>
                    </div>
                  </div>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google"
                    className="w-5 h-5 opacity-60"
                  />
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPPA / CONTATTI */}
      <section
        id="contatti"
        className="bg-slate-900 text-white pt-12 md:pt-24 pb-12"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase">
              CONTATTACI
            </h2>
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-slate-800 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2 uppercase tracking-wide">
                    Dove Siamo
                  </h4>
                  <p className="text-slate-400 text-lg font-medium">
                    Via Marco Polo, 11
                    <br />
                    87036 Rende (CS)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-slate-800 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2 uppercase tracking-wide">
                    Chiamaci
                  </h4>
                  <a
                    href="tel:3473020924"
                    className="text-slate-400 hover:text-white transition-colors text-2xl font-mono font-bold block"
                  >
                    347 302 0924
                  </a>
                  <span className="text-sm text-slate-500 mt-1 block">
                    Anche su WhatsApp
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-16 h-16 bg-slate-800 flex items-center justify-center flex-shrink-0 text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  <Users size={32} />
                </div>
                <div>
                  <h4 className="font-black text-xl mb-2 uppercase tracking-wide">
                    Social
                  </h4>
                  <p className="text-slate-400 text-lg font-medium mb-2">
                    Seguici per aggiornamenti
                  </p>
                  <a
                    href="#"
                    className="text-red-500 font-bold hover:text-white transition-colors"
                  >
                    @WOLFGYM_RENDE
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[400px] lg:h-auto bg-slate-800 border-4 border-slate-800 overflow-hidden relative shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3093.7537282746967!2d16.2445!3d39.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131a4c7c%3A0x0!2sVia%20Marco%20Polo%2C%2011%2C%2087036%20Rende%20CS!5e0!3m2!1sit!2sit!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="lg:grayscale hover:grayscale-0 transition-all duration-500 lg:opacity-80 hover:opacity-100"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-bold tracking-widest gap-4">
          <p>© 2024 WOLF GYM RENDE</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </a>
            <a href="#" className="hover:text-white transition-colors">
              COOKIES
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
