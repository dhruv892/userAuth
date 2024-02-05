import PropTypes from "prop-types"

export function Button({label, onClick}) {
    return <button onClick={onClick} type="button">{label}</button>
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};