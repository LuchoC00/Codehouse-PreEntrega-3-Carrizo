
export default
class Stock{

    constructor(array = []){
        this.cajas = array;
        this.enCarrito = [];
    }

    agregarProducto(producto){
        let cont = 0;
        this.cajas.forEach((cajaTipos)=>{
            if(cajaTipos.length != 0){
                cajaTipos.forEach((vestimentaTipo)=>{
                    if(producto.nombre === vestimentaTipo.nombreProducto){
                        vestimentaTipo.agregarProducto(producto);
                        return;
                    }
                })
            }
        })
    }

    quitarProducto(producto){
        this.cajas.forEach((cajaTipos)=>{
            cajaTipos.forEach((vestimentaTipo)=>{
                if(producto.nombre == vestimentaTipo.nombreProducto){
                    vestimentaTipo.quitarProducto(producto);
                    return;
                }
            })
        })
    }
}

