export default function Menu({ onPlay }) {
  return (
    <div className="falling-container">
      <div className="falling black1"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white1"><span className="menu-stone white" aria-hidden="true" /></div>
      <div className="falling black2"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white2"><span className="menu-stone white" aria-hidden="true" /></div>
      <div className="falling black3"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white3"><span className="menu-stone white" aria-hidden="true" /></div>
      <div className="falling black4"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white4"><span className="menu-stone white" aria-hidden="true" /></div>
      <div className="falling black5"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white5"><span className="menu-stone white" aria-hidden="true" /></div>
      <div className="falling black6"><span className="menu-stone black" aria-hidden="true" /></div>
      <div className="falling white6"><span className="menu-stone white" aria-hidden="true" /></div>

      <header className="header-bar">
        <h1 className="gomoku-title">GOMOKU</h1>
        <p className="gomoku-subtitle">Five-in-a-row on a 19x19 board</p>
      </header>

      <main className="main-container">
        <button className="play-btn white-btn" onClick={onPlay}>PLAY</button>
      </main>

      <footer className="footer-bar">
        Made with <span className="inline-stone black" aria-hidden="true" /><span className="inline-stone white" aria-hidden="true" /> by cleblais &amp; thibnguy
      </footer>
    </div>
  );
}
