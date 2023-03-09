//? importamos express para montar el servidor
const express = require('express');
//? Usando el modulo fs de node para manejar archivos.
const fs = require('fs');

//? Configuracion inicial del servidor
const app = express();
const port = 3000;

//? Usamos middleware de express para aceptar formato urlencoded en el request y
//? para definir la carpeta del formulario html y sus estilos
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//? Definimos la peticion y la ruta donde el formulario enviara los datos
app.post('/registrar', (req, res) => {
  //?Capturamos la informacion del body de la peticion
  const nombre = req.body.nombre;
  const fechaNacimiento = new Date(req.body.fecha_nacimiento.replace(/-/g, '\/'));
  //? Generamos la fecha de hoy paar compara con la fecha de nacimiento
  const hoy = new Date();
  //? Usamos el metodo getFullYear para obtener solo el año
  //? Restamos la fecha actual a la fecha de nacimiento para obtener la edad
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

  //? Geeneramos la Variable usuario con la informacion aguardar en el txt
  const usuario = `Nombre:${nombre}, Fecha de nacimiento:${fechaNacimiento.toLocaleDateString()}, Edad:${edad}\n`;

  //? Usamos el metodo appendFile para generar el txt si no existe y escribir la informacion en la variable usuario, validamos si estiste algun eroror 
  fs.appendFile('usuarios.txt', usuario, (error) => {
    if (error) throw error;
    console.log(`Usuario registrado: ${usuario}`);
  });
  //? Enviamos el mensaje de respuesta con los datos indicados: nombre y edad.
  res.send(`¡Hola ${nombre}! Tienes ${edad} años.`);
});

//? info en url raiz para saber que todo esta OK
app.get('/', (req, res) => {
  res.status(200).send('Servidor Ok')
});

//? Iniciamos el servidor para poder recibir peticiones.
app.listen(port, () => {
  console.log(`Servidor web iniciado en el puerto ${port}, link: http://localhost:3000/ `);
});