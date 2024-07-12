function agregarFila() {
    var gusto = document.getElementById('gusto').value;
    var porcentaje = document.getElementById('porcentaje').value;
    
    var tabla = document.getElementById('tabla').getElementsByTagName('tbody')[0];
    var fila = tabla.insertRow();
    
    var celdagusto = fila.insertCell(0);
    var celdaporcentaje = fila.insertCell(1);
    var celdaEditar = fila.insertCell(2);
    
    celdaEditar.innerHTML = '<button class="boton-editar" onclick="editarFila(this)">Editar</button>';
    celdagusto.innerHTML = '<input type="text" value="' + gusto + '" style="display:none;" readonly>';
    celdaporcentaje.innerHTML = '<input type="text" value="' + porcentaje + '" style="display:none;" readonly>';
    
    // Limpiar los campos del formulario después de agregar la fila
    document.getElementById('gusto').value = '';
    document.getElementById('porcentaje').value = '';
}

function editarFila(botonEditar) {
    var fila = botonEditar.parentNode.parentNode;
    var celdas = fila.getElementsByTagName('td');
    
    for (var i = 0; i < celdas.length - 1; i++) {
        var input = celdas[i].getElementsByTagName('input')[0];
        input.removeAttribute('readonly');
        input.style.display = 'block'; // Mostrar el campo de texto
    }
    botonEditar.innerHTML = 'Guardar';
    botonEditar.setAttribute('onclick', 'guardarFila(this)');
    
    // Mostrar el mensaje y los botones de aceptar y cancelar
    document.getElementById('mensaje').style.display = 'block';
    var botonesEdicion = document.querySelectorAll('.boton-edicion');
    botonesEdicion.forEach(function(boton) {
        boton.style.display = 'inline-block';
    });
}

function guardarFila(botonGuardar) {
    var fila = botonGuardar.parentNode.parentNode;
    var celdas = fila.getElementsByTagName('td');
    
    for (var i = 0; i < celdas.length - 1; i++) { // Excluimos la última celda de "Editar"
        var input = celdas[i].getElementsByTagName('input')[0];
        input.setAttribute('readonly', 'true');
        // Actualizar el contenido de la celda con el valor del input
        celdas[i].textContent = input.value;
    }
    botonGuardar.innerHTML = 'Editar';
    botonGuardar.setAttribute('onclick', 'editarFila(this)');
}





/*PARA LOS BOTONES DE GUARDAR Y BORRAR DATOS*/
function guardarCambios() {
    // Capturar los datos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;

    // Capturar los datos de la tabla
    var datosTabla = [];
    var filas = document.querySelectorAll("#tabla tbody tr");
    filas.forEach(function(fila) {
        var celdas = fila.querySelectorAll("td");
        var datoTabla = {
            gusto: celdas[0].textContent,
            porcentaje: celdas[1].textContent
        };
        datosTabla.push(datoTabla);
    });

    // Almacenar los datos en el almacenamiento local
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("datosTabla", JSON.stringify(datosTabla));

    // Redirigir a la página de la ficha
    window.location.href = "ficha.html";
}

function borrarDatos() {
    // Limpiar campos del formulario
    document.getElementById("gusto").value = "";
    document.getElementById("porcentaje").value = "";
    document.getElementById("nombre").value = ""; // ID del campo de nombre del formulario
    document.getElementById("email").value = ""; // ID del campo de apellido del formulario
    document.getElementById("telefono").value = ""; // ID del campo de teléfono del formulario

    // Eliminar todas las filas de la tabla
    var tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    tabla.innerHTML = "";

    // Ocultar los botones
    document.getElementById('mensaje').style.display = 'none';
    var botonesEdicion = document.querySelectorAll('.boton-edicion');
    botonesEdicion.forEach(function(boton) {
        boton.style.display = 'none';
    });
}


/*JS PARA LA FICHA DE IMPRESION*/
/*-----------------------------*/
/*-----------------------------*/
/*-----------------------------*/
/*-----------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos HTML donde se mostrarán los datos
    var nombreSpan = document.getElementById("nombre");
    var emailSpan = document.getElementById("email");
    var telefonoSpan = document.getElementById("telefono");
    var tablaDatos = document.getElementById("tablaDatos");

    // Recuperar los datos del formulario guardados en el almacenamiento local (o de donde estén disponibles)
    var nombre = localStorage.getItem("nombre");
    var email = localStorage.getItem("email");
    var telefono = localStorage.getItem("telefono");

    // Mostrar los datos del formulario en la ficha
    nombreSpan.textContent = nombre;
    emailSpan.textContent = email;
    telefonoSpan.textContent = telefono;

    // Recuperar los datos de la tabla (de donde estén disponibles)
    var datosTabla = localStorage.getItem("datosTabla");

    // Mostrar los datos de la tabla en la ficha
    if (datosTabla) {
        tablaDatos.innerHTML = datosTabla;
    }
});





document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los elementos HTML donde se mostrarán los datos
    var tablaDatos = document.getElementById("tablaDatos");

    // Recuperar los datos de la tabla del almacenamiento local (o de donde estén disponibles)
    var datosTabla = localStorage.getItem("datosTabla");

    // Parsear los datos JSON
    var datos = JSON.parse(datosTabla);

    // Mostrar los datos de la tabla en la ficha
    if (datos) {
        var html = "";
        datos.forEach(function(objeto) {
            html += "gusto: " + objeto.gusto + "<br>";
            html += "porcentaje: " + objeto.porcentaje + "%<br><br>";
        });
        tablaDatos.innerHTML = html;
    }
});

