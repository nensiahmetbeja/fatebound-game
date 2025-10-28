import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2025-11-24T00:00:00Z')

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles')
      if (!particlesContainer) return

      const particleCount = 80
      particlesContainer.innerHTML = ''

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = styles.particle
        
        const size = Math.random() * 4 + 0.5
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 8}s`
        
        if (i % 3 === 0) {
          particle.style.boxShadow = `0 0 15px rgba(107, 58, 42, 0.4)`
        } else if (i % 5 === 0) {
          particle.style.boxShadow = `0 0 20px rgba(81, 41, 34, 0.5)`
        }
        
        particlesContainer.appendChild(particle)
      }
    }

    createParticles()
  }, [])

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address.', 'error')
      return
    }

    console.log('Submitting email:', email)
    setIsSubmitting(true)

    try {
      // Call our API route instead of Google Script directly (avoids CORS)
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Unknown'
        })
      })

      console.log('Response status:', response.status)

      const result = await response.json()
      console.log('Response data:', result)

      if (result.status === 'success') {
        saveEmail(email) // Still save locally as backup
        showMessage('Welcome, Fatebounder! You\'re now part of the journey.', 'success')
        setEmail('')
      } else {
        console.error('Server returned error:', result.message)
        showMessage(result.message || 'Something went wrong. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      showMessage('Unable to register email. Please try again later.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const saveEmail = (email: string) => {
    const savedEmails = getSavedEmails()
    if (!savedEmails.includes(email)) {
      savedEmails.push(email)
      localStorage.setItem('fatebound_emails', JSON.stringify(savedEmails))
    }
  }

  const getSavedEmails = () => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('fatebound_emails')
    return saved ? JSON.parse(saved) : []
  }

  const showMessage = (text: string, type: string) => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  return (
    <>
      <Head>
        <title>FATEBOUND - A Dark Fantasy RPG | Tika Studios</title>
        <meta name="description" content="Experience a story-rich dark fantasy RPG inspired by the ancient myths of Southeastern Europe. First teaser launching November 24, 2025." />
        <meta name="keywords" content="FATEBOUND, RPG, dark fantasy, Tika Studios, game, teaser, Southeastern Europe" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fatebound-game.vercel.app/" />
        <meta property="og:title" content="FATEBOUND - A Dark Fantasy RPG | Tika Studios" />
        <meta property="og:description" content="Experience a story-rich dark fantasy RPG inspired by the ancient myths of Southeastern Europe. First teaser launching November 24, 2025." />
        <meta property="og:image" content="https://fatebound-game.vercel.app/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fatebound-game.vercel.app/" />
        <meta property="twitter:title" content="FATEBOUND - A Dark Fantasy RPG | Tika Studios" />
        <meta property="twitter:description" content="Experience a story-rich dark fantasy RPG inspired by the ancient myths of Southeastern Europe. First teaser launching November 24, 2025." />
        <meta property="twitter:image" content="https://fatebound-game.vercel.app/og-image.png" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.container}>
        {/* Sticky Announcement Banner */}
        <div className={styles.stickyBanner}>
          <div className={styles.bannerContent}>
            {/* <span className={styles.globeEmoji}>🌍</span> */}
            <span className={styles.bannerText}>Teaser launching November 24, 2025 — Join the community</span>
            <a href="#email-section" className={styles.registerButton}>
              Sign up now
            </a>
          </div>
        </div>

        {/* Particle Background */}
        <div id="particles" className={styles.particles}></div>

        {/* Main Content */}
        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.heroSection}>
            {/* Logo */}
            <div className={styles.logoContainer}>
              <div className={styles.logoWrapper}>
                {/* Tika Studios Logo */}
                <div className={styles.tikaLogo}>
                  <Image
                    src="https://tikastudios.al/wp-content/uploads/2025/04/Tika-Studios.png"
                    alt="Tika Studios"
                    width={200}
                    height={24}
                    className={styles.tikaLogoImage}
                    priority
                  />
                </div>

                {/* FATEBOUND Title */}
                <div className={styles.fateboundTitle}>
                  <Image
                    src="/fatebound-title.png"
                    alt="FATEBOUND"
                    width={2340}
                    height={274}
                    className={styles.fateboundSvg}
                    priority
                  />
                </div>
              </div>
              
              {/* Subtitle */}
              <p className={styles.subtitle}>
                A story-rich RPG inspired by the myths of Southeastern Europe
              </p>
              
              {/* Tagline */}
              <p className={styles.tagline}>
                &ldquo;The world sleeps beneath its scars... but something stirs again.&rdquo;
              </p>
            </div>
            
            {/* Countdown Timer */}
            <div className={styles.countdownContainer}>
              <h2 className={styles.countdownTitle}>
                First Teaser Countdown
              </h2>
              <div className={styles.countdownGrid}>
                <div className={styles.countdownItem}>
                  <div className={styles.countdownNumber}>{timeLeft.days}</div>
                  <div className={styles.countdownLabel}>Days</div>
                </div>
                <div className={styles.countdownItem}>
                  <div className={styles.countdownNumber}>{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Hours</div>
                </div>
                <div className={styles.countdownItem}>
                  <div className={styles.countdownNumber}>{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Minutes</div>
                </div>
                <div className={styles.countdownItem}>
                  <div className={styles.countdownNumber}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className={styles.countdownLabel}>Seconds</div>
                </div>
              </div>
              <p className={styles.countdownDate}>November 24, 2025</p>
            </div>
          </section>
          
          {/* Community CTA Section */}
          <section id="email-section" className={styles.emailSection}>
            <div className={styles.emailContainer}>
              <h3 className={styles.emailTitle}>
                Become a Fatebounder
              </h3>
              <p className={styles.emailSubtitle}>
                Be the first to receive updates, behind-the-scenes content, and exclusive reveals
              </p>
              
              <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                <div className={styles.inputContainer}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className={styles.emailInput}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join Now'}
                </button>
              </form>
              
              {message && (
                <p className={`${styles.formMessage} ${styles[`message${messageType.charAt(0).toUpperCase() + messageType.slice(1)}`]}`}>
                  {message}
                </p>
              )}
            </div>
          </section>
          
          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerContent}>
              <p className={styles.copyright}>
                © 2025 Tika Studios – All Rights Reserved
              </p>
              
              {/* Social Icons */}
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialLink} aria-label="Discord">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="X (Twitter)">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.323 9.281c-2.026 0-3.675-1.649-3.675-3.675s1.649-3.675 3.675-3.675 3.675 1.649 3.675 3.675-1.649 3.675-3.675 3.675z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
