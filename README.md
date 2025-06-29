<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HuggingHeart – Coming Soon</title>
  <style>
    /* Import a bold, elegant font */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;800&display=swap');

    /* Reset & base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      background-color: #1a1a1a;   /* nearly-black */
      color: #f0f0f0;              /* light text */
      font-family: 'Poppins', sans-serif;
      text-align: center;
      padding: 60px 20px;
      line-height: 1.6;
    }

    /* Headings */
    h1 {
      font-size: 3rem;
      font-weight: 800;
      color: #ff3366;             /* accent pink */
      margin-bottom: 10px;
    }
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 30px;
    }

    /* Paragraphs */
    p {
      font-size: 1rem;
      max-width: 700px;
      margin: 0 auto 30px auto;
    }

    /* Moving marquee-style text */
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

    /* Coming Soon callout */
    .coming-soon {
      font-size: 1.5rem;
      font-weight: 800;
      margin: 40px 0 20px 0;
      color: #ffee58;            /* bright accent */
    }

    /* Contact */
    .email {
      font-size: 1rem;
      font-weight: 600;
      color: #aaa;
    }
    .email a {
      color: #ffee58;
      text-decoration: none;
    }
    .email a:hover {
      text-decoration: underline;
    }

    /* Make sure marquee text doesn’t overflow */
    .marquee-container {
      overflow: hidden;
      width: 100%;
    }
  </style>
</head>
<body>
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
