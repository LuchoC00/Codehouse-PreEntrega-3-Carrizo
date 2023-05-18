import Vestimenta from "./Vestimenta.js";
import Caja from "./Caja.js";
import Stock from "./Stock.js";
import Carrito from "./Carrito.js";

/* 
    |---->Stock<----|
*/

//crear stock
let id = 0;
const remeras = [], abrigos = [], calzados = [];
const stock = new Stock([
    remeras,
    abrigos,
    calzados
]);


//Reponer stock
const tallesPermitidos = ["xs","s","m","l","xl","xxl"];
const tallesPermitidosCalzado = [4,5,6,7,8,9,10,11,12];  

//Crea varios objetos Vestimenta segun los parametros dados
function crearVestimenta(nombre,precio,esImportado,tipo,cantidad){
    const tallesTipo = tipo != "calzado".toLowerCase() ? tallesPermitidos : tallesPermitidosCalzado;
    const array = Array.from({ length: cantidad }, () => 
    new Vestimenta(id++,nombre,precio, tallesTipo[Math.floor(Math.random()*tallesTipo.length)],esImportado,tipo));
    
    // busca a que tipo pertenece y despues agrega a la caja correspondiente o crea una si es necesario

    if(tipo == "remera".toLowerCase()){
        const pos = remeras.findIndex((rem) => rem != null && rem.nombreProducto == nombre.toLowerCase());
        pos!=-1 ? remeras[pos].agregarProducto(...array) : remeras.push(new Caja(tipo,nombre,array,cantidad));
        if(cantidad == 1){
            carrito.agregarCarrito(array[0]);
        }
    }
    else if(tipo == "abrigo"){
        const pos = abrigos.findIndex((rem) => rem != null && rem.nombreProducto == nombre.toLowerCase());
        pos!=-1 ? abrigos[pos].agregarProducto(...array) : abrigos.push(new Caja(tipo,nombre,array,cantidad));
        if(cantidad == 1){
            carrito.agregarCarrito(array[0]);
        }
    }
    else{
        const pos = calzados.findIndex((rem) => rem != null && rem.nombreProducto == nombre.toLowerCase());
        pos!=-1 ? calzados[pos].agregarProducto(...array) : calzados.push(new Caja(tipo,nombre,array,cantidad));
        if(cantidad == 1){
            carrito.agregarCarrito(array[0]);
        }
    }

    
}


//crear stock

crearVestimenta("Paris is german", 28, true, "remera",7);
crearVestimenta("Barcelona fc naek", 32, true, "remera",7);
crearVestimenta("Liverpool naek", 22, false, "remera",7);
crearVestimenta("camperas naek", 41, false, "abrigo",7);
crearVestimenta("lotus 47", 31, true, "abrigo",9);
crearVestimenta("greenpeace", 42, false, "abrigo",7);
crearVestimenta("linear rose", 41, true, "abrigo",7);
crearVestimenta("nike", 38, false, "abrigo",7);
crearVestimenta("just do it", 39, true, "abrigo",7);
crearVestimenta("sueter naek pro7", 35, true, "abrigo",7);
crearVestimenta("furious red", 52, true, "calzado",9);
crearVestimenta("modelo 47", 67, true, "calzado",7);
crearVestimenta("ocean 2", 42, false, "calzado",7);
crearVestimenta("tenis black", 56, true, "calzado",7);
crearVestimenta("linea 90", 54, true, "calzado",9);
crearVestimenta("linea 81", 71, false, "calzado",7);
crearVestimenta("modelo 48", 62, false, "calzado",7);

//recuperar stock

const carrito = new Carrito(stock);

for (let i = 0; i < localStorage.length; i++) {
    if(localStorage.key(i).startsWith("producto-")){
        let {nombre, precio, esImportado, tipo} = JSON.parse(localStorage.getItem(localStorage.key(i)));
        crearVestimenta(nombre,precio,esImportado,tipo,1)
    }
}

//Mostrar carrito
let carritoIcon = document.getElementById("carritoIcon");
let fondoNubloso = document.getElementById("fondoNubloso");
let carritoDiv = document.getElementById("carrito");
let comprasDiv = document.getElementById("compras");

let carritoVacioImagen = document.createElement("img");
let contenedorImagen = document.createElement("div")

