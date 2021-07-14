
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

//Listeners

cargarEventListeners();

function cargarEventListeners () {
    listaCursos.addEventListener('click', agregarCurso);



};

//Agrega un curso al carrito
function agregarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = document.querySelector('.card')
        // Envio el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    } 
}

function leerDatosCurso(curso) {
    const infoCurso = {
        nombre: curso.querySelector('.info-card h4').textContent,
        imagen: curso.querySelector('img').src,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);
    if (articulosCarrito.some( articulo => articulo.id === infoCurso.id )) {
        const cursos = articulosCarrito.map( curso => { 
            if (curso.id === infoCurso.id) {
                console.log('articulo repetido');
                curso.cantidad ++
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
}



