class SujetoAbstracto {

    constructor(x,y, movedor) {
        this.x = x
        this.y = y
        this.vx = 0
        this.vy = 0
        this.vida = 100
        this.observadoresDeMuertes = []
        this.movedor = movedor
        this.contexto = null
        this.masa = 1
        this.aceleracion = V(0,0)
    }

    aplicarFuerza(fuerza) {
        let nuevaAceleracion = V(0,0)
        nuevaAceleracion.x = fuerza.x / this.masa
        nuevaAceleracion.y = fuerza.y / this.masa
        
        this.aceleracion.x = this.aceleracion.x + nuevaAceleracion.x
        this.aceleracion.y = this.aceleracion.y + nuevaAceleracion.y

    }

    setContexto(contexto) {
        this.contexto = contexto
    }

    dameVida() {
        return this.vida
    }

    disparar() {
        this.arma.disparar(this)
    }

    companieros() {
        return[this]
    }

    sacarVida(n) {
        this.vida = this.vida - n
        if (this.vida <= 0) {
            this.notificarMuerte()
        }
    }

    mover() {

        if (Math.abs(this.vx) < 0.5) {this.vx = 0.5 * Math.sign(this.vx)}
        if (Math.abs(this.vy) < 0.5) {this.vy = 0.5 * Math.sign(this.vy)}

        if (this.vx > 10) {this.vx = 10}
        if (this.vx > 10) {this.vx = 10}

        this.vx = this.vx + this.aceleracion.x
        this.vy = this.vy + this.aceleracion.y

        this.movedor.mover(this)
        
        this.aceleracion = V(0,0)
    }

    cuandoMuere(observador) {
        this.observadoresDeMuertes.push(observador)
    }

    dibujar() {
        push()
        stroke('purple');
        strokeWeight(5);
        point(this.x,this.y);
        pop()
    }
}

class Contexto {
     constructor ()
}

class Movimiento {
    mover(nave) {
        throw new Error ("Falta implementar");
    }
}

class MovimientoLineal extends Movimientos {
    mover(nave) {
        nave.x = nave.x + nave.vx
        nave.y = nave.y + nave.vy
    }
}

class MovimientoMiedoso extends Movimientos {
    mover(nave) {
        let enemigos = []
        let equipos = nave.contexto.get('equipos')
        for (let i = 0; i < equipos.length; i++) {
            let companieros = equipos[i].companieros()
            if (!companieros.includes(nave)) {
                enemigos = enemigos.concat(companieros)
            }
        }
        
        let resultado = enemigos.filter(function(e) {
            return distancia(e, nave) < 20
        })

        if (resultado.length > 0) {
            let mascercano = resultado[0]

            let direccionColicion = vectorDireccion(nave,mascercano)
            direccionColicion.x = -direccionColicion.x
            direccionColicion.y = -direccionColicion.y

            let velocidad = longitud(V(nave.vx, nave.vy))

            direccionColicion.x = direccionColicion.x * velocidad
            direccionColicion.y = direccionColicion.y * velocidad

            nave.vx = direccionColicion.x * velocidad
            nave.vy = direccionColicion.y * velocidad

            nave.x = nave.x + nave.vy * 2
            nave.y = nave.y + nave.vy * 2
        } else {
            nave.x = nave.x + nave.vx
            nave.y = nave.y + nave.vy
        }
    }
}

class MovimientoErrante extends Movimientos {
    mover(nave) {
        if (Math.random() < 0.01) {
            nave.vx = -nave.vx
        }
        
        if (Math.random() < 0.01) {
            nave.vy = -nave.vy
        }
        nave.x = nave.x + nave.vx
        nave.y = nave.y + nave.vy
    }
}

class SujetoTanque extends SujetoAbstracto {

    constructor(x, y, movedor, arma) {
        super(x, y, movedor)
        this.vy = Math.random()
        this.vx = Math.random()
        this.diametro = 15
        this.arma = arma
        this.masa = 15
    }

    dibujar() {
        this.arma.disparar()
        circle(this.x, this.y, this.diametro)
    }

    chocar(otrosujeto) {
        return otrosujeto.chocarTanque(this)
    }

    chocarLiviano(liviano) {
        let d = distancia(this, liviano)
        if(d < this.diametro) {
            this.sacarVida(this.dameVida())
            liviano.sacarVida(liviano.dameVida())
        }
    }

    chocarBala(bala) {
        if(distancia(this,bala) < this.diametro) {
            this.sacarVida()
        }
    }

    chocarTanque(tanque) {
        let d = distancia(this, tanque)
        if(d < this.diametro) {
            this.sacarVida(this.dameVida())
            tanque.sacarVida(tanque.dameVida())
        }
    }

    chocarBoost(boost) {
        boost.chocarBala(this)
    }
}

class Boost extends SujetoAbstracto {
    constructor(x, y, lado, mangnitud) {
        super(x, y, null, null)
        this.lado = lado
        this.magnitud = magnitud
    }

    aplicarFuerza(fuerza) {

    }

    mover() {

    }
    
    rebote() {

    }
    
    chocarBala(bala) {
        this.chocarGenerico(bala)
    }

    chocarLiviano(liviano) {
        this.chocarGenerico(liviano)
    }

    chocarTanque(tanque){
        this.chocarGenerico(tanque)
    }

    chocarGenerico(otro) {
        if (this.x < otro.x && otro.x < this.x + this.lado) {
            if (this.y < otro.y && otro.y < this.y + this.lado) {
                
                let direccionMx = creatorVector(otro.vx, otro.vy)
                direccionMx.normalize()

                direccionMx.setMag(this.magnitud)

                otro.aplicarFuerza(direccionMx)
            }
        }
    }

