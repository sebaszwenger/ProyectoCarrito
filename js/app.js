
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

//Listeners

cargarEventListeners();

function cargarEventListeners () {
    listaCursos.addEventListener('click', agregarCurso);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [],
        vaciarHTML()
    })

    carrito.addEventListener('click', eliminarCursos);

};

//Agrega curso al carrito
function agregarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Envio el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    } 
}

//Lee datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        nombre: curso.querySelector('.info-card h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    if (articulosCarrito.some( curso => curso.id === infoCurso.id )) {
        const cursos = articulosCarrito.map( curso => { 
            if (curso.id === infoCurso.id) {
                curso.cantidad ++
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//Muestra el carrito en el HTML
function carritoHTML(){
    vaciarHTML();
    articulosCarrito.forEach( curso => {
        // console.log(curso);
        const {nombre, imagen, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> <img src="${imagen}" width=100> </td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td> <a href="#" class="borrar-curso" data-id="${id}">X</a> </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

//Elimino el HTML previo en el carrito
function vaciarHTML(){
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//Elimina un curso del carrito
function eliminarCursos(e) {
    e.preventDefault();
    console.log(e.target.className);
    if(e.target.className ==='borrar-curso') {
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
    }    
};