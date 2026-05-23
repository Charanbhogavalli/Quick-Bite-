/**
 * Quick Bite — Overhauled Immersive Food World Engine
 * Handles 3D camera drift, screen glass shines, and poster caption sync.
 */

// --- 1. RESTAURANTS & MENU DATABASE ---
const RESTAURANT_DATA = {
  ramen: {
    name: "Ramen Alley",
    realm: "Noodle Realm",
    banner: "assets/ramen_alley_bg.png",
    glowColor: "rgba(255, 0, 85, 0.4)",
    menu: [
      {
        id: "ramen-pork",
        name: "Neon Pork Ramen",
        price: 16.50,
        desc: "Black garlic tonkotsu broth, hand-pulled noodles, charcoal-charred chashu pork, and soft-boiled neon eggs.",
        svg: `<svg viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="38" fill="#141822" stroke="#ff0055" stroke-width="2" class="layer-depth-1"/>
                <ellipse cx="50" cy="55" rx="32" ry="24" fill="#a0522d" class="layer-depth-1"/>
                <path d="M30,52 Q40,38 52,55 T72,48 M32,58 Q45,45 55,60 T68,54" fill="none" stroke="#ffcc00" stroke-width="3" stroke-linecap="round" class="layer-depth-2"/>
                <path d="M28,45 L42,42 L46,54 L32,56 Z" fill="#b22222" class="layer-depth-2"/>
                <circle cx="60" cy="48" r="8" fill="#fff" class="layer-depth-3"/>
                <circle cx="60" cy="48" r="5" fill="#ff9900" class="layer-depth-3"/>
                <circle cx="42" cy="62" r="3" fill="#ff0055" class="layer-depth-3"/>
                <circle cx="48" cy="65" r="2.5" fill="#ff0055" class="layer-depth-3"/>
                <path d="M25,75 Q50,70 75,75" stroke="#ff0055" stroke-width="2" fill="none" class="layer-depth-1"/>
              </svg>`
      },
      {
        id: "ramen-hellfire",
        name: "Hellfire Spicy Ramen",
        price: 17.50,
        desc: "Ghost pepper chili oil, red-braised beef brisket, wood ear mushrooms, and scorched green onions.",
        svg: `<svg viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="38" fill="#141822" stroke="#ff3c00" stroke-width="2" class="layer-depth-1"/>
                <ellipse cx="50" cy="55" rx="32" ry="24" fill="#ff2200" class="layer-depth-1"/>
                <path d="M30,52 Q40,38 52,55 T72,48 M32,58 Q45,45 55,60 T68,54" fill="none" stroke="#ffaa00" stroke-width="3" stroke-linecap="round" class="layer-depth-2"/>
                <rect x="35" y="40" width="12" height="12" rx="2" fill="#3e2723" class="layer-depth-2"/>
                <rect x="52" y="58" width="10" height="10" rx="1" fill="#8d6e63" class="layer-depth-2"/>
                <path d="M62,45 L72,40 L68,36" stroke="#4caf50" stroke-width="2.5" fill="none" class="layer-depth-3"/>
                <path d="M55,65 L60,61" stroke="#4caf50" stroke-width="2.5" fill="none" class="layer-depth-3"/>
                <circle cx="48" cy="50" r="2" fill="#ffcc00" class="layer-depth-3"/>
              </svg>`
      }
    ]
  },
  biryani: {
    name: "Biryani Hearth",
    realm: "Clay Pot Realm",
    banner: "assets/biryani_hearth_bg.png",
    glowColor: "rgba(255, 136, 0, 0.4)",
    menu: [
      {
        id: "biryani-mutton",
        name: "Royal Mutton Biryani",
        price: 19.00,
        desc: "Fragrant basmati rice layered with tender lamb, saffron infusion, and caramelized onions, sealed with whole wheat dough.",
        svg: `<svg viewBox="0 0 100 100">
                <path d="M22,45 C22,45 28,80 50,80 C72,80 78,45 78,45 Z" fill="#b87333" stroke="#ff8800" stroke-width="1.5" class="layer-depth-1"/>
                <ellipse cx="50" cy="45" rx="28" ry="10" fill="#ffd700" class="layer-depth-2"/>
                <circle cx="42" cy="45" r="4" fill="#a0522d" class="layer-depth-2"/>
                <circle cx="58" cy="43" r="5" fill="#a0522d" class="layer-depth-2"/>
                <path d="M38,44 L44,46 M54,43 L60,45" stroke="#3e2723" stroke-width="2" class="layer-depth-3"/>
                <ellipse cx="50" cy="42" rx="15" ry="6" fill="#ffaa00" opacity="0.8" class="layer-depth-3"/>
              </svg>`
      },
      {
        id: "biryani-jackfruit",
        name: "Charcoal Jackfruit Biryani",
        price: 15.50,
        desc: "Smoked young jackfruit, mint-herb blend, rose water mist, and slow-baked clay pot aroma.",
        svg: `<svg viewBox="0 0 100 100">
                <path d="M22,45 C22,45 28,80 50,80 C72,80 78,45 78,45 Z" fill="#8d6e63" stroke="#ffaa00" stroke-width="1.5" class="layer-depth-1"/>
                <ellipse cx="50" cy="45" rx="28" ry="10" fill="#ffd700" class="layer-depth-2"/>
                <circle cx="40" cy="44" r="4" fill="#4caf50" class="layer-depth-2"/>
                <circle cx="60" cy="45" r="4" fill="#4caf50" class="layer-depth-2"/>
                <rect x="46" y="42" width="8" height="6" rx="1" fill="#cddc39" class="layer-depth-2"/>
                <path d="M32,45 Q50,42 68,45" stroke="#ff8800" stroke-width="1" fill="none" class="layer-depth-3"/>
              </svg>`
      }
    ]
  },
  grill: {
    name: "Neon Grill",
    realm: "Sizzle Realm",
    banner: "assets/neon_grill_bg.png",
    glowColor: "rgba(255, 51, 0, 0.4)",
    menu: [
      {
        id: "grill-steak",
        name: "Smoked Ribeye Steak",
        price: 24.00,
        desc: "Thick wood-fired beef ribeye, charred rosemary glaze, roasted garlic bulbs, and sizzling bone marrow butter.",
        svg: `<svg viewBox="0 0 100 100">
                <rect x="20" y="55" width="60" height="15" rx="4" fill="#1b1e24" stroke="#ff3c00" stroke-width="1.5" class="layer-depth-1"/>
                <path d="M28,52 C35,42 65,42 72,52 L70,58 C60,62 40,62 30,58 Z" fill="#3e2723" class="layer-depth-2"/>
                <path d="M32,48 L42,54 M45,46 L55,54 M58,48 L68,54" stroke="#111" stroke-width="2" stroke-linecap="round" class="layer-depth-2"/>
                <path d="M42,42 Q50,32 58,45" stroke="#4caf50" stroke-width="2" fill="none" class="layer-depth-3"/>
                <circle cx="34" cy="54" r="3.5" fill="#fff9c4" class="layer-depth-3"/>
              </svg>`
      },
      {
        id: "grill-belly",
        name: "Neon Glazed Pork Belly",
        price: 18.00,
        desc: "Slow-smoked pork belly chunks, honey-gochujang lacquer, sesame sprinkle, and charred scallions.",
        svg: `<svg viewBox="0 0 100 100">
                <rect x="20" y="55" width="60" height="15" rx="4" fill="#1b1e24" stroke="#ff3c00" stroke-width="1.5" class="layer-depth-1"/>
                <rect x="30" y="44" width="14" height="14" rx="2" fill="#5d4037" class="layer-depth-2"/>
                <rect x="48" y="42" width="14" height="14" rx="2" fill="#5d4037" class="layer-depth-2"/>
                <path d="M30,48 L44,48 M48,46 L62,46" stroke="#ff3c00" stroke-width="1.5" class="layer-depth-3"/>
                <circle cx="36" cy="48" r="1" fill="#fff" class="layer-depth-3"/>
                <circle cx="40" cy="52" r="1.2" fill="#fff" class="layer-depth-3"/>
                <circle cx="52" cy="46" r="1" fill="#fff" class="layer-depth-3"/>
              </svg>`
      }
    ]
  },
  dimsum: {
    name: "Dim Sum Fog",
    realm: "Steamer Realm",
    banner: "assets/dim_sum_fog_bg.png",
    glowColor: "rgba(0, 204, 255, 0.4)",
    menu: [
      {
        id: "dimsum-hargow",
        name: "Shrimp Har Gow",
        price: 12.00,
        desc: "Delicate crystal skin wrapping plump seasoned shrimp, steamed over wild tea leaves and served with chili crunch.",
        svg: `<svg viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="38" fill="#d7ccc8" stroke="#00ccff" stroke-width="1.5" class="layer-depth-1"/>
                <circle cx="50" cy="55" r="34" fill="#a1887f" class="layer-depth-1"/>
                <path d="M34,56 C34,48 44,44 44,52 C44,56 34,60 34,56 Z" fill="#fff" opacity="0.9" class="layer-depth-2"/>
                <path d="M50,60 C50,52 60,48 60,56 C60,60 50,64 50,60 Z" fill="#fff" opacity="0.9" class="layer-depth-2"/>
                <path d="M48,46 C48,38 58,34 58,42 C58,46 48,50 48,46 Z" fill="#fff" opacity="0.9" class="layer-depth-2"/>
                <circle cx="38" cy="52" r="1.5" fill="#ff3d00" class="layer-depth-3"/>
                <circle cx="54" cy="56" r="1.5" fill="#ff3d00" class="layer-depth-3"/>
                <circle cx="52" cy="40" r="1.5" fill="#ff3d00" class="layer-depth-3"/>
              </svg>`
      },
      {
        id: "dimsum-bao",
        name: "Char Siu Bao",
        price: 11.00,
        desc: "Fluffy, cloud-like sweet buns filled with honey roasted barbecue pork, steaming hot.",
        svg: `<svg viewBox="0 0 100 100">
                <circle cx="50" cy="55" r="38" fill="#d7ccc8" stroke="#00ccff" stroke-width="1.5" class="layer-depth-1"/>
                <circle cx="50" cy="55" r="34" fill="#a1887f" class="layer-depth-1"/>
                <circle cx="40" cy="54" r="12" fill="#fafafa" class="layer-depth-2"/>
                <circle cx="60" cy="54" r="12" fill="#fafafa" class="layer-depth-2"/>
                <path d="M38,45 Q40,48 42,45 M58,45 Q60,48 62,45" stroke="#e0e0e0" stroke-width="1.5" fill="none" class="layer-depth-3"/>
              </svg>`
      }
    ]
  }
};

