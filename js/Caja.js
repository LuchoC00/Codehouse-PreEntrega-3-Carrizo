export default

class Caja{

    constructor(tipo, nombreProducto, productos = [] ,stock = 0){
        this.tipo = tipo.toLowerCase();
        this.nombreProducto = nombreProducto.toLowerCase();
        this.stock = stock;
        this.productos = productos;
    }

    quitarProducto(producto){
        for (let i = 0; i < this.productos.length; i++) {
            if(this.productos[i] == producto){
                this.productos.splice(i,1);
            }
        }
    }

    agregarProducto(producto){
        if(this.productos.length >0){
            for (let i = 0; i < this.productos.length; i++) {
                if(this.productos[i] == producto){
                    this.productos.push(producto)
                }
            }
        }
        else{
            this.productos.push(producto)
        }

    }

    darTallesPosibles(){
        const tallesPermitidos = ["xs","s","m","l","xl","xxl"];
        const tallesPermitidosCalzado = [4,5,6,7,8,9,10,11,12];
        let tallesTipo = this.tipo != "calzado".toLowerCase() ? tallesPermitidos : tallesPermitidosCalzado;
        let tallesPosibles = this.productos.map(producto => producto.talle);
        return tallesTipo.filter((talle) => {
            return tallesPosibles.includes(talle);
        });
    }

    dameVestimetaPorTalle(talle){
        for (let i = 0; i < this.productos.length; i++) {
            if(this.productos[i].talle == talle){
                return this.productos[i];
            }
        }
    }

    darStockProducto(producto){
        let stocks = 0;
        for (let i = 0; i < this.productos.length; i++) {
            if(this.productos[i] == producto){
                stocks++;
            }
        }
        return stocks;
    }
}

