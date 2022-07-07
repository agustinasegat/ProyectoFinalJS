//------------------------VARIABLES--------------------//

//Para generar las tarjetas
const productos = document.getElementById('cards');

//Para generar items del carrito
const items = document.getElementById('items');

//Templates del carrito
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

//Totales del carrito
const footer = document.getElementById('footer');

//Fragment carrito
const fragment = document.createDocumentFragment();

//URL de la API
const APIURL = "js/app.json";

//Variable Catalogo con Array Vacío
let catalogo = []

//Variable Carrito objeto vacío
let carrito = {}

//------------------------LIBRERÍAS: MENSAJES Y TOASTS-------------------------//
//Alerts
function msjSwal(mensaje) {
  Swal.fire({
    customClass: {
      confirmButton: 'swalBtnColor'
    },
    title: mensaje
  })
}

//Mensaje de error por si falta algún dato. (sin ícono)
function error(mensaje) {
  Swal.fire({
    customClass: {
      confirmButton: 'swalBtnColor'
    },
    title: mensaje,
    icon: 'error'
  })
}

//Mensaje de envío exitoso. (con ícono)
function exito(mensaje) {
  //Mensaje de envío exitoso.
  Swal.fire({
    customClass: {
      confirmButton: 'swalBtnColor'
    },
    title: mensaje,
    icon: 'success'
  })
}

//Toasts
function toast(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#86cad6",
    },
  }).showToast();
}


function toastResta(mensaje) {
  Toastify({
    text: mensaje,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#d35b5bfb",
    },
  }).showToast();
}
//-----------------------------LOCAL STORAGE------------------------//