// --- 2. EMOTIONAL POSTER CAPTION TRANSLATIONS ---
const POSTER_CAPTIONS = {
  opening: {
    main: "CRAVINGS MOVE FASTER HERE.",
    sub: "SKIP THE WAIT."
  },
  loading: {
    main: "IGNITING THE STOVES.",
    sub: "YOUR EXPERIENCE LOADS."
  },
  restaurants: {
    main: "YOUR FOOD STARTS BEFORE YOU ARRIVE.",
    sub: "ENTER THE REALMS."
  },
  menu: {
    main: "CHOOSE YOUR COVENANT.",
    sub: "THE FEAST AWAITS."
  },
  checkout: {
    main: "SEAL THE COVENANT.",
    sub: "DO NOT DELAY YOUR JOURNEY."
  },
  travel: {
    main: "SYNCHRONIZING PATHS.",
    sub: "RIGHT ON TIME."
  },
  arrival: {
    main: "YOUR FEAST IS SERVED.",
    sub: "RIGHT ON TIME."
  }
};

// --- 3. GLOBAL STATE ---
const STATE = {
  currentScreen: "opening",
  selectedRestaurant: null,
  cart: [],
  spiceLevel: 20,
  travelProgress: 0
};

// --- 4. CANVAS PARTICLE ENGINE ---

// 4.1 Rain droplets slanted
class RainDrop {
  constructor(canvasWidth, canvasHeight, speedMultiplier = 1) {
    this.w = canvasWidth;
    this.h = canvasHeight;
    this.x = Math.random() * this.w;
    this.y = Math.random() * -this.h;
    this.length = Math.random() * 20 + 10;
    this.speed = (Math.random() * 12 + 10) * speedMultiplier;
    this.opacity = Math.random() * 0.28 + 0.08;
  }

  update() {
    this.y += this.speed;
    this.x -= this.speed * 0.15;
    if (this.y > this.h) {
      this.y = Math.random() * -40;
      this.x = Math.random() * this.w;
    }
  }

