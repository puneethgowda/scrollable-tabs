import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import cx from 'classnames'

function Tab({ tab, tabIndex, activeTab, onClickTab, remove, children }) {
    function deleteTab(e, tab) {
        e.stopPropagation()
        remove(tab)
    }
    return (
        <Draggable key={tab.id} draggableId={tab.id} index={tabIndex}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cx(
                        'tab-item',
                        {
                            'tab-item__dragging': snapshot.isDragging,
                        },
                        { 'tab-item__active': activeTab === tab.id }
                    )}
                    style={{ ...provided.draggableProps.style }}
                    onClick={() => onClickTab(tab.id)}
                >
                    {children}
                    <span
                        className="tab-item__delete"
                        onClick={(e) => deleteTab(e, tab)}
                    >
                        {' '}
                        x{' '}
                    </span>
                </div>
            )}
        </Draggable>
    )
}

export default Tab
