
import React from 'react'

const Alert = (prop) => {

    return (
        prop.alert && <div className={`alert alert-${prop.alert.bg} alert-dismissible m-2 fade show`} role="alert">
        <strong>{prop.alert.type}</strong> {prop.alert.msg}
    </div>
    )
}

export default Alert