//Guardar en Local Storage
function guardarEnLocalStorage() {

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

//Busca si hay productos en Local
function cargarenLocalStorage() {

  //si hay productos al abrirse la página muestra un msj y también el usuario los va a poder ver en e carrito
  if (localStorage.getItem('carrito') != null) {

    carrito = JSON.parse(localStorage.getItem('carrito')),

      msjSwal("¡Tenés productos esperándote en tu carrito!")
  }
}

//---------------------------------EVENTOS------------------------------//

// Eventos
document.addEventListener('DOMContentLoaded', () => {

  //Se carga el contenido de la API cuando se carga la WEB
  fetchData(),

    //Se cargan los productos en LS
    cargarenLocalStorage(),

    //Se pintan en el carrito los productos de LS
    renderizarCarrito()
});


//---------------------------------TRAER PRODUCTOS DE LA API----------------------------//

//Trae productos de la API
const fetchData = () => {

  fetch(APIURL)
    .then((response) => response.json())

    .then((data) => {

      catalogo = (data);

      renderizarProductos(catalogo);
    })

    //error
    .catch((err) => console.error(err));
};

//Renderiza los productos
const renderizarProductos = catalogo => {

  //Si lo que viene no es un Array, no se van a generar las Cards
  if (!Array.isArray) {
    console.error("No es un Array, no se pueden generar las tarjetas");
  }
  //Si es un Array y está vacío, tampoco
  else if (catalogo.length === 0) {
    console.error("No hay productos para mostrar");
  }
  //Si es un Array y tiene elementos, se van a crear las Cards
  else {
    crearCards();
  }
}

//------------------------------TARJETAS DE PRODUCTOS--------------------------------//

//Función para crear las Cards en DOM  
function crearCards() {

  //Con un forEach vamos a recorrer todo el Array  
  catalogo.forEach(item => {

    //Desestructuramos el Objeto 
    const { id, title, price, images, description, size } = item;

    //Si no hay propiedades, no va a generar las tarjetas y va a dar error
    if (Object.keys(item).length === 0) {
      console.error("No se puede crear una tarjeta sin contenido");
    }
    //Si no viene alguna de las propiedades, no va a generar las tarjetas y va a dar error
    else if ((!id) || (!title) || (!price) || (!images)) {
      console.error("no se puede generar la card porque falta algún elemento");

    }
    //Va a generar la tarjeta en DOM   
    else {
      crearCards()
    }

    //Función para crear las Cards en el DOM
    function crearCards() {
      // Estructura
      const container = document.createElement('div');
      container.classList.add('card-mod');

      //Estilo de la estructura
      container.style.backgroundColor = "white";
      container.style.borderRadius = "5px";
      container.style.height = "85%";
      container.style.width = "80%";
      container.style.padding = "5%";
      container.style.margin = "10%";

      // Card Body
      const containerCard = document.createElement('div');
      containerCard.classList.add('card-body');

      // Articulo
      const articulo = document.createElement('h5');
      articulo.classList.add('card-text', 'text-center');
      articulo.textContent = "Artículo" + " " + id

      //Estilos del Artículo
      articulo.style.fontWeight = "bold";
      articulo.style.fontSize = "0.8rem";
      articulo.style.margin = "5%";

      // Nombre del Producto
      const nombreProducto = document.createElement('h5');
      nombreProducto.classList.add('card-title', 'text-center');
      nombreProducto.textContent = title + " " + description + " " + size;

      //Estilos del Nombre
      nombreProducto.style.fontWeight = "500";
      nombreProducto.style.fontSize = "1.2rem";
      nombreProducto.style.margin = "5%";

      // Imagen
      const imagen = document.createElement('img');
      imagen.classList.add('img-fluid');
      imagen.setAttribute('src', images);

      // Precio
      const moneda = document.createElement('h5');
      moneda.classList.add('fw-bold');
      moneda.textContent = "$";
      const precio = document.createElement('h6');
      precio.classList.add('card-price', 'fw-bold');
      precio.textContent = price;
      const containerPrecio = document.createElement('div');
      containerPrecio.appendChild(moneda);
      containerPrecio.appendChild(precio);

      //Estilos del Precio
      moneda.style.fontSize = "1.5rem";
      precio.style.fontSize = "1.5rem";
      containerPrecio.style.display = "flex";
      containerPrecio.style.flexDirection = "row";
      containerPrecio.style.justifyContent = "center";
      containerPrecio.style.alignContent = "center";

      //Botón Agregar al Carrito
      const boton = document.createElement('button');
      boton.dataset.id = id;
      boton.classList.add('btn-Add');
      boton.textContent = '¡Lo Quiero!';

      //Estilos del Botón
      boton.style.backgroundColor = "#86cad6";
      boton.style.color = "white";
      boton.style.border = "#bfbeba";
      boton.style.fontSize = "18px";
      boton.style.letterSpacing = "0.1rem";
      boton.style.fontWeight = "400";
      boton.style.padding = "3%";
      boton.style.margin = "5%";
      boton.style.borderRadius = "10px";

      //Eventos Botón
      //Se expande al pasar el mouse
      boton.addEventListener("mouseover", () => {
        boton.style.transform = "scale(1.1)";
      })
      // Evento para agregar al Carrito
      boton.addEventListener('click', agregarCarrito);

      // Insertamos todo en HTML
      containerCard.appendChild(imagen);
      containerCard.appendChild(articulo);
      containerCard.appendChild(nombreProducto);
      containerCard.appendChild(containerPrecio);
      containerCard.appendChild(boton);
      container.appendChild(containerCard);
      productos.appendChild(container);
    }
  })
}

//-----------------------------------CARRITO--------------------------------------//
// Agregar al carrito
const agregarCarrito = (evento) => {

  (evento.target.classList.contains('btn-Add'));

  //Pinta los productos en carrito
  setearCarrito(evento.target.parentElement);

  //Mensaje al usuario para avisarle que se agregó un producto
  toast(" Se ha agregado el Artículo" + " " + evento.target.dataset.id + " " + "al carrito")

  //Se guarda en Local Storage
  guardarEnLocalStorage();
}

//Cómo se van a ver los productos dentro del carrito
const setearCarrito = item => {

  const producto = {

    // ID (según el botón)
    id: item.querySelector('.btn-Add').dataset.id,

    //El nombre del producto elegido
    title: item.querySelector('.card-title').textContent,

    //Cantidad de productos elegidos
    cantidad: 1,

    //Precio 
    price: parseInt(item.querySelector('.card-price').textContent),

  }
  // Aumentar cantidad de productos
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1
  }

  carrito[producto.id] = { ...producto }
  renderizarCarrito()
}

