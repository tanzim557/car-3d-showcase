// Web Audio API procedural sound engine: synthesizes authentic supercar acoustics and UI feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private isEngineRunning: boolean = false;
  private idleOsc1: OscillatorNode | null = null;
  private idleOsc2: OscillatorNode | null = null;
  private idleGain: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Subtle glass UI click
  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Audio autoplay policy
    }
  }

  // Futuristic aerodynamic camera transition whoosh
  playTransition() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // Filtered noise buffer for wind/aero whoosh
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.35);
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Supercar V8 ignition start and engine roar
  playEngineStart(onRevPeak?: () => void) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Starter motor whine
      const starterOsc = ctx.createOscillator();
      const starterGain = ctx.createGain();
      starterOsc.type = 'sawtooth';
      starterOsc.frequency.setValueAtTime(220, now);
      starterOsc.frequency.exponentialRampToValueAtTime(380, now + 0.35);

      starterGain.gain.setValueAtTime(0.04, now);
      starterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      starterOsc.connect(starterGain);
      starterGain.connect(ctx.destination);
      starterOsc.start(now);
      starterOsc.stop(now + 0.4);

      // 2. V8 Ignition roar burst
      const roarOsc = ctx.createOscillator();
      const roarSub = ctx.createOscillator();
      const roarFilter = ctx.createBiquadFilter();
      const roarGain = ctx.createGain();

      roarOsc.type = 'sawtooth';
      roarSub.type = 'triangle';

      // Pitch sweep: crank to 6,500 RPM flare, then settling to idle
      roarOsc.frequency.setValueAtTime(80, now + 0.35);
      roarOsc.frequency.exponentialRampToValueAtTime(450, now + 0.7);
      roarOsc.frequency.exponentialRampToValueAtTime(120, now + 1.6);

      roarSub.frequency.setValueAtTime(40, now + 0.35);
      roarSub.frequency.exponentialRampToValueAtTime(225, now + 0.7);
      roarSub.frequency.exponentialRampToValueAtTime(60, now + 1.6);

      roarFilter.type = 'lowpass';
      roarFilter.frequency.setValueAtTime(400, now + 0.35);
      roarFilter.frequency.exponentialRampToValueAtTime(2500, now + 0.7);
      roarFilter.frequency.exponentialRampToValueAtTime(600, now + 1.6);

      roarGain.gain.setValueAtTime(0.001, now);
      roarGain.gain.setValueAtTime(0.01, now + 0.35);
      roarGain.gain.linearRampToValueAtTime(0.18, now + 0.7); // Loudest peak at rev flare
      roarGain.gain.exponentialRampToValueAtTime(0.04, now + 1.6);
      roarGain.gain.linearRampToValueAtTime(0.001, now + 2.4);

      roarOsc.connect(roarFilter);
      roarSub.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(ctx.destination);

      roarOsc.start(now + 0.35);
      roarSub.start(now + 0.35);
      roarOsc.stop(now + 2.5);
      roarSub.stop(now + 2.5);

      if (onRevPeak) {
        setTimeout(onRevPeak, 650);
      }
    } catch {
      // Ignore
    }
  }

  // Throttle rev flare
  playRev() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      sub.type = 'triangle';

      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.9);

      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(260, now + 0.3);
      sub.frequency.exponentialRampToValueAtTime(65, now + 0.9);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.3);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.9);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 1.0);
      sub.stop(now + 1.0);
    } catch {
      // Ignore
    }
  }

  // Headlight toggle high-tech surge
  playHeadlights(on: boolean) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (on) {
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.14);
      } else {
        osc.frequency.setValueAtTime(1100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.12);
      }

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  // Color swatch selection chime
  playColorSelect() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  // Supercar entry: Throttle approach, decelerating turbo whoosh, and carbon-ceramic brake bite into idle
  playDriveIn() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Engine approach rumble & twin-turbo spool
      const engineOsc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      engineOsc.type = 'sawtooth';
      subOsc.type = 'triangle';

      // Pitch: enters at mid rev (260Hz), drops as car brakes into idle (85Hz)
      engineOsc.frequency.setValueAtTime(260, now);
      engineOsc.frequency.exponentialRampToValueAtTime(320, now + 0.6);
      engineOsc.frequency.exponentialRampToValueAtTime(120, now + 1.8);
      engineOsc.frequency.exponentialRampToValueAtTime(85, now + 2.4);

      subOsc.frequency.setValueAtTime(130, now);
      subOsc.frequency.exponentialRampToValueAtTime(160, now + 0.6);
      subOsc.frequency.exponentialRampToValueAtTime(60, now + 1.8);
      subOsc.frequency.exponentialRampToValueAtTime(42, now + 2.4);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(400, now + 2.0);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 1.8);
      gain.gain.linearRampToValueAtTime(0.001, now + 2.6);

      engineOsc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      engineOsc.start(now);
      subOsc.start(now);
      engineOsc.stop(now + 2.6);
      subOsc.stop(now + 2.6);

      // 2. Aerodynamic wind rush / tire rolling sound
      const bufferSize = ctx.sampleRate * 1.8;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(400, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(900, now + 0.7);
      noiseFilter.frequency.exponentialRampToValueAtTime(180, now + 1.8);
      noiseFilter.Q.value = 2.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.07, now + 0.6);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);

      // 3. Carbon-ceramic brake squeal / bite right as the car stops (around 1.6s)
      const brakeOsc = ctx.createOscillator();
      const brakeFilter = ctx.createBiquadFilter();
      const brakeGain = ctx.createGain();

      brakeOsc.type = 'sine';
      brakeOsc.frequency.setValueAtTime(2600, now + 1.5);
      brakeOsc.frequency.exponentialRampToValueAtTime(2100, now + 1.9);

      brakeFilter.type = 'bandpass';
      brakeFilter.frequency.setValueAtTime(2400, now + 1.5);
      brakeFilter.Q.value = 5.0;

      brakeGain.gain.setValueAtTime(0.001, now + 1.5);
      brakeGain.gain.linearRampToValueAtTime(0.03, now + 1.65);
      brakeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.95);

      brakeOsc.connect(brakeFilter);
      brakeFilter.connect(brakeGain);
      brakeGain.connect(ctx.destination);

      brakeOsc.start(now + 1.5);
      brakeOsc.stop(now + 2.0);
    } catch {
      // Audio autoplay policy
    }
  }
}

export const soundManager = new SoundEffects();
