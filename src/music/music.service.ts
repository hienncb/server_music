import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicService {
  private musics: String[] = [];

  create(musics: String[]) {
    // this.musics = musics;
     console.log('ok');
    this.musics = musics;
  }

  findTodayMusics(): String[] {
    return this.musics;
  }
}