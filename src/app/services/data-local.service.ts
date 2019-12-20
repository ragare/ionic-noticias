import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) { 
    this.cargarFavoritos();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(n =>  n.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }
  }

  async cargarFavoritos() {
    return await this.storage.get('favoritos');
  }
}