  draw(ctx) {
    ctx.strokeStyle = `rgba(174, 219, 255, ${this.opacity})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - 2, this.y + this.length);
    ctx.stroke();
  }
}

// 4.2 Embers rising
class Ember {
  constructor(canvasWidth, canvasHeight, customColor = null, speedMultiplier = 1) {
    this.w = canvasWidth;
    this.h = canvasHeight;
    this.x = Math.random() * this.w;
    this.y = this.h + Math.random() * 20;
    this.size = Math.random() * 2.5 + 1.2;
    this.speedY = (Math.random() * 1.5 + 0.8) * speedMultiplier;
    this.swaySpeed = Math.random() * 0.02 + 0.005;
    this.swayWidth = Math.random() * 15 + 5;
    this.swayOffset = Math.random() * 100;
    this.opacity = 1;
    this.color = customColor || (Math.random() > 0.4 ? "255, 110, 0" : "255, 60, 0");
  }

  update() {
    this.y -= this.speedY;
    this.opacity = Math.max(0, this.y / this.h);
    this.swayOffset += this.swaySpeed;
    this.xOffset = Math.sin(this.swayOffset) * this.swayWidth * 0.05;
    
    if (this.y < -10 || this.opacity <= 0.05) {
      this.y = this.h + Math.random() * 20;
      this.x = Math.random() * this.w;
      this.opacity = 1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.shadowBlur = this.size * 3;
    ctx.shadowColor = `rgba(${this.color}, 0.8)`;
    ctx.beginPath();
    ctx.arc(this.x + this.xOffset, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// 4.3 Steam/Smoke clouds
class SteamPuff {
  constructor(x, y, scale = 1, speedXMultiplier = 1, speedYMultiplier = 1) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 4 * scale;
    this.maxSize = Math.random() * 18 + 12 * scale;
    this.vx = (Math.random() * 0.4 - 0.2) * speedXMultiplier;
    this.vy = (Math.random() * -1.2 - 0.6) * speedYMultiplier;
    this.opacity = Math.random() * 0.35 + 0.15;
    this.growth = Math.random() * 0.15 + 0.08;
    this.sineFreq = Math.random() * 0.05 + 0.02;
    this.sinePhase = Math.random() * 100;
  }

  update() {
    this.x += this.vx + Math.sin(this.sinePhase) * 0.2;
    this.y += this.vy;
    this.size += this.growth;
    this.sinePhase += this.sineFreq;
    this.opacity -= 0.0035;
  }

  draw(ctx) {
    if (this.opacity <= 0) return;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    grad.addColorStop(0, `rgba(220, 225, 235, ${this.opacity})`);
    grad.addColorStop(0.5, `rgba(180, 185, 200, ${this.opacity * 0.4})`);
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const CanvasEngine = {
  activeLoops: {},

  startGlobalAtmosphere() {
    const skyCanvas = document.getElementById("ambient-sky-canvas");
    const rainCanvas = document.getElementById("ambient-rain-canvas");
    if (!skyCanvas || !rainCanvas) return;

    const skyCtx = skyCanvas.getContext("2d");
    const rainCtx = rainCanvas.getContext("2d");

    const resize = () => {
      skyCanvas.width = window.innerWidth;
      skyCanvas.height = window.innerHeight;
      rainCanvas.width = window.innerWidth;
      rainCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dynamic weather
    const rainDrops = Array.from({ length: 65 }, () => new RainDrop(rainCanvas.width, rainCanvas.height, 0.75));
    const skyStars = Array.from({ length: 45 }, () => ({
      x: Math.random() * skyCanvas.width,
      y: Math.random() * skyCanvas.height * 0.5,
      r: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * 0.02 + 0.005,
      phase: Math.random() * 100
    }));

    // Ambient fog elements in sky
    const skyFog = Array.from({ length: 4 }, () => ({
      x: Math.random() * skyCanvas.width,
      y: skyCanvas.height * 0.4 + Math.random() * 200,
      vx: Math.random() * 0.15 + 0.05,
      size: Math.random() * 150 + 150,
      opacity: Math.random() * 0.08 + 0.04
    }));

    const loop = () => {
      // Clear sky
      skyCtx.fillStyle = "#040508";
      skyCtx.fillRect(0, 0, skyCanvas.width, skyCanvas.height);
      
      // Draw Stars
      skyCtx.fillStyle = "#ffffff";
      skyStars.forEach(star => {
        star.phase += star.twinkle;
        const opacity = 0.2 + Math.sin(star.phase) * 0.25;
        skyCtx.globalAlpha = opacity;
        skyCtx.beginPath();
        skyCtx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        skyCtx.fill();
      });
      skyCtx.globalAlpha = 1.0;

      // Draw Sky Fog
      skyFog.forEach(fog => {
        fog.x += fog.vx;
        if (fog.x - fog.size > skyCanvas.width) {
          fog.x = -fog.size;
        }
        const grad = skyCtx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.size);
        grad.addColorStop(0, `rgba(255, 110, 0, ${fog.opacity})`); // Warm ambient orange mist
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        skyCtx.fillStyle = grad;
        skyCtx.beginPath();
        skyCtx.arc(fog.x, fog.y, fog.size, 0, Math.PI * 2);
        skyCtx.fill();
      });

      // Draw Rain
      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      rainDrops.forEach(drop => {
        drop.update();
        drop.draw(rainCtx);
      });

      this.activeLoops.global = requestAnimationFrame(loop);
    };
    loop();
  },

  // Bezel screen smoke leaks
  startPhoneSmoke() {
    const canvas = document.getElementById("phone-smoke-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 520;
    canvas.height = 950;

    const smokePuffs = [];
    const embers = [];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const activeScreen = STATE.currentScreen;
      let emitChance = 0.05;
      let isHot = false;

      if (activeScreen === "screen-opening") {
        emitChance = 0.06;
      } else if (activeScreen === "screen-loading") {
        emitChance = 0.16;
      } else if (activeScreen === "screen-menu" && document.getElementById("food-detail-modal").classList.contains("active")) {
        emitChance = 0.08 + (STATE.spiceLevel / 350);
        if (STATE.spiceLevel > 50) isHot = true;
      }

      if (Math.random() < emitChance) {
        const rand = Math.random();
        let sx, sy;
        if (rand < 0.3) {
          // Left bezel boundary
          sx = 54;
          sy = 100 + Math.random() * (canvas.height - 200);
        } else if (rand < 0.6) {
          // Right bezel boundary
          sx = canvas.width - 54;
          sy = 100 + Math.random() * (canvas.height - 200);
        } else {
          // Top bezel boundary
          sx = 100 + Math.random() * (canvas.width - 200);
          sy = 54;
        }

        const centerX = canvas.width / 2;
        const vxMultiplier = sx < centerX ? -0.5 : 0.5;
        const puff = new SteamPuff(sx, sy, 1.4, vxMultiplier, 0.45);
        if (isHot) {
          puff.opacity = Math.random() * 0.45 + 0.25;
        }
        smokePuffs.push(puff);

        if (isHot && Math.random() < 0.35) {
          embers.push({
            x: sx,
            y: sy,
            vx: (sx < centerX ? -1.5 : 1.5) * (Math.random() * 2 + 1.2),
            vy: (Math.random() * -3 - 1.5),
            size: Math.random() * 2.2 + 1,
            opacity: 1
          });
        }
      }

      for (let i = smokePuffs.length - 1; i >= 0; i--) {
        const puff = smokePuffs[i];
        puff.update();
        puff.draw(ctx);
        if (puff.opacity <= 0) {
          smokePuffs.splice(i, 1);
        }
      }

      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(255, 110, 0, 0.9)";
      for (let i = embers.length - 1; i >= 0; i--) {
        const s = embers[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.015;
        if (s.opacity <= 0) {
          embers.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(255, 60, 0, ${s.opacity})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;

      this.activeLoops.phone_smoke = requestAnimationFrame(loop);
    };
    loop();
  },

  setupOpeningScreen() {
    const canvas = document.getElementById("opening-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const rainDrops = Array.from({ length: 25 }, () => new RainDrop(canvas.width, canvas.height, 0.8));
    const embers = Array.from({ length: 20 }, () => new Ember(canvas.width, canvas.height, "255, 110, 0", 0.7));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rainDrops.forEach(drop => {
        drop.update();
        drop.draw(ctx);
      });
      embers.forEach(ember => {
        ember.update();
        ember.draw(ctx);
      });
      this.activeLoops.opening = requestAnimationFrame(loop);
    };
    loop();
  },

  setupLoadingScreen() {
    const canvas = document.getElementById("loading-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const embers = Array.from({ length: 30 }, () => new Ember(canvas.width, canvas.height, "255, 80, 0", 1.8));
    const steamPuffs = [];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.15) {
        steamPuffs.push(new SteamPuff(canvas.width / 2 + (Math.random() * 40 - 20), canvas.height / 2 + 10, 1.4, 0.4, 1.2));
      }

      embers.forEach(ember => {
        ember.update();
        ember.draw(ctx);
      });

      for (let i = steamPuffs.length - 1; i >= 0; i--) {
        const puff = steamPuffs[i];
        puff.update();
        puff.draw(ctx);
        if (puff.opacity <= 0 || puff.size >= puff.maxSize) {
          steamPuffs.splice(i, 1);
        }
      }

      this.activeLoops.loading = requestAnimationFrame(loop);
    };
    loop();
  },

  setupRestaurantsScreen() {
    const canvas = document.getElementById("restaurants-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const embers = Array.from({ length: 15 }, () => new Ember(canvas.width, canvas.height, "255, 140, 0", 0.5));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach(ember => {
        ember.update();
        ember.draw(ctx);
      });
      this.activeLoops.restaurants = requestAnimationFrame(loop);
    };
    loop();
  },

  setupCardSteam(cardElement) {
    const canvas = cardElement.querySelector(".card-steam-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = cardElement.offsetWidth;
    canvas.height = cardElement.offsetHeight;

    const steamPuffs = [];
    const type = cardElement.dataset.restaurant;
    let startX = canvas.width / 2;
    let startY = canvas.height * 0.65;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.08) {
        steamPuffs.push(new SteamPuff(startX + (Math.random() * 20 - 10), startY, 0.8, 0.3, 0.6));
      }

      for (let i = steamPuffs.length - 1; i >= 0; i--) {
        const puff = steamPuffs[i];
        puff.update();
        puff.draw(ctx);
        if (puff.opacity <= 0) {
          steamPuffs.splice(i, 1);
        }
      }
      this.activeLoops[`card_steam_${type}`] = requestAnimationFrame(loop);
    };
    loop();
  },

  stopCardSteam(cardElement) {
    const type = cardElement.dataset.restaurant;
    if (this.activeLoops[`card_steam_${type}`]) {
      cancelAnimationFrame(this.activeLoops[`card_steam_${type}`]);
      delete this.activeLoops[`card_steam_${type}`];
    }
  },

  setupDetailSteam() {
    const canvas = document.getElementById("detail-steam-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const steamPuffs = [];
    const sparks = [];

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 10;
      const spiceScale = STATE.spiceLevel / 100;

      const spawnChance = 0.1 + (spiceScale * 0.15);
      if (Math.random() < spawnChance) {
        steamPuffs.push(new SteamPuff(centerX + (Math.random() * 30 - 15), centerY + 15, 1 + spiceScale * 0.5, 0.4, 0.8 + spiceScale * 0.4));
      }

      if (spiceScale > 0.3 && Math.random() < (spiceScale * 0.35)) {
        sparks.push({
          x: centerX + (Math.random() * 40 - 20),
          y: centerY + 10,
          vx: (Math.random() * 3 - 1.5) * (spiceScale + 0.5),
          vy: (Math.random() * -3 - 2) * (spiceScale + 0.5),
          opacity: 1,
          size: Math.random() * 2 + 1
        });
      }

      for (let i = steamPuffs.length - 1; i >= 0; i--) {
        const puff = steamPuffs[i];
        puff.update();
        puff.draw(ctx);
        if (puff.opacity <= 0) {
          steamPuffs.splice(i, 1);
        }
      }

      const glowR = Math.floor(255);
      const glowG = Math.floor(100 - (spiceScale * 60));
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.02;
        if (s.opacity <= 0) {
          sparks.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(${glowR}, ${glowG}, 0, ${s.opacity})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = `rgba(${glowR}, ${glowG}, 0, 0.8)`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      this.activeLoops.detail_steam = requestAnimationFrame(loop);
    };
    loop();
  },

  setupCheckoutScreen() {
    const canvas = document.getElementById("checkout-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const embers = Array.from({ length: 15 }, () => new Ember(canvas.width, canvas.height, "255, 90, 0", 0.6));

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach(ember => {
        ember.update();
        ember.draw(ctx);
      });
      this.activeLoops.checkout = requestAnimationFrame(loop);
    };
    loop();
  },

  setupTravelJourneyLoops() {
    const roadCanvas = document.getElementById("travel-road-canvas");
    const kitchenCanvas = document.getElementById("travel-kitchen-canvas");
    if (!roadCanvas || !kitchenCanvas) return;

    const roadCtx = roadCanvas.getContext("2d");
    const kitchenCtx = kitchenCanvas.getContext("2d");

    roadCanvas.width = roadCanvas.parentElement.offsetWidth;
    roadCanvas.height = roadCanvas.parentElement.offsetHeight;
    kitchenCanvas.width = kitchenCanvas.parentElement.offsetWidth;
    kitchenCanvas.height = kitchenCanvas.parentElement.offsetHeight;

    let gridOffset = 0;
    const rainDrops = Array.from({ length: 25 }, () => new RainDrop(roadCanvas.width, roadCanvas.height, 1.2));
    const roadSplashes = [];

    const kitchenEmbers = Array.from({ length: 15 }, () => new Ember(kitchenCanvas.width, kitchenCanvas.height, "255, 60, 0", 0.9));
    const kitchenSteam = [];

    const loop = () => {
      roadCtx.clearRect(0, 0, roadCanvas.width, roadCanvas.height);
      roadCtx.strokeStyle = "rgba(255, 60, 0, 0.12)";
      roadCtx.lineWidth = 2;
      gridOffset = (gridOffset + 4) % 40;
      
      const horizonY = roadCanvas.height * 0.2;
      const centerY = roadCanvas.width / 2;
      
      for (let x = -100; x <= roadCanvas.width + 100; x += 60) {
        roadCtx.beginPath();
        roadCtx.moveTo(x, roadCanvas.height);
        roadCtx.lineTo(centerY + (x - centerY) * 0.05, horizonY);
        roadCtx.stroke();
      }

      for (let y = horizonY + gridOffset; y < roadCanvas.height; y += 40) {
        const py = horizonY + Math.pow((y - horizonY) / (roadCanvas.height - horizonY), 1.5) * (roadCanvas.height - horizonY);
        roadCtx.beginPath();
        roadCtx.moveTo(0, py);
        roadCtx.lineTo(roadCanvas.width, py);
        roadCtx.stroke();
      }

      rainDrops.forEach(drop => {
        drop.update();
        drop.draw(roadCtx);
        if (Math.random() < 0.04) {
          roadSplashes.push({
            x: drop.x,
            y: roadCanvas.height - Math.random() * 100,
            radius: 1,
            maxRadius: Math.random() * 8 + 4,
            opacity: 0.6
          });
        }
      });

      roadCtx.strokeStyle = "rgba(174, 219, 255, 0.4)";
      roadCtx.lineWidth = 1;
      for (let i = roadSplashes.length - 1; i >= 0; i--) {
        const s = roadSplashes[i];
        s.radius += 0.4;
        s.opacity -= 0.02;
        if (s.opacity <= 0) {
          roadSplashes.splice(i, 1);
        } else {
          roadCtx.beginPath();
          roadCtx.ellipse(s.x, s.y, s.radius, s.radius * 0.3, 0, 0, Math.PI * 2);
          roadCtx.stroke();
        }
      }

      kitchenCtx.clearRect(0, 0, kitchenCanvas.width, kitchenCanvas.height);
      kitchenEmbers.forEach(ember => {
        ember.update();
        ember.draw(kitchenCtx);
      });

      if (Math.random() < 0.12) {
        kitchenSteam.push(new SteamPuff(kitchenCanvas.width / 2 + (Math.random() * 30 - 15), kitchenCanvas.height * 0.6, 1.1, 0.4, 0.7));
      }
      for (let i = kitchenSteam.length - 1; i >= 0; i--) {
        const puff = kitchenSteam[i];
        puff.update();
        puff.draw(kitchenCtx);
        if (puff.opacity <= 0) {
          kitchenSteam.splice(i, 1);
        }
      }

      this.activeLoops.travel = requestAnimationFrame(loop);
    };
    loop();
  },

  setupArrivalScreen() {
    const canvas = document.getElementById("arrival-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;

    const steamPuffs = [];
    const embers = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.4;

    for (let i = 0; i < 20; i++) {
      embers.push(new Ember(canvas.width, canvas.height, "255, 170, 0", 0.4));
    }

    for (let i = 0; i < 35; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      const puff = new SteamPuff(centerX, centerY, 2.5);
      puff.vx = Math.cos(angle) * speed;
      puff.vy = Math.sin(angle) * speed - 0.5;
      puff.opacity = Math.random() * 0.5 + 0.3;
      puff.growth = Math.random() * 0.4 + 0.2;
      steamPuffs.push(puff);
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach(ember => {
        ember.update();
        ember.draw(ctx);
      });

      if (Math.random() < 0.15) {
        ctx.fillStyle = "rgba(255, 215, 0, 0.7)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
        ctx.beginPath();
        ctx.arc(centerX + (Math.random() * 120 - 60), centerY + (Math.random() * 100 - 50), Math.random() * 2 + 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      for (let i = steamPuffs.length - 1; i >= 0; i--) {
        const puff = steamPuffs[i];
        puff.update();
        puff.draw(ctx);
        if (puff.opacity <= 0) {
          steamPuffs.splice(i, 1);
        }
      }

      this.activeLoops.arrival = requestAnimationFrame(loop);
    };
    loop();
  },

  clearLoops(exclude = null) {
    Object.keys(this.activeLoops).forEach(key => {
      if (key !== exclude && key !== "global" && key !== "phone_smoke") {
        cancelAnimationFrame(this.activeLoops[key]);
        delete this.activeLoops[key];
      }
    });
  }
};

// --- 5. CAMERA 3D TILT & PHYSICAL SHINE PARALLAX ---
function setup3DCameraParallax() {
  const phone = document.getElementById("interactive-phone");
  const shine = document.getElementById("phone-screen-shine-element");
  const layerSky = document.querySelector(".parallax-layer-sky");
  const layerStalls = document.querySelector(".parallax-layer-stalls");
  const layerFore = document.querySelector(".parallax-layer-foreground");
  
  const lanternLeft = document.querySelector(".foreground-lantern-wrapper.lantern-left");
  const lanternRight = document.querySelector(".foreground-lantern-wrapper.lantern-right");

  if (!phone) return;

  let request = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener("mousemove", (e) => {
    const px = (e.clientX / window.innerWidth) - 0.5;
    const py = (e.clientY / window.innerHeight) - 0.5;

    targetX = px;
    targetY = py;

    if (!request) {
      request = requestAnimationFrame(updateCamera);
    }
  });

  function updateCamera() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // 1. Tilt phone container
    const rotateX = -currentY * 17;
    const rotateY = currentX * 17;
    phone.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

    // 2. Translate physical screen glass shine overlay (slides opposite to tilt)
    if (shine) {
      shine.style.transform = `translate3d(${-currentX * 25}px, ${-currentY * 25}px, 0) rotate(5deg) scale(1.15)`;
    }

    // 3. Pan Parallax street environment layers
    if (layerSky) {
      layerSky.style.transform = `translate(${currentX * 15}px, ${currentY * 15}px)`;
    }
    if (layerStalls) {
      layerStalls.style.transform = `translate(${-currentX * 45}px, ${-currentY * 45}px)`;
    }
    if (layerFore) {
      layerFore.style.transform = `translate(${-currentX * 90}px, ${-currentY * 90}px)`;
    }

    // 4. Heavily pan foreground blurry lanterns in opposition to mock depth focus
    if (lanternLeft) {
      lanternLeft.style.transform = `scale(1.4) translate3d(${-currentX * 130}px, ${-currentY * 65}px, 0) rotate(${-currentX * 3}deg)`;
    }
    if (lanternRight) {
      lanternRight.style.transform = `scale(1.3) translate3d(${-currentX * 150}px, ${-currentY * 75}px, 0) rotate(${currentX * 3}deg)`;
    }

    request = requestAnimationFrame(updateCamera);
  }
}

// --- 6. DYNAMIC OVERLAY TRANSITIONS & CAPTION SYNC ---
function transitionTo(targetScreenId, callback = null) {
  const container = document.getElementById("app-screen-container");
  const currentActive = document.querySelector(".screen.active");
  const targetScreen = document.getElementById(targetScreenId);

  if (!targetScreen || STATE.currentScreen === targetScreenId) return;

  // Sync poster text caption
  updatePosterCaptions(targetScreenId.replace("screen-", ""));

  if (targetScreenId === "screen-loading") {
    window.SoundEngine.playIgnite();
    updateScreenGlowColor("rgba(255, 60, 0, 0.35)");
  } else {
    window.SoundEngine.playWhoosh();
  }

  CanvasEngine.clearLoops();
  container.classList.add("transitioning");
  
  const displacementMap = document.querySelector("#screen-warp-filter feDisplacementMap");
  let maxScale = 50;
  let duration = 500;
  let startTime = null;

  function animateWarp(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    let scale = 0;

    if (progress < duration / 2) {
      scale = (progress / (duration / 2)) * maxScale;
    } else if (progress < duration) {
      if (currentActive && currentActive.classList.contains("active")) {
        currentActive.classList.remove("active");
        targetScreen.classList.add("active");
        if (callback) callback();
      }
      scale = maxScale - ((progress - (duration / 2)) / (duration / 2)) * maxScale;
    } else {
      scale = 0;
    }

    displacementMap.setAttribute("scale", scale);

    if (progress < duration) {
      requestAnimationFrame(animateWarp);
    } else {
      container.classList.remove("transitioning");
      STATE.currentScreen = targetScreenId;
    }
  }

  requestAnimationFrame(animateWarp);
}

// Sync poster caption next to the phone mockup (with fade/drift effect)
function updatePosterCaptions(screenKey) {
  const captionBox = document.getElementById("poster-caption-container");
  const lineMain = document.getElementById("caption-text-main");
  const lineSub = document.getElementById("caption-text-sub");
  const texts = POSTER_CAPTIONS[screenKey];

  if (!captionBox || !lineMain || !lineSub || !texts) return;

  // Fade out
  captionBox.style.opacity = "0";
  captionBox.style.transform = "translateY(8px)";

  setTimeout(() => {
    // Swap text
    lineMain.textContent = texts.main;
    lineSub.textContent = texts.sub;

    // Fade back in
    captionBox.style.opacity = "1";
    captionBox.style.transform = "translateY(0)";
  }, 250);
}

// Reactive screen ambient glow changer
function updateScreenGlowColor(colorStr) {
  document.documentElement.style.setProperty("--screen-glow-color", colorStr);
}

// --- 7. EVENT CONTROLLERS ---

// Setup 3D tilting on Restaurant Cards
function setupCardTiltInteractions() {
  const cards = document.querySelectorAll(".restaurant-card");
  
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      CanvasEngine.setupCardSteam(card);
    });

    card.addEventListener("mouseleave", () => {
      CanvasEngine.stopCardSteam(card);
      card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
      card.style.borderColor = "rgba(255, 255, 255, 0.05)";
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;
      
      const rx = -py * 16;
      const ry = px * 16;

      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
      
      const neonColor = card.querySelector(".card-neon-sign").classList.contains("red-neon") ? "var(--color-neon-ramen)" :
                        card.querySelector(".card-neon-sign").classList.contains("orange-neon") ? "var(--color-neon-biryani)" :
                        card.querySelector(".card-neon-sign").classList.contains("grill-neon") ? "var(--color-neon-grill)" : "var(--color-neon-dimsum)";
      card.style.borderColor = neonColor;
      card.style.boxShadow = `0 15px 35px rgba(0,0,0,0.7), 0 0 15px ${neonColor}33`;
    });

    card.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;
      const rx = -py * 10;
      const ry = px * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(5px)`;
    });

    card.addEventListener("touchend", () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });

    card.addEventListener("click", () => {
      window.SoundEngine.playClick();
      const restaurantType = card.dataset.restaurant;
      STATE.selectedRestaurant = restaurantType;
      
      const data = RESTAURANT_DATA[restaurantType];
      if (data) {
        updateScreenGlowColor(data.glowColor);
      }

      card.style.transform = `scale(1.15) translateZ(40px)`;
      card.style.zIndex = "100";
      
      setTimeout(() => {
        transitionTo("screen-menu", () => {
          loadMenuScreen(restaurantType);
        });
      }, 300);
    });
  });

  // Scroll listener to shift glows on selection swiping
  const container = document.getElementById("restaurant-cards-container");
  const dots = document.querySelectorAll(".swipe-indicator .dot");
  
  container.addEventListener("scroll", () => {
    const width = container.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / width);
    
    dots.forEach((dot, idx) => {
      if (idx === index) dot.classList.add("active");
      else dot.classList.remove("active");
    });

    const keys = ["ramen", "biryani", "grill", "dimsum"];
    const activeKey = keys[index];
    if (activeKey && RESTAURANT_DATA[activeKey]) {
      updateScreenGlowColor(RESTAURANT_DATA[activeKey].glowColor);
    }
  });
}

