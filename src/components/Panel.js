import React from 'react'

function PanelList({ activeTab, tab, children }) {
    const active = activeTab === tab.id
    return <div className="tab-content">{active && children}</div>
}

export default PanelList
