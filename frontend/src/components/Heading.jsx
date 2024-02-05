
import PropTypes from 'prop-types';

export function Heading({label}) {
    return <div style={{
        fontWeight: "bold",
        fontSize: "2.25rem",
        paddingTop: "1.5rem",
    }}>
      {label}
    </div>
}

Heading.propTypes = {
    label: PropTypes.string.isRequired
}