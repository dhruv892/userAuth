
import PropTypes from 'prop-types';

export function SubHeading({label}) {
    return <div style={{
        color: "rgb(100, 116, 139)",
        fontSize: "1rem",
        paddingTop: "0.25rem",
        paddingBottom: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem"
    }}>
      {label}
    </div>
  }

SubHeading.propTypes = {
    label: PropTypes.string.isRequired
}