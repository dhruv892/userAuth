import PropTypes from "prop-types";

export function InputBox({label, placeholder, onChange}) {
    return <div>
        {/* this needs styiling */}
      <div>  
        {label}
      </div>
      <input onChange={onChange} placeholder={placeholder} />
    </div>
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};