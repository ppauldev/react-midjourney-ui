import emailjs from '@emailjs/browser'
import { useEffect, useRef } from 'react'
import './styles/index.css'

import { GitHubIcon, ViteIcon } from './components/Icons'
import { CircularProgressShiftedPlane as CircularProgress } from './components/CircularProgress'

import { useAppContext } from './contexts/AppContext'

import { AppProvider } from './provider/AppProvider'

import { getPercentage } from './utils/utils'

const App = () => {
  return (
    <AppProvider>
      <LandingPage />
    </AppProvider>
  )
}

const LandingPage = () => {
  const { percentage } = useAppContext()

  return (
    <>
      <div className="landingpage">
        <LandingPageView />
      </div>
      <div className="responsive-background-image">
        <CircularProgress percentage={percentage} />
        <img src={`${import.meta.env.DEV ? "public/" : ""}ppdotdev_midjourney_react_demo_background.webp`} alt="phillippaul.dev - React Midjourney UI Demo Background" />
      </div>
    </>
  )
}

const LandingPageView = () => {
  return (
    <>
      <header className="navbar">
        <div className="navbar-logo">
          <div className="navbar-logo-inner" />
        </div>
        <div className="navbar-name">
          React AI
        </div>
        <div className="navbar-menu">
          <a className="navbar-menu-github" href="https://github.com/ppauldev/react-midjourney-ui">
            <GitHubIcon />
          </a>
          <a className="navbar-menu-vite" href="https://vitejs.dev/">
            <ViteIcon />
          </a>
        </div>
      </header>
      <main className="content">
        <Content />
        <JoinSection />
      </main>
    </>
  )
}

const Content = () => {
  return (
    <>
      <h1 className="fade-in">
        Blazing fast React component creation with the power of AI
      </h1>
      <h2 className="intro-basic fade-in">
        Are you tired of spending countless hours creating React components from scratch? <br />Say goodbye to manual labor and hello to the future of development with our AI-powered component creation tool. Don't miss out on this opportunity to revolutionize your React development. <br /><br />Join our waiting list today and be the first to know when our AI-powered component creation tool becomes available.
      </h2>
      <h2 className="intro-extended fade-in">
        Are you tired of spending countless hours creating React components from scratch?<br /><br />Say goodbye to manual labor and hello to the future of development with our AI-powered component creation tool. Our innovative technology utilizes machine learning algorithms to automatically generate high-quality React components, saving you time and increasing productivity.
      </h2>
      <h2 className="cta-extended fade-in">
        Don't miss out on this opportunity to revolutionize your React development.<br /><br />Join our waiting list today and be the first to know when our AI-powered component creation tool becomes available. Simply enter your email below and stay up to date on all the latest news and updates. Subscribe now and be one step ahead of the competition!
      </h2>
    </>
  )
}

const JoinSection = () => {
  const { email, isSending, setEmail, setIsSending, setPercentage } = useAppContext()

  const inputRef = useRef(null)

  const handleInputAction = (action: "blur" | "focus") => {
    const newPercentage = getPercentage(action, email)
    if (newPercentage === undefined) return;

    setPercentage(newPercentage)
  }

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSending(true)

    new Promise((resolve, reject) => {
      setTimeout(resolve, 3000)
    }).then(() => {
      setIsSending(false)
      setPercentage(100)
    }).catch(() => {
      setIsSending(false)

      const errorElement = document.getElementById("error")
      if (!errorElement) return;

      errorElement.textContent = "An error occurred during the sign up"
      setTimeout(() => { errorElement.textContent = "" }, 3000)
    })

    // Deactivate until launch:
    // emailjs.sendForm(
    //   import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    //   (event.target as HTMLFormElement),
    //   import.meta.env.VITE_EMAILJS_USER_ID)
    //   .then((result) => {
    //     setIsSending(false)
    //     setPercentage(100)
    //   }, (error) => {
    //     setIsSending(false)

    //     const errorElement = document.getElementById("error")
    //     if (!errorElement) return;

    //     errorElement.textContent = "An error occurred during the sign up"
    //     setTimeout(() => { errorElement.textContent = "" }, 3000)
    //   }
    // )
  }

  useEffect(() => {
    const newPercentage = getPercentage(document.activeElement !== inputRef.current ? "blur" : "keypress", email)
    if (newPercentage === undefined) return;

    // Reset error message on input change
    const errorElement = document.getElementById("error")
    if (errorElement) {
      errorElement.textContent = ""
    }

    setPercentage(newPercentage)
  }, [email])

  return (
    <section>
      <h3>
        Bring the speed!
      </h3>
      <form onSubmit={sendEmail}>
        <input
          ref={inputRef}
          type="email"
          name="email"
          placeholder={!email ? "reactdev@example.com" : email}
          onBlur={() => handleInputAction("blur")}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => handleInputAction("focus")}
          required
        />
        <button>
          {isSending ? (
            // CSS loading animation
            <div className="loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Join"
          )}
        </button>
      </form>
      <span id="error" />
    </section>
  )
}

export default App
