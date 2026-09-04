/**
 * Generative Ambient Sound Engine for Reshmatex — Liquid Light
 * Implements a soft, micro-tonal ambient pad with detuned oscillators,
 * resonant biquad filter, gentle low-frequency oscillation, and real-time analyzer.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private osc3: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying = false;
  private isMuted = false;
  private targetVolume = 0.08;

  public initAndPlay(): boolean {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return false;

      if (!this.ctx) {
        this.ctx = new AudioCtxClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) return true;

      const now = this.ctx.currentTime;

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : this.targetVolume, now + 3.0);

      // Analyser for HUD visualizer
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      // Lowpass resonant filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);
      filter.Q.value = 0.8;

      // Osc 1: A2 fundamental (110 Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(110, now);

      // Osc 2: E3 perfect fifth (164.81 Hz), slightly detuned (+2 cents)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'sine';
      this.osc2.frequency.setValueAtTime(164.81, now);
      this.osc2.detune.setValueAtTime(4, now);

      // Osc 3: A3 octave warm triangle (220 Hz), soft detune (-3 cents)
      this.osc3 = this.ctx.createOscillator();
      this.osc3.type = 'triangle';
      this.osc3.frequency.setValueAtTime(220, now);
      this.osc3.detune.setValueAtTime(-3, now);

      // Mixer gains for oscillator blend
      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.45, now);

      // Slow LFO for organic filter sweep
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.08, now);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(55, now);

      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Routing
      this.osc1.connect(oscGain);
      this.osc2.connect(oscGain);
      this.osc3.connect(oscGain);

      oscGain.connect(filter);
      filter.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      this.osc1.start();
      this.osc2.start();
      this.osc3.start();
      this.lfo.start();

      this.isPlaying = true;
      return true;
    } catch (e) {
      console.warn('AmbientSoundEngine: AudioContext initialization prevented or failed:', e);
      return false;
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx || !this.masterGain) {
      this.initAndPlay();
      this.isMuted = false;
      return false;
    }

    const now = this.ctx.currentTime;
    if (this.isMuted) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.8);
      this.isMuted = false;
    } else {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.6);
      this.isMuted = true;
    }
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.targetVolume = Math.max(0, Math.min(0.2, val));
    if (this.ctx && this.masterGain && !this.isMuted) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, now + 0.2);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getFrequencyData(): Uint8Array | null {
    if (!this.analyser || this.isMuted || !this.isPlaying) return null;
    const array = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(array);
    return array;
  }

  public stop() {
    if (this.ctx && this.isPlaying) {
      try {
        const now = this.ctx.currentTime;
        if (this.masterGain) {
          this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        }
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.osc3?.stop();
          this.lfo?.stop();
          this.isPlaying = false;
        }, 550);
      } catch (e) {
        console.warn('Audio stop cleanup', e);
      }
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
