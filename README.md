# Codehouse-PreEntrega-3-Carrizo

Se corrigio lo pedido.


Con respecto a la pagina estatica, se ha añadido lo siguiente para la preentrega:

4 clases:

carrito : contiene los productos añadidos al carrito.

stock: contiene un array de 3 arrays (remera, abrigo, calzado) . Estos ultimos contienen una lista de cajas dependiendo de la vestimenta 

caja : contiene una lista de vestimentas con el mismo nombre, precio, y otros datos. Pero puede variar su talle

Vestimenta : contiene los datos del producto al que hace referencia.


main :

primero se asignan las variables basicas para el funcionamiento.
Se crea y equipa el stock a traves de la funcion crearVestimenta

despues se chequea si el usuario tiene datos del carrito y guarda el producto para que solo ese producto aparesca en la targeta

me olvide de crear los ids en el html. asi que los creo desde aca.

se recorre el stock en busca de productos de la pagina. Se asigna el valor y sus talles disponibles

Por ultimo, las targetas que no recibieron datos se les asigna el Agotado.
