import zelda from '../img/zelda.png'
import animal from '../img/animal.png'
import celeste from '../img/celeste.png'
import hades from '../img/hades.png'
import kc from '../img/kc.png'
import dota from '../img/dota.png'

export default [
    {
        id: 1,
        name: "The Legend of Zelda",
        subtitle: "Plataforma: Nintendo Switch",
        value: 299,
        image: zelda,
        category: [{id: 1, name : 'Ação'},{id:2,name:  ' Aventura'}]
    },
    {
        id: 2,
        name: "AlimentAnimal Crossing",
        subtitle: "Plataforma: Nintendo Switch",
        value: 350,
        image: animal,
        category: [{id: 1, name : 'Simulação'}]
    },
    {
        id: 3,
        name: "Celeste",
        subtitle: "Plataforma: PC",
        value: 36.99,
        image: celeste,
        category: [{id: 1, name : 'Ação'},{id:2,name:  ' Aventura'}, {id:3, name:'Indie'}]
    },
    {
        id: 4,
        name: "Hades",
        subtitle: "Plataforma: PC",
        value: 47.49,
        image: hades,
        category: [{id: 1, name : 'Ação'},{id:2,name:  ' RPG'}, {id:3, name:'Indie'}]
    },
    {
        id: 5,
        name: "Knockout City™",
        subtitle: "Plataforma: Nintendo Switch",
        value: 99,
        image: kc,
        category: [{id: 1, name : 'Ação'},{id:2,name:  ' Aventura'}, {id:3, name:'Esportes'}]
    },
    {
        id: 6,
        name: "Dota 2",
        subtitle: "Plataforma: PC",
        value: 99,
        image: dota,
        category: [{id: 1, name : 'Ação'},{id:2,name: 'Estratégia'}]
    }
    
    
]