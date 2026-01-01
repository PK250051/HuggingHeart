/* ===================================================
   HUGGINGHEART GLOBAL STYLES
   =================================================== */

* { box-sizing: border-box; margin: 0; padding: 0; }

body { 
    font-family: 'Poppins', sans-serif; 
    background: #fff; 
    color: #1a202c; 
    line-height: 1.6;
    overflow-x: hidden;
}

/* --- RELAX MODE LOADING (Option 1) --- */
.loading-status {
    text-align: center;
    color: #2f855a;
    font-size: 0.85rem;
    font-weight: 600;
    margin: 20px 0;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: 100%;
    transition: opacity 0.5s ease;
}

.dot-pulse {
    display: inline-block;
    width: 6px; height: 6px;
    background: #6fcf97;
    border-radius: 50%;
    margin-left: 8px;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.4; }
    100% { transform: scale(1); opacity: 1; }
}

/* --- STAGGERED ANIMATION (Option 2) --- */
@keyframes cardAppear {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}

/* --- GRID & CARDS --- */
.observer-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 25px; 
    padding: 20px 5% 100px; 
    max-width: 1300px; 
    margin: 0 auto; 
}

.girl-card { 
    background: #fff; 
    border-radius: 25px; 
    border: 1px solid #eaf7f0; 
    overflow: hidden; 
    cursor: pointer; 
    transition: 0.4s ease; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
    opacity: 0; /* Starts hidden for the JS staggered load */
    animation: cardAppear 0.6s ease forwards;
}

.girl-card:hover { 
    transform: translateY(-10px); 
    box-shadow: 0 20px 40px rgba(47, 133, 90, 0.1); 
}

.img-box { width: 100%; height: 380px; position: relative; overflow: hidden; background: #f9fafb; }
.img-box img { width: 100%; height: 100%; object-fit: cover; object-position: top; }

.status-tag { 
    position: absolute; top: 15px; left: 15px; 
    background: rgba(255,255,255,0.9); padding: 5px 12px; 
    border-radius: 12px; font-size: 0.7rem; font-weight: 700; color: #2f855a; 
}

.info-box { padding: 20px; }
.info-box p { color: #6fcf97; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; }
.info-box h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #1a202c; margin-top: 5px; }

/* --- CHAT WIDGET (BOTTOM RIGHT) --- */
.chat-widget {
    display: none; position: fixed; bottom: 20px; right: 20px;
    width: 350px; height: 500px; background: #fff; border-radius: 25px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.15); border: 1px solid #eaf7f0;
    z-index: 3000; flex-direction: column; overflow: hidden;
    animation: slideUp 0.4s ease-out;
}

@keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

.chat-header { background: #f0fdf4; padding: 18px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #eaf7f0; }
.chat-header img { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid #fff; }
.chat-window { flex-grow: 1; padding: 20px; overflow-y: auto; background: #fafafa; }
.chat-input { padding: 15px; display: flex; gap: 10px; background: #fff; border-top: 1px solid #eaf7f0; }
.chat-input input { flex: 1; border: 1px solid #eaf7f0; border-radius: 12px; padding: 12px; outline: none; font-family: inherit; }

/* --- MOBILE OPTIMIZATIONS --- */
@media (max-width: 768px) {
    .nav-links { 
        display: none; position: absolute; top: 70px; left: 0; width: 100%; 
        background: #f0fdf4; flex-direction: column; padding: 30px; 
        text-align: center; border-bottom: 1px solid #eaf7f0;
    }
    .nav-links.show { display: flex; }
    
    .observer-grid { grid-template-columns: 1fr 1fr; gap: 12px; padding: 15px; }
    .img-box { height: 260px; }
    
    .profile-modal { flex-direction: column; max-height: 95vh; overflow-y: auto; }
    .modal-left { min-height: 300px; }
    
    .chat-widget { 
        width: 100%; height: 100%; bottom: 0; right: 0; 
        border-radius: 0; z-index: 4000;
    }
}
