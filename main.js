let sujetos = []
let dibujables = []
 
function setup() {
    createCanvas(400, 400)
    
    sujetos.push(new Boost(10, 350, 100, 2))
    sujetos.push(new Boost(250, 10, 100, -0.1))

    let sujetos1 = []
    let sujetos2 = []

    let colorEquipo1 = 7
    let colorEquipo2 = 256
 
    sujetos1.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
 
    // capitan del equipo 1
    sujetos1.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
 
    sujetos1.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos1.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    let tanquesEquipo1 = new ObservadorMuertes(10, 20, colorEquipor1, "Tanques muertos: ")
    sujetos1[0].cuandoMuere(tanquesEquipo1)
    sujetos1[1].cuandoMuere(tanquesEquipo1)

    dibujables.push(tanquesEquipo1)
 
    // capitan del equipo 2
    sujetos2.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoErrante()))
    sujetos2.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoTanque(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    sujetos2.push(new SujetoLiviano(Math.round(Math.random() * 400), Math.round(Math.random() * 400), new MovimientoLineal()))
    let tanquesEquipo2 = new ObservadorMuertes(200, 20, colorEquipo2, "Tanques muertos: ")
    sujetos2[0].cuandoMuere(tanquesEquipo2)
    sujetos2[1].cuandoMuere(tanquesEquipo2)

    dibujables.push(tanquesEquipo2)

    let observador1 = new ObservadorMuertes(10, 10, colorEquipo1, "Equipo Frutas")
    dibujables.push(observador1)

    let observador2 = new ObservadorMuertes(200, 10 colorEquipo2, "Equipo Verduras")
    dibujables.push(observador2)
    
    let equipo1 = new Equipo(sujeto1, colorEquipo1)
    let equipo2 = new Equipo(sujeto2, colorEquipo2)

    equipo1.cuandoMuere(observador1)
    equipo2.cuandoMuere(observador2)

    sujetos.push(equipo1)
    sujetos.push(equipo2)

    let contexto = new Contexto()
    contexto.set('equipos', sujetos)

    for (let i = 0; i < sujetos.length; i++) {
        sujetos[i].setContext(contexto)
    }
}
 
function draw() {
    // borramos toda la pantalla, la pintamos de un color y
    // volvemos a pintar todo lo que queramos
    background(100)
 
    // borro los muertos
    for(let i=0; i < sujetos.length; i++) {
        if (sujetos[i].dameVida() <= 0) {
            // lo borramos
            sujetos.splice(i, 1)
            i = i-1
        }
    }
 
    //verifico colision
    for(let i=0; i < sujetos.length; i++) {
        for (let j=i+1; j < sujetos.length; j++) {
            sujetos[i].chocar(sujetos[j])
        }
    }
 
 
    for (let i in sujetos) {
        sujetos[i].aplicarFuerza(V(0.1, 0))
    }

    for (let i in sujetos) {
        sujetos[i].tick()
    }

    for (let i in dibujables) {
        dibujables[i].dibujar()
    }
 
}