// Populate menu items
function loadMenuScreen(restaurantType) {
  const data = RESTAURANT_DATA[restaurantType];
  if (!data) return;

  document.getElementById("menu-restaurant-name").textContent = data.name;
  document.getElementById("menu-realm-title").textContent = data.realm;
  document.getElementById("menu-hero-banner").style.backgroundImage = `url('${data.banner}')`;

  const container = document.getElementById("menu-items-container");
  container.innerHTML = "";

  data.menu.forEach(item => {
    const row = document.createElement("div");
    row.className = "menu-item-row";
    row.innerHTML = `
      <div class="item-thumb-wrapper">
        <div class="item-thumb-svg">${item.svg}</div>
      </div>
      <div class="item-text-details">
        <h4>${item.name}</h4>
        <p class="item-desc-short">${item.desc}</p>
        <div class="item-price-row">
          <span class="item-price">$${item.price.toFixed(2)}</span>
          <button class="item-add-icon">+</button>
        </div>
      </div>
    `;

    row.addEventListener("click", () => {
      window.SoundEngine.playClick();
      openFoodDetailModal(item);
    });

    container.appendChild(row);
  });

  updateCartBarFloating();
}

// Food Modal Sheet
let detailRotationY = 0;
let modalSpiceSlider = null;

function openFoodDetailModal(item) {
  const modal = document.getElementById("food-detail-modal");
  modal.classList.add("active");

  document.getElementById("detail-food-name").textContent = item.name;
  document.getElementById("detail-food-desc").textContent = item.desc;
  document.getElementById("detail-food-price").textContent = `$${item.price.toFixed(2)}`;

  const wrapper = document.getElementById("layered-food-renderer");
  wrapper.innerHTML = item.svg;

  STATE.spiceLevel = 20;
  modalSpiceSlider = document.getElementById("spice-slider");
  modalSpiceSlider.value = STATE.spiceLevel;
  updateSpiceVisuals(STATE.spiceLevel);

  CanvasEngine.setupDetailSteam();

  let isDragging = false;
  let startX = 0;
  
  const startDrag = (e) => {
    isDragging = true;
    startX = e.clientX || e.touches[0].clientX;
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || e.touches[0].clientX;
    const delta = clientX - startX;
    startX = clientX;
    
    detailRotationY += delta * 0.8;
    const svg = wrapper.querySelector("svg");
    if (svg) {
      svg.style.setProperty("--rotate-y", `${detailRotationY}deg`);
    }
  };

  const endDrag = () => { isDragging = false; };

  wrapper.addEventListener("mousedown", startDrag);
  wrapper.addEventListener("touchstart", startDrag);
  window.addEventListener("mousemove", doDrag);
  window.addEventListener("touchmove", doDrag);
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);

  // Modal Add Button
  const addBtn = document.getElementById("btn-add-to-cart");
  const newAddBtn = addBtn.cloneNode(true);
  addBtn.parentNode.replaceChild(newAddBtn, addBtn);

  newAddBtn.addEventListener("click", () => {
    window.SoundEngine.playOrderChime();
    
    const cartItem = {
      ...item,
      spice: STATE.spiceLevel,
      customName: `${item.name} (${getSpiceLabel(STATE.spiceLevel)})`
    };

    STATE.cart.push(cartItem);
    closeFoodDetailModal();
    updateCartBarFloating();
    
    const screen = document.getElementById("interactive-phone");
    screen.style.transform = "scale3d(0.96, 0.96, 0.96) translateZ(-20px)";
    setTimeout(() => { screen.style.transform = ""; }, 250);
  });
}

