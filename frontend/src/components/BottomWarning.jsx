import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export function BottomWarning({label, buttonText, to}) {
    return <div>
      <div>
        {label}
      </div>
      <Link to={to}>
        {buttonText}
      </Link>
    </div>
}

BottomWarning.propTypes = {
    label: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};
