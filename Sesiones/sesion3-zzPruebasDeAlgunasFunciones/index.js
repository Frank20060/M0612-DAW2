let texto = "       Hola caracola             ";
console.log(texto.trim())////Quita los espacios

texto = texto.trim()

console.log(texto.length)   ///Lo largo que es

console.log(texto[2])

console.log(texto.slice(0,5))   ///Muestra todos los caracteres que haya entre los dos numeros que le pasas
const textoTruncado = texto.slice(0,6) + "..."
console.log(textoTruncado) 

console.log(texto.split(" ")) //Convierte el texto en un array ya que este separa por lo que se le pasa en las comillas, en este caso es un espacio

let textazo = "Hola caracola, como estas? Yo estoy bien, gracias por preguntar. Me gusta mucho programar en JavaScript y aprender nuevas cosas cada dia. Los macarrones con tomate son mi comida favorita. El sol brilla en el cielo y los pajaros cantan alegremente. La vida es bella y hay que disfrutarla al maximo. Por las noches me gusta leer libros de aventuras y misterio. El cine es una de mis aficiones favoritas, especialmente las peliculas de ciencia ficcion. Los videojuegos son una forma divertida de pasar el tiempo y desconectar del mundo real."
let cont = (textazo.split(" ")).length
console.log("Textazo tiene "+ cont +" palabras")

fecha = "2025-10-07T19:21:20:089"   //13 del 8 de 2025 a las 19 horas y 21 minutos

const fecha2 = fecha.split("T")
const fechaHora = fecha2[1].split(":")
const fechaFecha = fecha2[0].split("-")

console.log(fechaFecha[2] +" del " + fechaFecha[1] + " de " + fechaFecha[0] + " a las " + fechaHora[0] + " horas y " + fechaHora[1]+ " minutos")