/**
 * Quick Bite — Sound Engine
 * Generates cinematic synthesizer audio in real-time using the Web Audio API.
 * Avoids any assets loading requirements.
 */

class CinematicSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.ambientSource = null;
    this.ambientNodes = [];
    this.cracklingInterval = null;
  }

  // Initialize Web Audio Context after user gesture
  init() {
    if (this.ctx) return;
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser.");
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.init();
    this.resume();
    this.muted = !this.muted;

    if (this.muted) {
      this.stopAmbience();
    } else {
      this.startAmbience();
    }
    return this.muted;
  }

  // Helper: create white noise buffer
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  // Ambient late-night street rumble, rain, and fire crackling
  startAmbience() {
    if (this.muted || !this.ctx) return;
    this.stopAmbience(); // clear if running
    
    this.resume();

    // 1. LOW STREEL RUMBLE / DRONE (Warm Hum)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const lowpass = this.ctx.createBiquadFilter();
    const gainAmb = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 hum
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 octave overlay
    osc2.detune.setValueAtTime(8, this.ctx.currentTime); // detune for chorus warmth

    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(120, this.ctx.currentTime);

    gainAmb.gain.setValueAtTime(0.04, this.ctx.currentTime);

    osc1.connect(lowpass);
    osc2.connect(lowpass);
    lowpass.connect(gainAmb);
    gainAmb.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    this.ambientNodes.push(osc1, osc2, lowpass, gainAmb);

    // 2. RAIN HISS (Lowpass Filtered White Noise)
    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const rainSource = this.ctx.createBufferSource();
      const rainFilter = this.ctx.createBiquadFilter();
      const rainGain = this.ctx.createGain();

      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(1100, this.ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      rainGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ctx.destination);

      rainSource.start();
      this.ambientNodes.push(rainSource, rainFilter, rainGain);
    }

    // 3. FIREPLACE CRACKLING (Random Pops)
    this.cracklingInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        this.playCrackle();
      }
    }, 120);
  }

  stopAmbience() {
    this.ambientNodes.forEach(node => {
      try {
        node.stop();
      } catch(e) {}
      try {
        node.disconnect();
      } catch(e) {}
    });
    this.ambientNodes = [];
    if (this.cracklingInterval) {
      clearInterval(this.cracklingInterval);
      this.cracklingInterval = null;
    }
  }

  // Individual crackle pop
  playCrackle() {
    if (this.muted || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(Math.random() * 400 + 40, this.ctx.currentTime);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1500, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.05);
  }

  // --- TRANSITIONAL FX ---

  // Tactile click/tap sound
  playClick() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.06);

    gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // Transition swoosh/whoosh sound (Filtered noise sweep)
  playWhoosh() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;

    const source = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    source.buffer = noiseBuffer;

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(150, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 0.4);
    filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.75);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.75);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    source.start();
    source.stop(this.ctx.currentTime + 0.8);
  }

  // Kitchen Flame Ignite Pop
  playIgnite() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const now = this.ctx.currentTime;
    
    // Deep Sub Hum rumble
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.5);

    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start();
    subOsc.stop(now + 0.7);

    // Friction swoosh component
    const noiseBuffer = this.createNoiseBuffer();
    if (noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      noise.buffer = noiseBuffer;
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.45);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(now + 0.55);
    }
  }

  // Harmonious Order success chime bell
  playOrderChime() {
    if (this.muted || !this.ctx) return;
    this.resume();

    const now = this.ctx.currentTime;
    const notes = [261.63 * 2, 329.63 * 2, 392.00 * 2, 523.25 * 2]; // C5, E5, G5, C6 (Bright Chord)

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft bell timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + (index * 0.07));
      
      gain.gain.setValueAtTime(0, now + (index * 0.07));
      gain.gain.linearRampToValueAtTime(0.06, now + (index * 0.07) + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (index * 0.07) + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + (index * 0.07));
      osc.stop(now + (index * 0.07) + 1.3);
    });

    // Substantial base gong glow
    const gong = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();
    gong.type = 'triangle';
    gong.frequency.setValueAtTime(130.81, now); // C3 fundamental
    
    gongGain.gain.setValueAtTime(0.18, now);
    gongGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    gong.connect(gongGain);
    gongGain.connect(this.ctx.destination);
    
    gong.start(now);
    gong.stop(now + 2.0);
  }
}

// Instantiate globally
window.SoundEngine = new CinematicSoundEngine();
