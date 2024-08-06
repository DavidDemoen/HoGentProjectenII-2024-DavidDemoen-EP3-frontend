//import { Row, Col } from "react-bootstrap";

const renderFieldType = (type, formik, name, id, label, rest) => {
  switch (type) {
    case "textarea":
      return (
        <textarea
          id={id}
          rows={rest.rows}
          onChange={formik.handleChange}
          value={formik.values[name]}
          //data-cy={data_cy}
        />
      );
    case "text":
      return (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={formik.values[name]}
          onChange={formik.handleChange}
          value={formik.values[name]}
          disabled={rest.disabled}
          //data-cy={data_cy}
        />
      );
    case "select":
      return (
        <select
          id={id}
          name={name}
          onChange={formik.handleChange}
          value={formik.values[name]}
          //placeholder={rest.placeholder.name}
          //data-cy={data_cy}
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
              />
              No
            </label>
          </div>
        </>
      );

    default:
      return null;
  }
};

export function FormInputField({ id, name, label, type, formik, ...rest }) {
  return (
    <>
      <div className="mb-2">
        <div className="p-2">
          <div className="col-3 mr-2">
            <label htmlFor={name}>{`${label}:`}</label>
          </div>
          <div>
            {/* <textarea
                id={id}
                rows={rest.rows}
                placeholder={`Enter ${label}`}
                onChange={formik.handleChange}
                value={formik.values[name]}
                //data-cy={data_cy}
              /> */}
            {renderFieldType(type, formik, name, id, label, rest)}
          </div>
        </div>
      </div>
    </>
  );
}
