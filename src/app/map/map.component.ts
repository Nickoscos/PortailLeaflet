import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { siteList } from '../models/sites.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: any;
  sites = new siteList;
  

  constructor() { }

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap() {
    //Déclaration du site devant se trouver au centre de la map au lancement de la page
    const siteCentral = {
      lat: this.sites.ReadSite('DALKIA')[0],
      lng: this.sites.ReadSite('DALKIA')[1],
    };

    //Zoom initial
    const zoomLevel = 12;

    //Création de l'objet MAP et insertion dans l'élément HTML
    this.map = L.map('map', {
      center: [siteCentral.lat, siteCentral.lng],
      zoom: zoomLevel
    });

    //Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetma.fr
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //Affichage de la carte
    mainLayer.addTo(this.map);

    //Ajout des marqueurs
    this.addMarker()
  }

  //Méthode permettant l'ajout des marqueurs 
  addMarker() {
    this.sites.siteList[0]
    for (const key in this.sites.siteList) {
      if (Object.prototype.hasOwnProperty.call(this.sites.siteList, key)) {
        const lat = this.sites.siteList[key].lat;
        const lng = this.sites.siteList[key].lng;
        const marker = L.marker([lat, lng]);
        marker.addTo(this.map);
        marker.on('click', this.onClick.bind(this, this.sites.siteList[key].name));
      }
    }
  }

  //Ouverture dans un nouvel onglet l'interface de l'équipement distant
  onClick(name: string){
    for (const key in this.sites.siteList) {
      if (this.sites.siteList[key].name === name)  {
        window.open(this.sites.siteList[key].url);
      }
    }
  }
}
