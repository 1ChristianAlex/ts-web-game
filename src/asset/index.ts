import cthulhinho from './cthulhinho.png';
import songString from './songs/backgroundMusic.mp3';
import imageSpaceShipPath from './spaceships/red.png';
import imageStarPath from './stars.png';

import damageHit from './songs/damage-hit.ogg';
import shootSound from './songs/shoot.ogg';

import deadOne from './songs/dead-1.ogg';
import deadTwo from './songs/dead-2.ogg';

class AssetsGame {
  static ENEMIE = cthulhinho;
  static SPACESHIP = imageSpaceShipPath;
  static STAR = imageStarPath;

  static BACKGROUND_SONG = songString;
  static DAMAGE_HIT_SOUND = damageHit;
  static SHOOT_SOUND = shootSound;

  static DEAD_SOUND = [deadOne, deadTwo];
}

export default AssetsGame;
