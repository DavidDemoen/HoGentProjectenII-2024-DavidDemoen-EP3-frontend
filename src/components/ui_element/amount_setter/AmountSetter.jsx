import "../../../../styles/ui_element/amountsetter_styles.css";

export function AmountSetter({ amount, addFunction, removeFunction, title }) {
  return (
    <>
      <div className="setter-box">
        <div>{title}</div>
        <div className="setter-buttons-box">
          <div onClick={removeFunction} className="setter-button">-</div>
          <div>{amount}</div>
          <div onClick={addFunction} className="setter-button">+</div>
        </div>
      </div>
    </>
  );
}
