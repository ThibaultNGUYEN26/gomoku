export default function Menu({ onPlay }){
  return (
    <div className="falling-container">
      <div className="falling black1">⚫</div>
      <div className="falling white1">⚪</div>
      <div className="falling black2">⚫</div>
      <div className="falling white2">⚪</div>
      <div className="falling black3">⚫</div>
      <div className="falling white3">⚪</div>
      <div className="falling black4">⚫</div>
      <div className="falling white4">⚪</div>
      <div className="falling black5">⚫</div>
      <div className="falling white5">⚪</div>
      <div className="falling black6">⚫</div>
      <div className="falling white6">⚪</div>

      <header className="header-bar">
        <h1 className="gomoku-title">GOMOKU</h1>
        <p className="gomoku-subtitle">Five-in-a-row on a 19x19 board</p>
      </header>

      <main className="main-container">
        <button className="play-btn white-btn" onClick={onPlay}>PLAY</button>
      </main>

      <footer className="footer-bar">
        Made with ⚫⚪ by cleblais &amp; thibnguy
      </footer>
    </div>
  );
}