function closeFoodDetailModal() {
  const modal = document.getElementById("food-detail-modal");
  modal.classList.remove("active");
  
  const data = RESTAURANT_DATA[STATE.selectedRestaurant];
  if (data) {
    updateScreenGlowColor(data.glowColor);
  }
}

// Adjust spice slider, change backdrop color and shake phone on intense levels
function updateSpiceVisuals(value) {
  STATE.spiceLevel = value;
  const label = document.getElementById("heat-value");
  label.textContent = getSpiceLabel(value);

  const hue = 35 - (value * 0.45);
  const lightness = 40 + (value * 0.1);
  const glow = document.getElementById("food-glow-effect");
  
  glow.style.background = `radial-gradient(circle, hsla(${hue}, 100%, ${lightness}%, 0.4) 0%, hsla(${hue}, 100%, 30%, 0) 70%)`;
  updateScreenGlowColor(`hsla(${hue}, 100%, 45%, ${0.2 + (value/300)})`);

  if (modalSpiceSlider) {
    modalSpiceSlider.style.setProperty("--color-primary", `hsl(${hue}, 100%, ${lightness}%)`);
  }

  if (value > 85) {
    const phone = document.getElementById("interactive-phone");
    phone.style.animation = "flicker-stove-anim 0.05s infinite alternate";
    setTimeout(() => { phone.style.animation = ""; }, 150);
  }
}

