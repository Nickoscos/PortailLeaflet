//Données composants un site:
//-son nom
//-sa latitude
//-sa longitude
interface site {
    name: string,
    lat: number,
    lng: number,
    url: string
}


//Classe regroupant les sites déclarés
export class siteList {
    //Déclaration des sites
    siteList: site[]= [
        {name: 'DALKIA', lat: 44.87341747914487, lng: -0.582101740957211, url:'https://911e12bf.eu.jeedom.link/index.php?v=d&p=plan' },
        //L'AJOUT DE NOUVEAU SITE SE FAIT A CET ENDROIT
    ]

    //méthode permettant au composant MAP de récupérer les coordonnées de latitude et longitude pour afficher les marqueurs
    ReadSite(name: string): Array<number>{
        let lat: number = 0;
        let lng: number = 0;

        for (const key in this.siteList) {
            if (Object.prototype.hasOwnProperty.call(this.siteList, key)) {
                lat = this.siteList[key].lat;
                lng = this.siteList[key].lng;
            }
        }
        return [lat, lng];
    }
}