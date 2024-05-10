// la función recibe el valor de un input junto con su nombre, y devuelve un mensaje de error correspondiente al tipo de input
// si la comprobación falla, o muestra un mensaje vacío tiene éxito

export const inputValidator = (inputValue, inputName) => {
  if (inputValue === "") {
    return "Campo obligatorio, pro favor introduza sus datos";
  }

  if (inputValue.length > 50) {
    return "No es posible introducir más de 50 caracteres";
  }
  if (
    inputName === "password" &&
    (inputValue.length <= 6 || inputValue.length >= 12)
  ) {
    return "La contraseña debe tener entre 6 y 12 caracteres";
  }
  if (
    inputName === "email" &&
    (!inputValue.includes("@") || !inputValue.includes("."))
  ) {
    return "Introduce un email válido";
  }


  return "";
};