//Establecemos cómo se van a ver los productos cuando estén agregados al carrito
const renderizarCarrito = () => {

  items.innerHTML = ''
  //Pintamos los productos en el carrito
  Object.values(carrito).forEach(producto => {

    templateCarrito.querySelector('.item-id').textContent = producto.id;
    templateCarrito.querySelector('.item-nombre').textContent = producto.title;
    templateCarrito.querySelector('.item-cantidad').textContent = producto.cantidad;
    templateCarrito.querySelector('.item-precio').textContent = producto.price * producto.cantidad;

    //Botón Aumentar Cantidad Productos
    const botonSuma = templateCarrito.querySelector('.btn-suma')
    botonSuma.dataset.id = producto.id;

    //Estilos del botón aumentar   
    botonSuma.style.backgroundColor = "#86cad6";
    botonSuma.style.color = "white";
    botonSuma.style.border = "none";
    botonSuma.style.fontSize = "1rem";
    botonSuma.style.height = "2rem";
    botonSuma.style.width = "2rem";
    botonSuma.style.fontWeight = "bold"

    //Se expande al pasar el mouse
    botonSuma.addEventListener("mouseover", () => {
      botonSuma.style.transform = "scale(1.1)";
    })

    //Botón Disminuir Cantidad Productos
    const botonResta = templateCarrito.querySelector('.btn-resta')
    botonResta.dataset.id = producto.id;

    //Estilos del botón Disminuir 
    botonResta.style.backgroundColor = "#d35b5bfb";
    botonResta.style.color = "white";
    botonResta.style.border = "none";
    botonResta.style.fontSize = "1rem";
    botonResta.style.height = "2rem";
    botonResta.style.width = "2rem";
    botonResta.style.fontWeight = "bold"

    //Se expande al pasar el mouse
    botonResta.addEventListener("mouseover", () => {
      botonResta.style.transform = "scale(1.1)";
    })

    //Insertar en HTML
    const clone = templateCarrito.cloneNode(true);

    fragment.appendChild(clone);
  })
  items.appendChild(fragment);

  footerCarrito();
}

function calcularCantidad() {
  cantidad = Object.values(carrito).reduce((i, { cantidad }) => i + cantidad, 0);
  return cantidad
}

function calculartotalCarrito() {
  total = Object.values(carrito).reduce((i, { cantidad, price }) => i + cantidad * price, 0)
  return total
}


//Footer del Carrito-
const footerCarrito = () => {

  footer.innerHTML = ''

  //Suma la cantidad de productos
  const cantidadProductos = calcularCantidad()

  //Suma el precio total
  const totalCarrito = calculartotalCarrito()

  //Incorporamos al HTML
  templateFooter.querySelector('.total-productos').textContent = cantidadProductos;
  templateFooter.querySelector('.total-carrito').textContent = totalCarrito;
  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  //Badge Carrito
  const badgeContador = document.querySelector("#badgeCarrito")
  badgeContador.textContent = cantidadProductos

  //Boton Vaciar
  const Vaciar = document.querySelector('#vaciar');

  //Estilos Botón Vaciar
  Vaciar.style.backgroundColor = "#86cad6";
  Vaciar.style.color = "white";
  Vaciar.style.border = "none";
  Vaciar.style.borderRadius = "10px";
  Vaciar.style.fontSize = "1rem";
  Vaciar.style.padding = "5%";

  //Se expande al pasar el mouse
  Vaciar.addEventListener("mouseover", () => {
    Vaciar.style.transform = "scale(1.1)";

    //Evento vaciar
    Vaciar.addEventListener('click', () => Swal.fire({
      title: '¿Estás Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#86cad6',
      cancelButtonColor: '#d35b5bfb',
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito(),
          msjSwal("¡El carrito está vacío!")
      }
    }))
  })
}

//Hacemos función vaciar carrito (Se va a invocar también cuando se envíe el formulario con venta exitosa)
const vaciarCarrito = () => {

  //Boramos productos
  carrito = {};

  //Borramos también los productos del Local Storage
  localStorage.clear();

  //Actualizamos el carrito
  renderizarCarrito();
}

//Botones que suman y restan los productos en el carrito
items.addEventListener('click', evento => { btnSumayResta(evento) })

const btnSumayResta = evento => {

  //Botón para aumentar la cantidad de productos
  if (evento.target.classList.contains('btn-suma')) {

    const producto = carrito[evento.target.dataset.id];

    producto.cantidad++;

    carrito[evento.target.dataset.id] = { ...producto };

    //mensaje al usuario
    toast("Se ha agregado el Artículo" + " " + evento.target.dataset.id + " " + "al carrito")

    //Actualiza en el carrito
    renderizarCarrito();

    //Actualiza en Local Storage
    guardarEnLocalStorage();
  }

  //Resta
  if (evento.target.classList.contains('btn-resta')) {

    const producto = carrito[evento.target.dataset.id];

    producto.cantidad--;

    toastResta("Se ha eliminado el Artículo" + " " + evento.target.dataset.id + " " + "del carrito")

    if (producto.cantidad === 0) {

      delete carrito[evento.target.dataset.id];
    }

    else { carrito[evento.target.dataset.id] = { ...producto } }

    //Actualiza en el carrito
    renderizarCarrito()

    //Acualiza en Local Storage
    guardarEnLocalStorage()

  }
}

