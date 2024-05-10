import "./CustomInput.css";

//----------------------------------------------------------------

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  onBlurHandler,
  value,
  isDisabled,
  errorText,
}) => {
  // props, properties, propiedades, se reciben como un objeto

  const claseJS = "clase-de-prueba";

  return (
    <div className="custom-input-container">
      {/*El input recibe un booleano indicando si el contenido es válido, y muestra una clase u otra*/}
      <input
        className={
          errorText === "" ? "input-design" : "input-design input-error"
        }
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        value={value}
        disabled={isDisabled}
        onChange={(e) => handlerProp(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <p>{errorText} </p>
    </div>
  );
};

// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />
