let usuarios = [];

document.getElementById("formUsuario").addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const correo = document.getElementById("correo").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const nacionalidad = document.getElementById("nacionalidad").value.trim();

    // VALIDACIONES
    if (edad < 0 || isNaN(edad)) {
        alert("La edad no puede ser negativa ni inválida.");
        return;
    }

    if (!/^\d{10}$/.test(celular)) {
        alert("El número de celular debe tener exactamente 10 dígitos.");
        return;
    }

    const usuario = { nombre, edad, correo, celular, nacionalidad };
    usuarios.push(usuario);

    mostrarUsuarios();
    e.target.reset();
});

function mostrarUsuarios() {
    let salida = "";

    usuarios.forEach((u, index) => {
        salida += `Usuario ${index + 1}:\n`;
        salida += `Nombre completo: ${u.nombre}\n`;
        salida += `Edad: ${u.edad}\n`;
        salida += `Correo: ${u.correo}\n`;
        salida += `Celular: ${u.celular}\n`;
        salida += `Nacionalidad: ${u.nacionalidad}\n\n`;
    });

    document.getElementById("salida").textContent = salida;
}

function ordenarPorEdad() {
    usuarios.sort((a, b) => a.edad - b.edad);
    mostrarUsuarios();
}

function ordenarPorNacionalidad() {
    usuarios.sort((a, b) => a.nacionalidad.localeCompare(b.nacionalidad));
    mostrarUsuarios();
}

function ordenarPorApellido() {
    usuarios.sort((a, b) => {
        const apellidoA = a.nombre.split(" ").slice(-1)[0];
        const apellidoB = b.nombre.split(" ").slice(-1)[0];
        return apellidoA.localeCompare(apellidoB);
    });
    mostrarUsuarios();
}

// DESCARGAR ARCHIVO JSON
function descargarJSON() {
    const dataStr = JSON.stringify(usuarios, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "usuarios.json";
    a.click();

    URL.revokeObjectURL(url);
}

// CARGAR ARCHIVO JSON Y MOSTRARLO EN LISTA
function cargarJSON() {
    const input = document.getElementById("inputJSON");

    if (!input.files[0]) {
        alert("Por favor selecciona un archivo JSON.");
        return;
    }

    const archivo = input.files[0];
    const lector = new FileReader();

    lector.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);

            if (!Array.isArray(data)) {
                alert("El archivo JSON debe contener un arreglo de usuarios.");
                return;
            }

            // Validación y carga de usuarios
            data.forEach(usuario => {
                if (usuario.nombre && usuario.edad && usuario.correo && usuario.celular && usuario.nacionalidad) {
                    usuarios.push(usuario);
                }
            });

            mostrarUsuarios();
            alert("Usuarios cargados correctamente.");

        } catch (error) {
            alert("El archivo no es un JSON válido.");
        }
    };

    lector.readAsText(archivo);
}
