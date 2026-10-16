// Web Audio API ambient sound generator (no external files needed)
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private currentType: string | null = null;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private intervalId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'rain' | 'fire' | 'bowl' | 'breeze') {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.currentType = type;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);
    this.gainNode.connect(this.ctx.destination);

    if (type === 'rain') {
      this.startRain();
    } else if (type === 'fire') {
      this.startFire();
    } else if (type === 'breeze') {
      this.startBreeze();
    } else if (type === 'bowl') {
      this.startBowl();
    }
  }

  private startRain() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02; // Pink-ish noise
      lastOut = data[i];
      data[i] *= 1.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter for gentle rain frequency
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.noiseNode = noise;
  }

  private startFire() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = white * (Math.random() > 0.985 ? 1.5 : 0.05); // crackles
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 750;
    filter.Q.value = 1.2;

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.noiseNode = noise;
  }

  private startBreeze() {
    if (!this.ctx || !this.gainNode) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.15;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.noiseNode = noise;
  }

  private startBowl() {
    if (!this.ctx || !this.gainNode) return;

    const playHarmonics = () => {
      if (!this.ctx || !this.gainNode) return;
      const freqs = [216, 432, 864];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = this.ctx!.currentTime;
        oscGain.gain.setValueAtTime(0.12 / (idx + 1), startTime);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 6.0);

        osc.connect(oscGain);
        oscGain.connect(this.gainNode!);
        osc.start(startTime);
        osc.stop(startTime + 6.1);
      });
    };

    playHarmonics();
    // Repeat every 7 seconds
    this.intervalId = window.setInterval(playHarmonics, 7000);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.cancelScheduledValues(this.ctx.currentTime);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      if (this.noiseNode) {
        try {
          (this.noiseNode as AudioScheduledSourceNode).stop();
        } catch {
          // ignore
        }
        this.noiseNode = null;
      }
      this.currentType = null;
    }, 600);
  }

  public isPlaying(type?: string): boolean {
    if (type) return this.currentType === type;
    return this.currentType !== null;
  }

  public getCurrentType(): string | null {
    return this.currentType;
  }
}

export const ambientSound = typeof window !== 'undefined' ? new AmbientSoundManager() : null;
