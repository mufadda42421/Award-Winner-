/**
 * Procedural Romantic Ambient Audio Synthesizer + Sound Effects Engine
 * Generates lush, gentle piano/celesta chords, warm atmospheric pads,
 * and delicate cinematic sound design effects using Web Audio API.
 * 100% zero-404, guaranteed zero external dependencies.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomFile = false;

  // Romantic chord progression in Hz (Cmaj9, Am9, Fmaj7#11, Gsus4/add9)
  private chords = [
    [130.81, 196.00, 246.94, 293.66, 329.63, 493.88], // Cmaj9
    [110.00, 164.81, 220.00, 261.63, 329.63, 440.00], // Am9
    [87.31, 130.81, 174.61, 220.00, 261.63, 369.99], // Fmaj7#11
    [98.00, 146.83, 196.00, 246.94, 293.66, 440.00], // G9sus
  ];
  private currentChordIndex = 0;

  constructor() {
    try {
      this.customAudio = new Audio('/music/romantic.mp3');
      this.customAudio.loop = true;
      this.customAudio.volume = 0.4;
      this.customAudio.addEventListener('canplaythrough', () => {
        this.useCustomFile = true;
      });
      this.customAudio.addEventListener('error', () => {
        this.useCustomFile = false;
      });
    } catch {
      this.useCustomFile = false;
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master music bus
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Dedicated SFX bus (always audible even when background music is paused)
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, dreamy celesta note
  private playCelestaTone(freq: number, delayMs: number, durationSec: number = 3.8) {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime + delayMs / 1000;

    // Oscillator 1: Sine (Pure warm fundamental)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2: Triangle (Gentle chime sparkle)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.001, now);

    // Note Gain Envelope
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    // Warm Lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(350, now + durationSec);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.1);
    osc2.stop(now + durationSec + 0.1);
  }

  private playNextArpeggio() {
    if (!this.isPlaying) return;
    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    // Stagger chord notes gently like a harp
    chord.forEach((freq, idx) => {
      this.playCelestaTone(freq, idx * 380, 4.8);
    });

    // Random twinkling high melody note
    const highNotes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.5];
    const melodyFreq = highNotes[Math.floor(Math.random() * highNotes.length)];
    this.playCelestaTone(melodyFreq, 1600 + Math.random() * 600, 3.2);
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();

      if (this.useCustomFile && this.customAudio) {
        try {
          await this.customAudio.play();
          this.isPlaying = true;
          return true;
        } catch {
          this.useCustomFile = false;
        }
      }

      this.isPlaying = true;
      this.playNextArpeggio();

      this.intervalId = window.setInterval(() => {
        this.playNextArpeggio();
      }, 4200);

      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // --- Cinematic Micro-Interaction Sound Effects (Zero External Files) ---

  // 1. Delicate Glass Star Chime (for star discoveries & card opens)
  public playChime(pitchMultiplier: number = 1) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(1760 * pitchMultiplier, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio autoplay policy guard
    }
  }

  // 2. Wax Seal Break Sound (Paper rustle + soft crystal chime)
  public playSealBreak() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Soft white noise burst for paper texture
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(2.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(now);

      // Complementary resonance tone
      this.playChime(1.25);
    } catch {
      // guard
    }
  }

  // 3. Grand Angelic Harp Glissando (when the big surprise opens!)
  public playSurpriseFanfare() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      // Major arpeggio glissando: C4, E4, G4, B4, C5, E5, G5, C6
      const glissNotes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      glissNotes.forEach((freq, idx) => {
        const noteTime = now + idx * 0.09;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.0001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.15, noteTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.2);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(noteTime);
        osc.stop(noteTime + 2.3);
      });
    } catch {
      // guard
    }
  }

  // 4. Sweet Heart Love Pop (when tapping reason affinity)
  public playHeartPop() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // guard
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