//Botón comprar
const comprar = document.getElementById("comprar")
comprar.addEventListener("click", () => {

  //Mensaje al usuario (Swal con función)
  Swal.fire({
    title: '¿Estás Seguro?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#86cad6',
    cancelButtonColor: '#d35b5bfb',
    cancelButtonText: 'No',
    confirmButtonText: 'Si'
  }).then((result) => {
    if (result.isConfirmed) {
      (Object.keys(carrito).length === 0) ? error("El carrito está vacío. \n Primero tenés que agregar productos") : msjSwal("¡Genial!\n ¡Completá el formulario de pago!\n  Allí también podrás calcular el costo de envío.")
    }
  })
})

//---------------------------------FORMULARIO DE PAGO-------------------------------------//

const formulario = document.getElementById('formulario');

const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  domicilio: /^[a-zA-Z0-9\s]{1,40}$/, // Letras, espacios y números, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,//Formato email
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  tarjeta: /^\d{16}$/, // 16 numeros
  vencimiento: /^\d{4}$/, // 4 numeros.
  codigo: /^\d{3,4}$/, // 3 ó 4 numeros.
}

const campos = {
  nombre: false,
  apellido: false,
  domicilio: false,
  correo: false,
  telefono: false,
  tarjeta: false,
  vencimiento: false,
  codigo: false
}

const validarFormulario = (evento) => {
  switch (evento.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, evento.target, 'nombre');
      break;
    case "apellido":
      validarCampo(expresiones.apellido, evento.target, 'apellido');
      break;
    case "domicilio":
      validarCampo(expresiones.domicilio, evento.target, 'domicilio');
      break;
    case "correo":
      validarCampo(expresiones.correo, evento.target, 'correo');
      break;
    case "telefono":
      validarCampo(expresiones.telefono, evento.target, 'telefono');
      break;
    case "tarjeta":
      validarCampo(expresiones.tarjeta, evento.target, 'tarjeta');
      break;
    case "vencimiento":
      validarCampo(expresiones.vencimiento, evento.target, 'vencimiento');
      break;
    case "codigo":
      validarCampo(expresiones.codigo, evento.target, 'codigo');
      break;
  }
}

//Valida que cada uno de los campos cumpla con el patrón
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    campos[campo] = true;
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    campos[campo] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);

  input.addEventListener('blur', validarFormulario);
});

//Validación cuando se haga click en botón submit
formulario.addEventListener('submit', (e) => {

  e.preventDefault();

  //Si falta algún dato va a dar mensaje de error
  if (nombre.value === "" || apellido.value === "" || domicilio.value === "" || telefono.value === "" || correo.value === "" || tarjeta.value === "" || vencimiento.value === "" || codigo.value === "" || envio.value === "" || cuotas.value === "") {
    return error("¡Tenés que completar todos los campos!")

  }
  //Si no hay productos en el carrito va a dar error
  else if (Object.keys(carrito).length === 0) {

    error("El carrito está vacío. Primero tenés que agregar productos")
  }

  //Si están todos los campos completos, se envía
  else {
    exito("¡Gracias por tu compra! En breve recibirás un correo electrónico de confirmación en" + " " + correo.value)

    //Limpia los datos del Formulario
    document.getElementById("formulario").reset();

    //Limpia los productos del carrito
    vaciarCarrito()
  }
});

//---------------------------CÁLCULO DEL PRECIO DE ENVÍO-----------------------------------//

//Calcula el precio total con envío al hacer click en el botón calculadora
const calcularEnvio = document.getElementById("calcularEnvio")
calcularEnvio.addEventListener("click", () => {

  //Precio (lo toma del carrito)
  const obtenerPrecio = calculartotalCarrito()
  const precio = parseInt(obtenerPrecio)

  //Variables por zona
  const CABA = 1000
  const GBA = 2000
  const Interior = 4000

  //Toma la zona ingresada por el usuario
  const valorEnvio = document.getElementById("envio").value

  //En este input va a aparecer el precio final a pagar
  const inputConEnvio = document.getElementById("precio-con-envio")
  inputConEnvio.style.color = "white"
  inputConEnvio.style.textAlign = "center"
  inputConEnvio.style.backgroundColor = "#86cad6"
  inputConEnvio.style.fontWeight = "bold"

  //Función para que calcule el precio según el lugar de envío y lo devuelva con mensaje
  const SumaEnvio = (precio, zona) => {
    //calculo con parámetros del precio que esté en el carrito y la zona elegida por el usuario
    precioFinal = (precio + zona)
    //El precio final aparecerá en un input
    return inputConEnvio.value = "$" + precioFinal
  }

  //Calcula el precio + el costo de envío según zona
  const PrecioConEnvio = () => {
    switch (valorEnvio) {
      case ("CABA"):
        //Mensaje con costo de envío
        msjSwal(" El costo de envío a tu domicilio es $" + CABA),
          //Suma del precio del Carrito + zona
          SumaEnvio(precio, CABA)
        break;
      case "GBA":
        //Mensaje con costo de envío
        msjSwal(" El costo de envío a tu domicilio es $" + GBA),
          //Suma del precio del Carrito + zona
          SumaEnvio(precio, GBA)
        break;
      case "Interior":
        //Mensaje con costo de envío
        msjSwal(" El costo de envío a tu domicilio es $" + Interior),
          //Suma del precio del Carrito + zona
          SumaEnvio(precio, Interior)
        break;
    }
  }

  //Va a calcular el precio de envío siempre y cuando haya productos en Carrito, caso contrario va a dar un mensaje de error
  (Object.keys(carrito).length === 0) ? error("El carrito está vacío. \n Primero tenés que agregar productos") : PrecioConEnvio()

})