function getSpiceLabel(value) {
  if (value < 25) return "MILD GLOW";
  if (value < 55) return "CHARCOAL SEAR";
  if (value < 85) return "INFERNO BURST";
  return "SUPERNOVA RAGE";
}

function updateCartBarFloating() {
  const cartBar = document.getElementById("floating-cart");
  if (STATE.cart.length === 0) {
    cartBar.classList.add("hidden");
    return;
  }

  cartBar.classList.remove("hidden");
  document.getElementById("cart-item-count").textContent = STATE.cart.length;

  const total = STATE.cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-total-price").textContent = `$${total.toFixed(2)}`;
}

function loadCheckoutScreen() {
  const list = document.getElementById("checkout-items-list");
  list.innerHTML = "";

  STATE.cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "ticket-row";
    row.style.marginBottom = "8px";
    row.innerHTML = `
      <span>${item.customName}</span>
      <strong>$${item.price.toFixed(2)}</strong>
    `;
    list.appendChild(row);
  });

  const total = STATE.cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("checkout-total").textContent = `$${total.toFixed(2)}`;

  updateScreenGlowColor("rgba(255, 60, 0, 0.2)");
  CanvasEngine.setupCheckoutScreen();
}

// Live travel syncing progression
function setupTravelDashboardSync() {
  const handle = document.getElementById("sync-progress-handle");
  const fill = document.getElementById("sync-progress-fill");
  const track = handle.parentElement;
  
  const distanceMetric = document.getElementById("travel-distance-metric");
  const kitchenMetric = document.getElementById("travel-kitchen-metric");
  const percentageLabel = document.getElementById("sync-percentage");

  let isSliding = false;

  const updateProgress = (clientX) => {
    const rect = track.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));

    STATE.travelProgress = Math.floor(ratio * 100);
    
    fill.style.width = `${STATE.travelProgress}%`;
    handle.style.left = `${STATE.travelProgress}%`;
    percentageLabel.textContent = `${STATE.travelProgress}%`;

    const distanceMeters = Math.max(0, Math.round(500 - (ratio * 500)));
    distanceMetric.textContent = `${distanceMeters}m away`;

    updateScreenGlowColor(`rgba(255, ${100 + ratio * 100}, 0, 0.3)`);

    const stages = document.querySelectorAll(".kitchen-stage");
    stages.forEach(st => st.classList.remove("active"));

    if (STATE.travelProgress < 33) {
      document.getElementById("kitchen-stage-chop").classList.add("active");
      kitchenMetric.textContent = "Chop & Prep";
      document.getElementById("sync-status-main").textContent = "SYNCHRONIZING PATHS";
    } else if (STATE.travelProgress < 75) {
      document.getElementById("kitchen-stage-fire").classList.add("active");
      kitchenMetric.textContent = "Flame Sizzle";
      document.getElementById("sync-status-main").textContent = "KITCHEN IN FERVENT FLOW";
    } else {
      document.getElementById("kitchen-stage-pack").classList.add("active");
      kitchenMetric.textContent = "Pack & Seal";
      
      if (STATE.travelProgress >= 100) {
        kitchenMetric.textContent = "READY & FRESH";
        document.getElementById("sync-status-main").textContent = "CONVENANT ARRIVAL";
        setTimeout(() => { triggerArrivalMoment(); }, 300);
      } else {
        document.getElementById("sync-status-main").textContent = "LOCKING COORDINATES";
      }
    }
  };

  const startSlide = (e) => {
    isSliding = true;
    updateProgress(e.clientX || e.touches[0].clientX);
  };

  const moveSlide = (e) => {
    if (!isSliding) return;
    updateProgress(e.clientX || e.touches[0].clientX);
  };

  const stopSlide = () => { isSliding = false; };

  track.addEventListener("mousedown", startSlide);
  track.addEventListener("touchstart", startSlide);
  window.addEventListener("mousemove", moveSlide);
  window.addEventListener("touchmove", moveSlide);
  window.addEventListener("mouseup", stopSlide);
  window.addEventListener("touchend", stopSlide);

  CanvasEngine.setupTravelJourneyLoops();
}

