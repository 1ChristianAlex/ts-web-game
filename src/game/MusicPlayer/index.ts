class MusicPlayer {
  private audioController: HTMLAudioElement;

  private prepareMusicElement() {
    this.audioController = new Audio(this.musicSource);

    document.body.appendChild(this.audioController);

    this.audioController.oncanplay = () => {
      this.audioController.play();
    };

    this.audioController.oncanplay = () => this.playMusic();
    this.loopMusic();
  }

  constructor(private musicSource: string) {
    this.prepareMusicElement();
  }

  public playMusic() {
    this.audioController.play();
    this.loopMusic();
  }

  public pauseMusic() {
    this.audioController.pause();
  }

  public loopMusic() {
    this.audioController.loop = true;
  }
}

export default MusicPlayer;
