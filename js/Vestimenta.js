export default

class Vestimenta{

    constructor(id,nombre,precio,talle,esImportado,tipo){

        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.talle = talle;
        this.precio = parseFloat((esImportado ? precio*1.2 : precio).toFixed(2));
        this.tipo = tipo.toLowerCase();
        this.esImportado = esImportado;
    }

    agregarIva(){
        return this.precio * 1.21;
    }

    modificarPrecio(nuevoPrecio){
        this.precio = nuevoPrecio;
    }
}