//-------------------------------CÁLCULO CUOTAS-----------------------------------//

//Calcula las cuotas al hacer click en el botón calculadora
const calcularCuotas = document.getElementById("calcular")
calcularCuotas.addEventListener("click", () => {

  // Tasa de interés por cuota
  const interes = 0.05

  //Cuotas (Lo obtiene del valor del input cuando es seleccionado por el usuario)
  const obtenerCuotas = document.getElementById("cuotas").value
  const cuotas = parseInt(obtenerCuotas)

  //Calcula el precio final (productos+envio) con el recargo total
  const valorRecargo = (precioFinal, cuotas, interes) => {
    conrecargo = (precioFinal + (precioFinal * (cuotas * interes)))
    return conrecargo
  }

  //Calcula el valor de las cuotas individualmente
  const valorCuota = (precioFinal, cuotas, interes,) => {
    porCuota = ((precioFinal + (precioFinal * (cuotas * interes))) / cuotas).toFixed(2)
    return porCuota
  }

  //Cálculo de la tasa de interés según cantidad de cuotas elegidas
  const interesMeses = (cuotas, interes) => {
    meses = Math.floor((cuotas * interes) * 100)
    return meses
  }

  //Con esto vamos a rellenar el input con el mensaje de la cantidad de cuotas y el valor a pagar
  let inputCuotas = document.getElementById("precio-en-cuotas")
  inputCuotas.style.textAlign = "center"
  inputCuotas.style.color = "white"
  inputCuotas.style.backgroundColor = "#86cad6"
  inputCuotas.style.border = "5px, solid, #bfbeba"
  inputCuotas.style.fontWeight = "bold"

  // Cuando el usuario quiera calcular las cuotas, primero va a chequear que haya productos en carrito
  if (Object.keys(carrito).length === 0) {

    //Si el carrito estuviera vacío, da mensaje de error
    error("El carrito está vacío. \n Primero tenés que agregar productos")
  }

  // Cuando se ingresen entre 2 y 6 cuotas
  else if (cuotas >= 2) {

    //Le informa al usuario la tasa de interés a pagar (según la cantidad de cuotas elegidas y el precio con recargo)
    msjSwal("En" + " " + cuotas + " " + "cuotas, el recargo es de" + "  " + interesMeses(cuotas, interes) + "%. \n Pagarás en total" + " " + "$" + valorRecargo(precioFinal, cuotas, interes))

    //Informa a través de un input el valor de la cuota mensual
    inputCuotas.value = (cuotas + " " + "cuotas de" + " " + "$" + valorCuota(precioFinal, cuotas, interes))
  }

  //Si es en una sola cuota, no tiene interés
  else {
    //Se informa al usuario que no hay interés
    msjSwal("Pagarás" + " " + "$" + precioFinal + " " + "sin interés"),

      //Se rellena el input
      inputCuotas.value = ("Una cuota de" + " " + "$" + precioFinal + " " + "sin interés")

  }
}
)

//--------------------------------VALIDACIÓN FORMULARIO DEL FOOTER---------------------------------//

//Patrón Formato Email
const correoE = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

//Definimos qué va a pasar cuando se cliquee en enviar
const btnNL = document.getElementById("btn-NL");

btnNL.addEventListener('click', validacionNL = (e) => {

  e.preventDefault();
  //Se valida que se ingrese el email y que este tenga el formato de email
  //Si no se ingresa correo o no es válido, sale un error
  if ((NL.value === "") || (!correoE.test(NL.value))) {
    return error("¡Ingresá un correo electrónico válido, así podés enterarte de nuestras novedades!")
  }

  //Si se ingresa correo y este es válido, sale mensaje de éxitp
  return exito("¡Gracias! \n ¡Te enviaremos nuestras novedades!")
});



