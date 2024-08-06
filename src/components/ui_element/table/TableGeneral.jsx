export function TableGeneral({ header, data, buttons, tableKeys }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {tableKeys.map((key, keyIndex) => (
                <td key={keyIndex}>{item[key]}</td>
              ))}

              {buttons.map((button, buttonIndex) => (
                <td key={buttonIndex}>
                  <button
                    onClick={() => button.onClick(item.id)}
                    disabled={button.disabled}
                  >
                    {button.name}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
