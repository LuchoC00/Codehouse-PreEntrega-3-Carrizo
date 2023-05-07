export default

class Carrito{

    constructor(stock){ //recordad que es la clase stock y no el stock
        this.compras = [];
        this.stock = stock;
    }

    agregarCarrito(producto, cantidad = 1){
        for (let i = 0; i < cantidad; i++) {
            this.compras.push(producto);
            this.stock.quitarProducto(producto);
            console.log("añadido")
        }
    }

    quitarCarrito(producto, cantidad = 1){
        for (let i = 0; i < cantidad; i++) {
            this.compras.pop(producto);
            this.stock.agregarProducto(producto);
        }
    }
}

