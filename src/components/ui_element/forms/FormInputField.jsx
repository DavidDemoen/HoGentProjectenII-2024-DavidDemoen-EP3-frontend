import "../../../../styles/ui_element/listTable_styles.css";

const renderFieldType = (type, formik, name, id, label, rest) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          id={id}
          rows={rest.rows}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          //data-cy={data_cy}
          className={rest.disabled ? "list-table-item-text-disabled" : "none"}
        />
      );
    case "text":
      return (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={
            formik.values[name] ? formik.values[name] : `Enter ${label}`
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          disabled={rest.disabled}
          //data-cy={data_cy}
          className={rest.disabled ? "list-table-item-text-disabled" : "none"}
        />
      );
    case "select":
      return (
        <select
          id={id}
          name={name}
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          value={formik.values[name]}
          //placeholder={rest.placeholder.name}
          //data-cy={data_cy}
          disabled={rest.disabled}
          className={rest.disabled ? "list-table-item-text-disabled" : "none"}
        >
          {/* <option value="" disabled>
            {rest.defaultValue.name}
          </option> */}
          <option value="" disabled>
            --select {label}--
          </option>

          {rest.options.map((option, index) => (
            <option key={index} value={option[rest.idParam]}>
              {option.name}
            </option>
          ))}
        </select>
      );
    case "boolean-radio":
      return (
        <>
          <div>
            <label>
              <input
                type="radio"
                name={name}
                value="true"
                checked={formik.values[name] === true}
                onChange={() => formik.setFieldValue(name, true)}
                onBlur={formik.handleBlur}
                className={
                  rest.disabled ? "list-table-item-text-disabled" : "none"
                }
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={name}
                value="false"
                checked={formik.values[name] === false}
                onChange={() => formik.setFieldValue(name, false)}
                className={
                  rest.disabled ? "list-table-item-text-disabled" : "none"
                }
              />
              No
            </label>
          </div>
        </>
      );
    case "radio":
      return (
        <>
          <div className="radio-box">
            {rest.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={name}
                  value={formik.values[name]}
                  checked={formik.values[name] === option.name}
                  onChange={() => formik.setFieldValue(name, option.name)}
                  disabled={rest.disabled}
                />
                {option.name}
              </label>
            ))}
          </div>
        </>
      );

    default:
      return null;
  }
};

export function FormInputField({ id, name, label, type, formik, ...rest }) {
  const hasError = formik.errors[name] && formik.touched[name];

  return (
    <>
      <div className="list-table-item">
        <label
          htmlFor={name}
          className="list-table-item-label"
        >{`${label}:`}</label>
        <div className="list-table-item-text">
          {renderFieldType(type, formik, name, id, label, rest)}
        </div>
        {hasError && (
          <div className="list-table-item-error">{formik.errors[name]}</div>
        )}
      </div>
    </>
  );
}
