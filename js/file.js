fetch(`https://apipetshop.herokuapp.com/api/articulos`)
    .then(response => response.json())
    .then(data => {
        mainFunction(data)
    })

    // separo los items y los guardo en un array
function separateData(data) {

    const items = []
    for (var i = 0; i < data.response.length; i++) {
        if (document.getElementById('juguetesItems')) {
            data.response[i].tipo == "Juguete" && items.push(data.response[i])
        } else if (document.getElementById('farmaciaItems')) {
            data.response[i].tipo == "Medicamento" && items.push(data.response[i])
        }

    }
    return items

}

// creo una función para crear las cards de los objetos, insertando en su innerHTML la información filtrada, también creo el modal para cada uno

const padre = document.getElementById('cardsItems')

function mainFunction(data) {
    const button = document.getElementsByClassName("botonCompra")
    const producto = separateData(data)
    for (var i = 0; i < producto.length; i++) {
        const caja = document.createElement('div')
        const cantStock = producto[i].stock < 5 ? "Últimas unidades!" : ''

        caja.innerHTML = `
        <div class="contenedorTarjetas">
         <div><h4>${producto[i].nombre}</h4></div>
        
         <div><img class="imgTarjeta" src=${producto[i].imagen} alt="producto" style="width:250px;height:250px;"></div>
        
         <div><h4>$${producto[i].precio}</h4></div>
         <div>
         <button class="botonCompra">Comprar</button>
         </div>
         <button type="button" class="btn btn-primary btnModal" data-bs-toggle="modal" data-bs-target="#b${[i]}">
         Info
         </button>
         <div><h4 class="ultimasUnidades">${cantStock}</h4></div>
         <div class="modal fade" id="b${[i]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content">
            <div class="modal-header">
             <h5 class="modal-title" id="exampleModalLabel">${producto[i].nombre}</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            ${producto[i].descripcion}
            </div>
            <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
           </div>
          </div>
         </div>
    
        </div>
        
        `
        padre.appendChild(caja)

        // uso el mismo for para los botones de compra, les doy un addEventListener

        button[i].addEventListener('click', (e) => {
            e.preventDefault()
            swal("Producto seleccionado", "Muchas gracias por tu compra!", "success");

        })
    }
}

// botón formulario

if (document.getElementById("contact")) {
    const boton = document.getElementById("btn")

    boton.addEventListener('click', (e) => {
        e.preventDefault()
        if (document.getElementById('name').value != "" && document.getElementById('lastname').value != "" && document.getElementById('phone').value != "") {
            swal("Muchas gracias!", "Nos comunicaremos con vos a la brevedad!", "success");

            document.getElementById("myForm").reset()
        } else {
            swal("Error", "Debés completar todos los datos", "error");

        }


    })

}