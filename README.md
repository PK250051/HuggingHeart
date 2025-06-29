
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="HuggingHeart - Connect with your soulmate through emotional compatibility. Coming soon!" />
  <title>HuggingHeart – Coming Soon</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

    :root {
      --primary-pink: #ff4d7d;
      --secondary-yellow: #ffd700;
      --accent-purple: #9c27b0;
      --dark-bg: #121212;
      --darker-bg: #0a0a0a;
      --text-light: #f5f5f5;
      --text-dark: #1a1a1a;
      --shadow: 0 8px 24px rgba(0,0,0,0.3);
      --transition: all 0.4s ease;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: linear-gradient(135deg, var(--darker-bg) 0%, #2c1a2e 100%);
      color: var(--text-light);
      font-family: 'Poppins', sans-serif;
      text-align: center;
      padding: 20px;
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
      opacity: 0.4;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
      z-index: 2;
      padding: 20px;
    }

    .boxes-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      gap: 20px;
    }

    .box {
      width: 100%;
      max-width: 500px;
      min-height: 300px;
      padding: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 25px;
      box-shadow: var(--shadow);
      font-weight: 600;
      letter-spacing: 1px;
      text-align: center;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      z-index: 2;
      opacity: 0;
      animation: slideIn 1s ease-out forwards;
    }

    .box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
      z-index: -1;
      border-radius: 25px;
    }

    .box:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
    }

    .sale {
      background: linear-gradient(135deg, var(--primary-pink), #cc0044);
      color: #fff;
      animation-delay: 0.3s;
    }

    .partnership {
      background: linear-gradient(135deg, var(--secondary-yellow), #ffaa00);
      color: var(--text-dark);
      animation-delay: 0.5s;
    }

    .box h3 {
      font-size: 28px;
      margin-bottom: 20px;
      font-weight: 700;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }

    .box p {
      font-size: 18px;
      margin-bottom: 25px;
      font-weight: 400;
      max-width: 90%;
    }

    .box-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition);
      backdrop-filter: blur(5px);
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 16px;
      margin-top: 10px;
    }

    .sale .box-btn {
      background: rgba(0,0,0,0.2);
    }

    .partnership .box-btn {
      background: rgba(0,0,0,0.15);
      color: var(--text-dark);
    }

    .box-btn:hover {
      transform: scale(1.05);
      background: rgba(255,255,255,0.3);
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0;
    }

    header {
      margin-bottom: 50px;
      max-width: 900px;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(3.2rem, 8vw, 5.5rem);
      font-weight: 800;
      background: linear-gradient(to right, var(--primary-pink), var(--secondary-yellow));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 20px;
      text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
      animation: fadeIn 1.5s ease-out;
      line-height: 1.1;
    }

    h1 i {
      font-size: 0.9em;
      vertical-align: middle;
      margin: 0 10px;
    }

    h2 {
      font-size: clamp(1.7rem, 4.5vw, 2.5rem);
      font-weight: 400;
      margin-bottom: 40px;
      color: var(--text-light);
      opacity: 0;
      animation: fadeIn 1.8s ease-out forwards;
      animation-delay: 0.2s;
    }

    .tagline {
      font-size: clamp(1.1rem, 2.5vw, 1.3rem);
      max-width: 800px;
      margin: 0 auto 50px;
      font-weight: 300;
      color: #e0e0e0;
      animation: fadeIn 2s ease-out forwards;
      animation-delay: 0.4s;
      line-height: 1.8;
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
      border-radius: 15px;
      padding: 15px 0;
      box-shadow: var(--shadow);
      border: 1px solid rgba(255,255,255,0.1);
    }

    .moving-text {
      display: inline-block;
      padding: 10px 0;
      font-size: clamp(1.1rem, 2vw, 1.3rem);
      font-weight: 500;
      color: var(--secondary-yellow);
      animation: slide 12s linear infinite;
      white-space: nowrap;
    }

    @keyframes slide {
      0%   { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .coming-soon {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      margin: 40px 0;
      color: var(--secondary-yellow);
      text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
      animation: pulse 2.5s ease-in-out infinite;
      position: relative;
      display: inline-block;
      padding: 0 20px;
    }

    .coming-soon::before,
    .coming-soon::after {
      content: "✦";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: var(--primary-pink);
      font-size: 1.5rem;
      opacity: 0.7;
    }

    .coming-soon::before {
      left: -10px;
    }

    .coming-soon::after {
      right: -10px;
    }

    @keyframes pulse {
      0%,100% { transform: scale(1); opacity: 0.9; }
      50%     { transform: scale(1.05); opacity: 1; }
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      margin-top: 30px;
    }

    .email {
      font-size: clamp(1.1rem, 2.5vw, 1.3rem);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 15px 30px;
      border-radius: 50px;
      background: rgba(255,255,255,0.08);
      transition: var(--transition);
    }

    .email:hover {
      background: rgba(255,255,255,0.15);
      transform: translateY(-3px);
    }

    .email a {
      color: var(--secondary-yellow);
      text-decoration: none;
      transition: var(--transition);
      font-weight: 600;
    }

    .email a:hover {
      color: white;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }

    .social-links {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }

    .social-links a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      color: var(--secondary-yellow);
      font-size: 1.5rem;
      transition: var(--transition);
    }

    .social-links a:hover {
      background: var(--primary-pink);
      color: white;
      transform: translateY(-5px);
    }

    footer {
      margin-top: 60px;
      padding: 20px 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.6);
  
