export const jwtConstants = {
	secret: "Something that will never happen", //Production
};
//TODO: pasarlo a variable de entorno la frase o tomar medidas de seguridad adecuadas
/* 
ADVERTENCIA
NO EXPONGA ESTA CLAVE PÚBLICAMENTE. 
Lo hemos hecho aquí para dejar claro lo que está haciendo el código, pero en un sistema de 
producción debe proteger esta clave mediante las medidas adecuadas, 
como un almacén de secretos, una variable de entorno o un servicio de 
configuración.
*/
