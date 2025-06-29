<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HuggingHeart – Coming Soon</title>
  <style>
    /* Import font */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;800&display=swap');

    /* Base reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background-color: #1a1a1a;
      color: #f0f0f0;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      padding: 60px 20px;
      line-height: 1.6;
      position: relative;   /* for absolute boxes */
      min-height: 100vh;
    }

    /* Side boxes */
    .box {
      position: absolute;
      width: 180px;
      height: 300px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      font-weight: 600;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .sale {
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #ff3366, #cc0055);
    }
    .partnership {
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #ffee58, #ffcc00);
      color: #222;
    }

    /* Headings */
    h1 {
      font-size: 3rem;
      font-weight: 800;
      color: #ff3366;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 30px;
    }

    /* Paragraph */
    p {
      font-size: 1rem;
      max-width: 700px;
      margin: 0 auto 30px;
    }

    /* Moving text */
    .marquee-container {
      overflow: hidden;
      width: 100%;
      margin-bottom: 40px;
    }
    .moving-text {
      display: inline-block;
      padding: 10px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #ff6699;
      animation: slide 12s linear infinite;
      white-space: nowrap;
    }
    @keyframes slide {
      0%   { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    /* Coming soon & contact */
    .coming-soon {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 20px;
      color: #ffee58;
    }
    .email {
      font-size: 1rem;
      font-weight: 600;
    }
    .email a {
      color: #ffee58;
      text-decoration: none;
    }
    .email a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <!-- Side Boxes -->
  <div class="box sale">
    <h3>For Sale</h3>
    <p>Grab this premium domain!</p>
  </div>
  <div class="box partnership">
    <h3>Partnership</h3>
    <p>Join us on this love journey</p>
  </div>

  <!-- Main Content -->
  <h1>HuggingHeart 💖</h1>
  <h2>Where True Love Begins</h2>

  <p>
    HuggingHeart.com connects souls through emotional compatibility and shared life values.
    We believe that true love goes beyond looks — it’s about deep understanding and meaningful alignment.
    Our platform is designed to help you find someone who truly matches your emotional world.
    Let your heart guide you to a relationship built on trust, warmth, and lasting connection.
    Welcome to a new way of discovering love — heartfelt, honest, and beautifully real.
  </p>

  <div class="marquee-container">
    <p class="moving-text">💌 Love is on its way... Stay tuned for something beautiful! 💌</p>
  </div>

  <div class="coming-soon">🚀 Coming Soon!</div>

  <div class="email">
    📧 Contact us: <a href="mailto:support@huggingheart.com">support@huggingheart.com</a>
  </div>
</body>
</html>
