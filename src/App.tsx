import emailjs from '@emailjs/browser';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import './App.css'

const App = () => {
  const [signUpStage, setSignUpStage] = useState<number | null>(null)

  return (
    <>
      <div className="base">
        <Main setSignUpStage={setSignUpStage} />
      </div>
      <LoadingSpinner state={signUpStage} />
      <div className="responsive-background-image" />
    </>
  )
}

const Main = ({ setSignUpStage }: { setSignUpStage: Dispatch<SetStateAction<number | null>> }) => {
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
            <ViteIcon />
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
      setSignUpStage(0)
    }
    if (stage === "blur" && !email) {
      setSignUpStage(null)
    }
    if (stage === 'blur' && email) {
      if (email && !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        setSignUpStage(55)
      }
      if (email && email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        setSignUpStage(80)
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
        setSignUpStage(100)
      }, (error) => {
        console.log(error.text)
        setIsSending(false)
      }
      )
  }

  useEffect(() => {
    if (!email) {
      if (document.activeElement !== inputRef.current) {
        setSignUpStage(null)
        return
      } else {
        setSignUpStage(0)
        return
      }
    }

    if (email && email.length === 1) {
      setSignUpStage(15)
    }
    if (email && email.length > 1 && !email.includes("@")) {
      setSignUpStage(35)
    }
    if (email && email.length > 1 && email.includes("@")) {
      setSignUpStage(55)
    }
    if (email && email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setSignUpStage(80)
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

const ViteIcon = (): JSX.Element => {
  return (
    <svg width="410" height="404" viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)" />
      <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
          <stop stop-color="#41D1FF" />
          <stop offset="1" stop-color="#BD34FE" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFEA83" />
          <stop offset="0.0833333" stop-color="#FFDD35" />
          <stop offset="1" stop-color="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const LoadingSpinner = ({ state }: { state: number | null }) => {
  if (state === null) return null;

  return (
    <div className="perspective">
      <CircularProgress
        size={80}
        strokeWidth={8}
        percentage={state}
        color="green"
      />
    </div>
  )
}

const CircularProgress = ({ size, strokeWidth, percentage, color }: any) => {
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    setProgress(percentage);

    if (percentage === 100) {
      setTimeout(() => setShowComplete(true), 1000);
    }
  }, [percentage]);

  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <>
      {!showComplete && (
        <div className="fade-in">
          <svg width={size} height={size} viewBox={viewBox}>
            <circle
              fill="none"
              stroke="white"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              fill="none"
              stroke={color}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeDasharray={[dash, circumference - dash]}
              strokeLinecap="round"
              style={{ transition: "all 0.5s" }}
            />
            <text
              fill="#314152"
              fontSize="20px"
              fontWeight="600"
              x="50%"
              y="50%"
              dy="8px"
              textAnchor="middle"
            >
              {`${percentage}%`}
            </text>
          </svg>
        </div>
      )}
      {showComplete && (
        <div className="fade-in">
          <svg width={size} height={size} viewBox={viewBox}>
            <circle
              fill="none"
              stroke="white"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              fill="none"
              stroke={color}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeDasharray={[circumference, 0]}
              strokeLinecap="round"
              style={{ transition: "all 0.5s" }}
            />
            <path transform="translate(-10,-10)" d="M30 50 L43 63 L70 35" stroke="green" stroke-width={strokeWidth} fill="none" />
          </svg>
        </div>
      )}
    </>
  );
};

export default App
