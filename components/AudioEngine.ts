// Romantic Audio Engine
// Dedicated player for your uploaded MP3 song (/song.m3.mp3 or /song.mp3 in public folder)

class RomanticAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;

  public init() {
    if (typeof window === "undefined") return;

    if (!this.audioElement) {
      const audio = new Audio("/song.m3.mp3");
      audio.loop = true;
      audio.volume = this.masterVolume;
      audio.muted = this.isMuted;

      audio.addEventListener("error", () => {
        // Fallback to /song.mp3 if song.m3.mp3 name differs
        if (this.audioElement && this.audioElement.src.includes("song.m3.mp3")) {
          this.audioElement.src = "/song.mp3";
          this.audioElement.load();
        }
      });

      this.audioElement = audio;
    }
  }

  public play() {
    this.init();

    if (this.audioElement) {
      this.audioElement
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((err) => {
          // Promise rejected before user interaction - will play on next user gesture
          console.log("Waiting for user interaction to play MP3 song:", err);
        });
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.audioElement) {
      this.audioElement.muted = muted;
    }
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.masterVolume;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