function triggerArrivalMoment() {
  transitionTo("screen-arrival", () => {
    const displayPlate = document.getElementById("arrival-plate-display");
    if (STATE.cart.length > 0) {
      displayPlate.innerHTML = STATE.cart[0].svg;
    } else {
      displayPlate.innerHTML = `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="#fff" /></svg>`;
    }
    
    updateScreenGlowColor("rgba(255, 170, 0, 0.45)");
    window.SoundEngine.playOrderChime();
    CanvasEngine.setupArrivalScreen();
  });
}

// --- 8. INITIALIZE DOM EVENTS ---
document.addEventListener("DOMContentLoaded", () => {
  
  CanvasEngine.startGlobalAtmosphere();
  CanvasEngine.startPhoneSmoke();
  setup3DCameraParallax();
  CanvasEngine.setupOpeningScreen();

  // Sound Toggle
  const soundToggle = document.getElementById("btn-sound-toggle");
  const iconOn = soundToggle.querySelector(".icon-sound-on");
  const iconOff = soundToggle.querySelector(".icon-sound-off");

  soundToggle.addEventListener("click", () => {
    const isMuted = window.SoundEngine.toggleMute();
    if (isMuted) {
      iconOn.classList.add("hidden");
      iconOff.classList.remove("hidden");
    } else {
      iconOn.classList.remove("hidden");
      iconOff.classList.add("hidden");
    }
  });

  // Start Craving
  const startCravingBtn = document.getElementById("btn-start-craving");
  startCravingBtn.addEventListener("click", () => {
    window.SoundEngine.init();
    window.SoundEngine.resume();
    if (window.SoundEngine.muted) {
      soundToggle.click();
    }

    transitionTo("screen-loading", () => {
      CanvasEngine.setupLoadingScreen();

      const progressFill = document.getElementById("loading-progress-bar");
      const statusText = document.getElementById("loading-status-text");
      const loadingStatuses = [
        "Igniting the stoves...",
        "Boiling the broth...",
        "Measuring spices...",
        "Locking coordinates...",
        "Assembling realms..."
      ];
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 3;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        
        const idx = Math.floor((progress / 100) * loadingStatuses.length);
        if (loadingStatuses[idx]) {
          statusText.textContent = loadingStatuses[idx];
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            transitionTo("screen-restaurants", () => {
              CanvasEngine.setupRestaurantsScreen();
              setupCardTiltInteractions();
              updateScreenGlowColor("rgba(255, 0, 85, 0.35)");
            });
          }, 400);
        }
      }, 90);
    });
  });

  // Back from menu
  document.getElementById("btn-menu-back").addEventListener("click", () => {
    window.SoundEngine.playClick();
    transitionTo("screen-restaurants", () => {
      CanvasEngine.setupRestaurantsScreen();
      setupCardTiltInteractions();
      
      const container = document.getElementById("restaurant-cards-container");
      const width = container.offsetWidth;
      const index = Math.round(container.scrollLeft / width);
      const keys = ["ramen", "biryani", "grill", "dimsum"];
      const activeKey = keys[index] || "ramen";
      updateScreenGlowColor(RESTAURANT_DATA[activeKey].glowColor);
    });
  });

  // Modal actions
  document.getElementById("btn-modal-close").addEventListener("click", () => {
    window.SoundEngine.playClick();
    closeFoodDetailModal();
  });
  document.getElementById("modal-dim-close").addEventListener("click", () => {
    window.SoundEngine.playClick();
    closeFoodDetailModal();
  });

  document.getElementById("spice-slider").addEventListener("input", (e) => {
    updateSpiceVisuals(parseInt(e.target.value));
  });

  // Checkout transitions
  document.getElementById("btn-trigger-checkout").addEventListener("click", () => {
    window.SoundEngine.playClick();
    transitionTo("screen-checkout", () => {
      loadCheckoutScreen();
    });
  });

  document.getElementById("btn-checkout-back").addEventListener("click", () => {
    window.SoundEngine.playClick();
    transitionTo("screen-menu", () => {
      loadMenuScreen(STATE.selectedRestaurant);
    });
  });

  // Receipt burn
  document.getElementById("btn-ignite-order").addEventListener("click", () => {
    window.SoundEngine.playIgnite();
    const ticket = document.getElementById("checkout-ticket");
    ticket.classList.add("burnt");

    setTimeout(() => {
      ticket.classList.remove("burnt");
      transitionTo("screen-travel", () => {
        STATE.travelProgress = 0;
        const fill = document.getElementById("sync-progress-fill");
        const handle = document.getElementById("sync-progress-handle");
        fill.style.width = "0%";
        handle.style.left = "0%";
        setupTravelDashboardSync();
      });
    }, 850);
  });

  // Reset
  document.getElementById("btn-order-again").addEventListener("click", () => {
    window.SoundEngine.playClick();
    STATE.cart = [];
    transitionTo("screen-restaurants", () => {
      CanvasEngine.setupRestaurantsScreen();
      setupCardTiltInteractions();
    });
  });
});