//click en el carrito del header
carritoIcon.addEventListener("click", () =>{
    carritoDiv.style.zIndex = 1001;
    fondoNubloso.style.zIndex = 1000;

    //mostrar productos del carrito
    carrito.compras.forEach(producto => {

        let productoDiv = document.createElement("div");
        productoDiv.style.width = "70%"
        productoDiv.style.border = "3px solid"
        productoDiv.style.borderRadius = "2px"
        productoDiv.style.margin = "5px"

        let productoContenido = document.createElement("p");
        productoContenido.textContent = "nombre : "+producto.nombre + " |-| talle : "+producto.talle + " |-| precio : " + producto.precio;
        productoDiv.appendChild(productoContenido);
        comprasDiv.appendChild(productoDiv);
    });
    //si el carrito esta vacio se muestra lo siguiente
    if(carrito.compras.length == 0){
        carritoVacioImagen.src = "../assets/images/carritoVacio.png";
        carritoVacioImagen.alt = "No hay productos en el carrito";
        carritoVacioImagen.style.marginLeft = "auto";
        contenedorImagen.appendChild(carritoVacioImagen);
        comprasDiv.appendChild(contenedorImagen);

    }
});

//ocultar
let btnVolver = document.getElementById("volverBtn");
btnVolver.addEventListener("click", () =>{
    carritoDiv.style.zIndex = -1;
    fondoNubloso.style.zIndex = -1;

    comprasDiv.innerHTML = ""; // elimina todo el contenido dentro
    if(carritoVacioImagen.src != ""){ 
        carritoVacioImagen.remove()
    }   
});

//vaciar carrito
let btnVaciarCarrito = document.getElementById("vaciarCarritoBtn");
btnVaciarCarrito.addEventListener("click", () =>{
    carrito.compras = [];
    localStorage.clear();
    comprasDiv.innerHTML = ""; // elimina todo el contenido dentro
    //vuelve a mostrar el carrito vacio
    carritoVacioImagen.src = "../assets/images/carritoVacio.png";
    carritoVacioImagen.alt = "No hay productos en el carrito";
    carritoVacioImagen.style.marginLeft = "auto";
    contenedorImagen.appendChild(carritoVacioImagen);
    comprasDiv.appendChild(contenedorImagen);
});

//comprar
let btnComprar = document.getElementById("comprarBtn");
btnComprar.addEventListener("click", () =>{
    if(carrito.compras.length > 0){
        carrito.compras = [];
        localStorage.clear();
        comprasDiv.innerHTML = ""; // elimina todo el contenido dentro
        //muestra un mensaje de confirmacion de compra
        carritoVacioImagen.src = "../assets/images/gracias.jpg";
        carritoVacioImagen.alt = "Gracias por comprar";
        carritoVacioImagen.style.marginLeft = "auto";
        contenedorImagen.appendChild(carritoVacioImagen);
        comprasDiv.appendChild(contenedorImagen);
    }
});


//recorrer

let targetas = document.getElementsByClassName("tarjeta");
Array.from(targetas).forEach((targeta) => {     
    targeta.querySelector(".nuevoVentas").id = targeta.querySelector("div h5").textContent.toLowerCase()
});

stock.cajas.forEach(element => {
    element.forEach(caja => {
        let div = document.getElementById(caja.nombreProducto);
        if(div != null){
            if(caja.stock < 1){
                console.log("Error linea 114")
            }
            else{
                let select = div.querySelector("div select");
                let label = div.querySelector("div label")
                label.textContent = "$" + caja.productos[0].precio;

                //Crea el valor por defecto
                let optionSelected = document.createElement("option");
                optionSelected.setAttribute("selected", "selected");
                optionSelected.textContent = "Talle";
                select.appendChild(optionSelected)
                
                //añade los talles posibles
                let tallesDisponibles = caja.darTallesPosibles();
                tallesDisponibles.forEach(talle => {
                    let option = document.createElement("option");
                    option.textContent = talle.toString().toUpperCase();
                    select.appendChild(option);
                });

                //eventos de boton
                let boton = select.nextElementSibling;
                boton.addEventListener("click", () => {
                    if(select.selectedIndex != 0){
                        let producto = caja.dameVestimetaPorTalle(select.options[select.selectedIndex].textContent)
                        if(caja.darStockProducto(producto)>0){  //agregar a carrito
                            carrito.agregarCarrito(producto,1);
                            let confirmacion = document.getElementById("confirmacion");
                            
                            confirmacion.textContent = "Has comprado un "+ producto.nombre;
                            confirmacion.style.display = "block";
                            // Ocultar el elemento después de 3 segundos
                            setTimeout(() => {
                                confirmacion.style.display = "none";
                            }, 3000);
                            localStorage.setItem("producto-"+producto.id+"-"+producto.nombre, JSON.stringify(producto)) //simulacion de producto por id
                        }
                    }
                });
            }
        }
    });
});



//marcar agotados

Array.from(targetas).forEach((targeta) => {
    if(targeta.querySelector(".input-group select option") == null){
        targeta.querySelector(".nuevoVentas div label").textContent = "AGOTADO"
        targeta.querySelector(".nuevoVentas div select").remove()
        targeta.querySelector(".nuevoVentas div button").remove()
    }
});




