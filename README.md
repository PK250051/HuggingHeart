<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="HuggingHeart - Connect with your soulmate through emotional compatibility. Coming soon!" />
  <title>HuggingHeart – Coming Soon</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;600&display=swap');

    :root {
      --primary-pink: #ff4d7d;
      --secondary-yellow: #ffd700;
      --dark-bg: #121212;
      --text-light: #f5f5f5;
      --shadow: 0 8px 24px rgba(0,0,0,0.3);
      --transition: all 0.4s ease;
    }

    * {
      margin: 0;           /* semicolon added */
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: linear-gradient(135deg, #1a1a1a 0%, #2c1a2e 100%);
      color: var(--text-light);
      font-family: 'Poppins', sans-serif;
      text-align: center;
      padding: 80px 20px;
      line-height: 1.7;
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
    }

    canvas#particle-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.3;
    }

    .box {
      position: fixed;
      width: clamp(200px, 22vw, 240px);
      min-height: 560px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      box-shadow: var(--shadow);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      text-align: center;
      transition: var(--transition);
      opacity: 0;
      animation: slideIn 1s ease-out forwards;
      z-index: 2;
    }

    .box:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    }

    .sale {
      top: 50%;                        /* vertical center */
      left: 5%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, var(--primary-pink), #cc0044);
      color: #fff;
      animation-delay: 0.3s;
    }

    .partnership {
      top: 50%;                        /* vertical center */
      right: 5%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, var(--secondary-yellow), #ffaa00);
      color: #000;                     /* black text for contrast */
      animation-delay: 0.5s;
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.8rem, 7vw, 4.2rem);
      font-weight: 700;
      color: var(--primary-pink);
      margin-bottom: 15px;
      text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
      animation: fadeIn 1.5s ease-out;
    }

    h2 {
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      font-weight: 400;
      margin-bottom: 40px;
      color: var(--text-light);
      opacity: 0;
      animation: fadeIn 1.8s ease-out forwards;
      animation-delay: 0.2s;
    }

    p {
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      max-width: 800px;
      margin: 0 auto 50px;
      font-weight: 300;
      color: #e0e0e0;
      animation: fadeIn 2s ease-out forwards;
      animation-delay: 0.4s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .marquee-container {
      overflow: hidden;
      width: 100%;
      max-width: 900px;
      margin: 0 auto 50px;
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 15px 0;
      box-shadow: var(--shadow);
    }

    .moving-text {
      display: inline-block;
      padding: 10px 0;
      font-size: clamp(1.1rem, 2vw, 1.3rem);
      font-weight: 600;
      color: var(--primary-pink);
      animation: slide 8s linear infinite;
      white-space: nowrap;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
    }

    @keyframes slide {
      0%   { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .coming-soon {
      font-size: clamp(1.6rem, 3.5vw, 2rem);
      font-weight: 800;
      margin-bottom: 30px;
      color: var(--secondary-yellow);
      text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
      animation: pulse 2.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%,100% { transform: scale(1); }
      50%     { transform: scale(1.08); }
    }

    .email {
      font-size: clamp(1rem, 2vw, 1.1rem);
      font-weight: 600;
    }
    .email a {
      color: var(--secondary-yellow);
      text-decoration: none;
      transition: var(--transition);
      padding: 8px 16px;
      border-radius: 8px;
      background: rgba(255,255,255,0.1);
    }
    .email a:hover {
      background: var(--secondary-yellow);
      color: #1a1a1a;
    }

    @media (max-width: 900px) {
      .box {
        position: static;
        width: 100%;
        max-width: 320px;
        margin: 20px auto;
        opacity: 1;
        transform: none;
      }
    }
  </style>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EVLW0PTZ7Z"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EVLW0PTZ7Z');
</script>
  
</head>
<body>
  <canvas id="particle-bg"></canvas>

  <div class="box sale" role="complementary" aria-label="Domain Sale Information">
    <h3>Domain For Sale</h3>
    <p>Premium matchmaking domain available.</p>
  </div>

  <div class="box partnership" role="complementary" aria-label="Partnership Information">
    <h3>Partner With Us</h3>
    <p>Join our mission to bring hearts together.</p>
  </div>

  <header>
    <h1>HuggingHeart 💖</h1>
    <h2>Where True Love Begins</h2>
  </header>

  <main>
    <p>
      HuggingHeart.com connects souls through emotional compatibility and shared life values.
      We believe true love transcends appearances — it’s about deep understanding and meaningful alignment.
      Our platform is crafted to help you find someone who resonates with your emotional world.
      Let your heart lead you to a relationship built on trust, warmth, and lasting connection.
      Welcome to a heartfelt, honest, and beautifully real way to discover love.
    </p>

    <div class="marquee-container" aria-hidden="true">
      <p class="moving-text">💌 Love is on its way... Stay tuned for something beautiful! 💌</p>
    </div>

    <div class="coming-soon">🚀 Coming Soon!</div>

    <div class="email">
      📧 Contact us: <a href="mailto:support@huggingheart.com" aria-label="Email for support">support@huggingheart.com</a>
    </div>
  </main>

  <script>
    const canvas = document.getElementById('particle-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 77, 125, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    animate();
  </script>
</body>
</html>
