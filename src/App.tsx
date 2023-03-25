import './App.css'

const App = () => {
  return (
    <>
      <div className="base">
        <Main />
      </div>
      <div className="responsive-background-image" />
    </>
  )
}

const Main = () => {
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
          <div className="navbar-menu-about">
            About
          </div>
        </div>
      </header>
      <main className="content">
        <h1>
          Blazing fast React component creation {`\n`} with the power of AI
        </h1>
        <h2>
          Are you tired of spending countless hours creating React components from scratch? <br />Say goodbye to manual labor and hello to the future of development with our AI-powered component creation tool. Don't miss out on this opportunity to revolutionize your React development. <br /><br />Join our waiting list today and be the first to know when our AI-powered component creation tool becomes available.
        </h2>
        <section>
          <h3>
            Bring the speed!
          </h3>
          <form>
            <input type="text" placeholder="reactdev@example.com" />
            <button>Join</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default App