    chocar(otro) {

    }

    dibujar() {
        push()
        fill(190)
        rect(this.x, thix.y, this.lado, this.lado)
        pop()
    }

    tick() {
        this.dibujar()
    }
}

class BalaRapida extends SujetoAbstracto {
    constructor(x, y, direccion) {
        super(x, y, null, null)
        this.velocidad = 4
        this.vx = this.direccion.x * this.velocidad
        this.vy = this.direccion.y * this.velocidad
        this.direccion = direccion
        this.masa = 1
    }

    disparar() {
        //Queda la logica por default
    }

    mover() {
        this.vx = this.vx + this.aceleracion.x
        this.vy = this.vy + this.aceleracion.y

        this.x = this.x + this.direccion.x * this.velocidad
        this.y = this.y + this.direccion.y * this.velocidad

        this.aceleracion = V(0,0)
    }

    rebote() {
        if (this.x > 400 || this.x < 0) {
            this.sacarVida()
        }
        if (this.y > 400 || this.y < 0) {
            this.sacarVida()
        }
    }

    chocar(otro) {
        otro,chocarBala(this)
    }

    chocarBala(bala) {
        if (bala. x == this.x && bala.y == this.y) {
            this.sacarVida(this.dameVida())
            this.sacarVida(bala.dameVida())
        }
    }

    chocarLiviano(liviano) {
        liviano.chocarBala(this)
    }

    chocarTanque(tanque) {
        tanque.chocarBala(this)
    }

    dibujar() {
        push()
        strokeWeight(3);
        point(this.x, this.y)
        pop()
    }
}

class SujetoLiviano extends SujetoAbstracto {
    contructor(x, y, movedor, arma) {
        super(x, y, movedor, arma)
        this.vx = Math.random() + 1
        this.vy = Math.random() + 1
        this.diametro = 10
        this.masa  = 10
    }

    dibujar() {
        circle(this.x, this.y, this.diametro)
    }

    chocar(otrosujeto) {
        return tankque.chocarLiviano(this)
    }

    chocarTanque(tanque){
        return tanque.chocarLiviano(this)
    }

    chocarBala(bala) {
        if(distancia(this,bala) < this.diametro/2) {
            this.sacarVida(this.dameVida())
            bala.sacarVida(bala.dameVida())
        }
    }

}

class Contexto {
    constructor() {
        this.data = {}
    }

    set(nombre, valor) {
        this.data[nombre] = valor
    }
    
    get(nombre) {
        return this.data[nombre]
    }
}

class Equipo extends SujetoAbstracto {
    constructor(sujetos, color) {
        super(0,0, null)
        this.sujetos = sujetos
        this.color = color
    }

    aplicarFuerza() {
        for (let i=0; i < this.sujetos.length; i++) {
            this.sujetos[i].aplicarFuerza(V(fuerza.x, fuerza.y))
        }
    }
 
    dameVida() {
        let vidatotal = 0
        for (let i=0; i < this.sujetos.length; i++) {
            vidatotal += this.sujetos[i].dameVida()
        }
        return vidatotal
    }
 
    companieros() {
        let todos = []
        for(let i = 0; i < this.sujetos.length; i++) {
            todos = todos.concat(this.sujetos[i]. companieros())
        }
        return todos
    }

    sacarVida(n) {
        // Queda vacio porque no existe
    }

    setContexto() {
        this.contexto = this.contexto
        for(let i = 0; i < sujetos.length; i++) {
            this.sujetos[i].setContexto(this.contexto)
        }
    }
 
    mover() {
        for (let i=0; i < this.sujetos.length; i++) {
            this.sujetos[i].mover()
        }
    }

    cuandoMuere (observador) {
        for(let i = 0; i < this.sujetos.length; i++) {
            this.sujetos[i]-this.cuandoMuere(observador)
        }
    }
 
    dibujar() {
        fill(this.color)
        for (let i=0; i < this.sujetos.length; i++) {
            this.sujetos[i].dibujar()
        }
        fill(256)
    }

    rebote() {
        for (let i = 0; i < this.sujetos.length; i ++) {
            this.sujetos[i].rebote()
        }

    }

    disparar() {
        for (let i = 0; i < this.sujetos.length; i ++) {
            this.sujetos[i].disparar()
    }
 
    tick() {
        this.disparar()
        this.mover()
        this.rebote()
        this.dibujar()
 
        for(let i=0; i < this.sujetos.length; i++) {
            if (this.sujetos[i].vida <= 0) {
                this.sujetos.splice(i, 1)
                i = i-1
            }
        }
    }
 
    chocar(otrosujeto) {
        for (let i=0; i < this.sujetos.length; i++) {
            otrosujeto.chocar(this.sujetos[i])
        }
    }

    chocarTanque(tanque) {
        this.chocar(tanque)
    }

    chocarLiviano(liviano) {
        this.chocar(liviano)
    }

    chocarBala(bala) {
        chocar.chocar(bala)
    }

    chocarBoost(boost) {

    }
 
}

class observadoresDeMuertes {

}

class Arma {
    disparar(sujeto) {
        throw new Error('Falta implementar')
    }
}

class ArmaQueNoDispara extends Arma {
    disparar(sujeto) {

    }
}

class ArmaErratica extends Arma {
    disparar(sujeto) {
        if (Math.random() < (1/120)) {
            let x = sujeto.x
            let y = sujeto.y

            let direccion = p5.Vector.random2D()
            let positcionBala = direccion.copy()

            posicionBala.setMag( sujeto.diametro/2 + 2)

            let bala = new BalaRapida(x + correccion.x, y + correcion.y, direccion)
        
            sujeto.contexto.get('equipos').push(bala    )
        }
    }
}
