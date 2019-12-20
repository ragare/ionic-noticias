import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find(n =>  n.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Favorito creado');
    }
  }

  async cargarFavoritos() {
    const favoritos =  await this.storage.get('favoritos');
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia) {
    this.noticias = this.noticias.filter(n => n.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
    this.presentToast('Favorito borrado');
  }
}
