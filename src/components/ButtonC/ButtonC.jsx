import "./ButtonC.css";

//----------------------------------------------------------------

export const ButtonC = ({ title, functionEmit, className }) => {
  return (
    <div className={className} onClick={functionEmit}>
      {title}
    </div>
  );
};
