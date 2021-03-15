import React from 'react'

function PanelList({ children, activeTab }) {
    return (
        <>
            {React.Children.toArray(children).map((child, index) => {
                if (child.props.tab.id !== activeTab) return null
                return React.cloneElement(child, {
                    key: index,
                    activeTab: activeTab,
                    index,
                })
            })}
        </>
    )
}

export default PanelList
