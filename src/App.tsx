import emailjs from '@emailjs/browser';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import './App.css'

const App = () => {
  const [signUpStage, setSignUpStage] = useState("")

  return (
    <>
      <div className="base">
        <Main setSignUpStage={setSignUpStage} />
      </div>
      <div className={`responsive-background-image ${'stage-' + signUpStage}`} />
      <div id="preload">
        <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/ppdotdev_midjourney_react_demo_background_circle_0.webp`} />
        <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/ppdotdev_midjourney_react_demo_background_circle_25.webp`} />
        <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/ppdotdev_midjourney_react_demo_background_circle_50.webp`} />
        <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/ppdotdev_midjourney_react_demo_background_circle_75.webp`} />
        <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/ppdotdev_midjourney_react_demo_background_circle_100.webp`} />
      </div>
    </>
  )
}

const Main = ({ setSignUpStage }: { setSignUpStage: Dispatch<SetStateAction<string>> }) => {
  const [isSending, setIsSending] = useState(false)
  const [email, setEmail] = useState('')

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
            <img src={`${import.meta.env.DEV ? "/src" : ""}/assets/vite.svg`} alt="vite-logo" />
          </a>
        </div>
      </header>
      <main className="content">
        <h1>
          Blazing fast React component creation<br />with the power of AI
        </h1>
        <h2>
          Are you tired of spending countless hours creating React components from scratch? <br />Say goodbye to manual labor and hello to the future of development with our AI-powered component creation tool. Don't miss out on this opportunity to revolutionize your React development. <br /><br />Join our waiting list today and be the first to know when our AI-powered component creation tool becomes available.
        </h2>
        <JoinSection
          email={email}
          setEmail={setEmail}
          isSending={isSending}
          setIsSending={setIsSending}
          setSignUpStage={setSignUpStage}
        />
      </main>
    </>
  )
}

const JoinSection = ({ email, setEmail, isSending, setIsSending, setSignUpStage }: any) => {
  const inputRef = useRef(null)

  const handleChangeSignUpStage = (stage: string) => {
    if (stage === 'focus' && !email) {
      console.log('stage 25')
      setSignUpStage("25")
    }
    if (stage === "blur" && !email) {
      setSignUpStage("")
    }
    if (stage === 'blur' && email) {
      console.log('greater than stage 25')

      if (email && !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        console.log('stage 50')
        setSignUpStage("50")
      }
      if (email && email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        console.log('stage 75')
        setSignUpStage("75")
      }
    }
  }

  const sendEmail = (event: any) => {
    event.preventDefault();

    setIsSending(true)

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      event.target,
      import.meta.env.VITE_EMAILJS_USER_ID)
      .then((result) => {
        console.log(result.text)
        setIsSending(false)
        setSignUpStage("100")
      }, (error) => {
        console.log(error.text)
        setIsSending(false)
      }
      )
  }

  useEffect(() => {
    if (!email) {
      if (document.activeElement !== inputRef.current) {
        setSignUpStage("")
        return
      } else {
        setSignUpStage("25")
        return
      }
    }

    if (email && !email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      console.log('stage 50')
      setSignUpStage("50")
    }
    if (email && email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      console.log('stage 75')
      setSignUpStage("75")
    }
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
          onBlur={() => handleChangeSignUpStage('blur')}
          onChange={(event) => setEmail(event.target.value)}
          onFocus={() => handleChangeSignUpStage('focus')}
        />
        <button>
          {isSending ? (
            <div className="loader"><div></div><div></div><div></div><div></div></div>
          ) : (
            "Join"
          )}
        </button>
      </form>
    </section>
  )
}

const GitHubIcon = (): JSX.Element => {
  return (
    <svg
      fill="currentColor"
      height="1.6em"
      viewBox="0 0 16 16"
      width="1.6em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
}

export default App
