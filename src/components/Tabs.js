import React from 'react'
import './tabs.scss'

const Tabs = (props) => {
    const { children, ...rest } = props
    return (
        <div className="content-wrapper">
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, rest)
            })}
        </div>
    )
}

export default Tabs
