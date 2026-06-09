import React, { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    // Scroll reveal logic
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Staggered reveals per section
    document.querySelectorAll('section').forEach(section => {
      const items = section.querySelectorAll('.reveal');
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 80}ms`;
      });
    });

    // Clean up observer on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* If you are putting the CSS variables and global styling in a CSS file, 
          you can remove this <style> block completely. */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #F7F7F5;
          --ink: #111110;
          --accent: #D0291A;
          --muted: #8A8A88;
          --rule: #E0DDD9;
          --serif: 'DM Serif Display', serif;
          --sans: 'Inter', sans-serif;
        }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg);
          color: var(--ink);
          font-family: var(--sans);
          font-size: 15px;
          line-height: 1.6;
          min-height: 100vh;
        }
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          background: var(--bg);
          border-bottom: 1px solid var(--rule);
        }
        .nav-logo {
          font-family: var(--serif);
          font-size: 18px;
          letter-spacing: -0.01em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-links { display: flex; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-status { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); font-weight: 400; }
        .status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #6DBF8B;
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        main { padding-top: 73px; }
        section { padding: 100px 48px; border-bottom: 1px solid var(--rule); }
        .container { max-width: 1040px; margin: 0 auto; }
        #hero { padding: 120px 48px 100px; border-bottom: 1px solid var(--rule); }
        .hero-inner { max-width: 1040px; margin: 0 auto; }
        .hero-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--muted); margin-bottom: 32px;
          display: flex; align-items: center; gap: 12px;
        }
        .hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: var(--accent); }
        .hero-headline { position: relative; margin-bottom: 48px; }
        .hero-headline h1 { font-family: var(--serif); font-size: clamp(56px, 8vw, 104px); line-height: 1; letter-spacing: -0.03em; color: var(--ink); }
        .hero-headline h1 .accent-word { color: var(--accent); font-style: italic; }
        .horizon-rule { display: block; width: 100%; height: 1px; background: var(--ink); margin: 12px 0; opacity: 0.15; }
        .hero-sub-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; }
        .hero-desc { max-width: 420px; color: var(--muted); font-size: 15px; line-height: 1.75; font-weight: 300; }
        .hero-desc strong { color: var(--ink); font-weight: 500; }
        .hero-actions { display: flex; align-items: center; gap: 24px; flex-shrink: 0; }
        .btn-primary {
          background: var(--ink); color: var(--bg); text-decoration: none; font-size: 12px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; padding: 13px 28px; border: none; cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .btn-primary:hover { background: var(--accent); color: var(--ink); }
        .btn-ghost {
          color: var(--muted); text-decoration: none; font-size: 12px; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; border-bottom: 1px solid var(--rule); padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
        }
        .btn-ghost:hover { color: var(--ink); border-color: var(--ink); }
        #about .container { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
        .about-heading { font-family: var(--serif); font-size: clamp(32px, 4vw, 48px); line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 0; }
        .about-body p { color: var(--muted); font-size: 15px; line-height: 1.8; font-weight: 300; margin-bottom: 20px; }
        .about-body p:last-child { margin-bottom: 0; }
        .about-body strong { color: var(--ink); font-weight: 500; }
        .skills-grid { margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-top: 1px solid var(--rule); }
        .skill-item { padding: 16px 0; border-bottom: 1px solid var(--rule); display: flex; align-items: center; justify-content: space-between; }
        .skill-name { font-size: 13px; font-weight: 500; color: var(--ink); }
        .skill-level { font-size: 11px; color: var(--accent); letter-spacing: 0.06em; font-weight: 400; }
        #work .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 64px; }
        #work .section-header h2 { font-family: var(--serif); font-size: clamp(32px, 4vw, 48px); letter-spacing: -0.02em; color: var(--ink); }
        .work-count { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; }
        .work-list { display: flex; flex-direction: column; gap: 0; }
        .work-item { display: grid; grid-template-columns: 80px 1fr 160px 80px; gap: 32px; align-items: center; padding: 28px 0; border-top: 1px solid var(--rule); text-decoration: none; cursor: pointer; transition: background 0.15s; position: relative; }
        .work-item:last-child { border-bottom: 1px solid var(--rule); }
        .work-item:hover .work-title { color: var(--accent); }
        .work-item:hover .work-arrow { transform: translateX(4px); }
        .work-year { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
        .work-title { font-family: var(--serif); font-size: 22px; letter-spacing: -0.01em; color: var(--ink); transition: color 0.2s; display: block; margin-bottom: 4px; }
        .work-desc { font-size: 13px; color: var(--muted); font-weight: 300; }
        .work-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag { font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--rule); padding: 4px 10px; }
        .work-arrow { font-size: 18px; color: var(--accent); text-align: right; transition: transform 0.2s; justify-self: end; }
        #experience .container { display: grid; grid-template-columns: 260px 1fr; gap: 80px; }
        #experience h2 { font-family: var(--serif); font-size: clamp(28px, 3.5vw, 40px); letter-spacing: -0.02em; line-height: 1.1; position: sticky; top: 100px; }
        .exp-list { display: flex; flex-direction: column; }
        .exp-item { padding: 32px 0; border-top: 1px solid var(--rule); }
        .exp-item:last-child { border-bottom: 1px solid var(--rule); }
        .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 24px; }
        .exp-role { font-size: 16px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em; }
        .exp-period { font-size: 12px; color: var(--muted); letter-spacing: 0.04em; white-space: nowrap; padding-top: 2px; }
        .exp-company { font-size: 13px; color: var(--accent); font-weight: 500; margin-bottom: 12px; }
        .exp-body { font-size: 14px; color: var(--muted); line-height: 1.75; font-weight: 300; }
        #contact { padding: 120px 48px; border-bottom: none; }
        #contact .container { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; }
        .contact-left h2 { font-family: var(--serif); font-size: clamp(40px, 6vw, 80px); letter-spacing: -0.03em; line-height: 1; color: var(--ink); margin-bottom: 24px; }
        .contact-left h2 em { color: var(--accent); font-style: italic; }
        .contact-links { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; flex-shrink: 0; }
        .contact-link { font-size: 13px; color: var(--muted); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s; padding: 6px 0; border-bottom: 1px solid transparent; }
        .contact-link:hover { color: var(--ink); }
        .contact-link-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--rule); transition: color 0.2s; font-weight: 500; }
        .contact-link:hover .contact-link-label { color: var(--accent); }
        footer { padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--rule); }
        .footer-copy { font-size: 12px; color: var(--muted); letter-spacing: 0.04em; }
        .footer-back { font-size: 12px; color: var(--muted); text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s; }
        .footer-back:hover { color: var(--ink); }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          nav { padding: 16px 24px; }
          .nav-links { display: none; }
          section, #hero, #contact { padding: 72px 24px; }
          footer { padding: 20px 24px; }
          #about .container, #experience .container { grid-template-columns: 1fr; gap: 40px; }
          #experience h2 { position: static; }
          #contact .container { flex-direction: column; align-items: flex-start; }
          .contact-links { align-items: flex-start; }
          .work-item { grid-template-columns: 60px 1fr 24px; }
          .work-tags { display: none; }
          .hero-sub-row { flex-direction: column; align-items: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .status-dot { animation: none; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">Pradipto</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-status">
          <div className="status-dot"></div>
          Available for work
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section id="hero">
          <div className="hero-inner">
            <div className="hero-eyebrow reveal">Front-End Developer &amp; Python Coder</div>
            <div className="hero-headline reveal">
              <h1>Crafting<br />digital things<br />that <span className="accent-word">matter.</span></h1>
              <span className="horizon-rule"></span>
            </div>
            <div className="hero-sub-row reveal">
              <p className="hero-desc">
                I build <strong>fast, considered interfaces</strong> at the intersection of engineering and design — products people actually enjoy using. Based in Bangladesh.
              </p>
              <div className="hero-actions">
                <a href="#work" className="btn-primary">View Work</a>
                <a href="#contact" className="btn-ghost">Let's talk</a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="container">
            <div className="about-left reveal">
              <div className="section-label">About</div>
              <h2 className="about-heading">Thoughtful builder.<br />Obsessive about craft.</h2>
            </div>
            <div className="about-body reveal">
              <p>
                I'm a fifteen year old boy who <strong>loves creating websites and games</strong> — from complex games and websites down to the hover state on a button.
              </p>
              <p>
               I'm currently a student of grade 9 <strong>and</strong>, am looking forward to learning new skills!
              </p>

              <div className="skills-grid">
                <div className="skill-item"><span className="skill-name">JavaScript</span><span className="skill-level">Proficient</span></div>
                <div className="skill-item"><span className="skill-name">React</span><span className="skill-level">learning</span></div>
                <div className="skill-item"><span className="skill-name">HTML/CSS</span><span className="skill-level">Proficient</span></div>
                <div className="skill-item"><span className="skill-name">Figma</span><span className="skill-level">Proficient</span></div>
                <div className="skill-item"><span className="skill-name">Python</span><span className="skill-level">Proficient</span></div>
               
              </div>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <div className="section-label">Selected Work</div>
                <h2>What I've built</h2>
              </div>
              <span className="work-count">04 projects</span>
            </div>

            <div className="work-list">
              <div className="work-item reveal">
                <span className="work-year">2026</span>
                <div className="work-info">
                  <span className="work-title">Cartoon Cat</span>
                  <span className="work-desc">A horror, 2D game</span>
                </div>
                <div className="work-tags">
                  <span className="tag">CSS</span>
                  <span className="tag">HTML</span>
                  <span className="tag">React</span>
                </div>
                <a href><span className="work-arrow">↗</span></a>
              </div>

              <div className="work-item reveal">
                <span className="work-year">2026</span>
                <div className="work-info">
                  <span className="work-title">Pizza Tray</span>
                  <span className="work-desc">An online food delvery website</span>
                </div>
                <div className="work-tags">
                  <span className="tag">React</span>
                  <span className="tag">HTML</span>
                  <span className="tag">CSS</span>
                </div>
                <a href="https://pizza-tray-zqew.vercel.app/"><span className="work-arrow">↗</span></a>
              </div>

              
            </div>
          </div>
        </section>

        
        
        

        {/* CONTACT */}
        <section id="contact">
          <div className="container">
            <div className="contact-left reveal">
              <div className="section-label">Get in touch</div>
              <h2>Let's build<br />something <em>real.</em></h2>
            
            </div>
            </div>
        </section>
      </main>

      <footer>
        <span className="footer-copy">© 2026 Pradipto. All rights reserved.</span>
        <a href="#" className="footer-back">Back to top ↑</a>
      </footer>
    </>
  );
}