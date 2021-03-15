import React, { useRef, useState } from 'react'
import cx from 'classnames'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function TabList({
    children,
    activeTab,
    add,
    onDragComplete,
    maxLength,
    ...rest
}) {
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(true)

    const tabListRef = useRef(null)

    function onDragEnd(result) {
        if (!result.destination) return

        const startIndex = result.source.index
        const endIndex = result.destination.index
        onDragComplete(startIndex, endIndex)
    }

    function checkActiveArrows() {
        let isRightDisbbaled =
            Math.floor(
                tabListRef.current.scrollWidth - tabListRef.current.scrollLeft
            ) <= tabListRef.current.offsetWidth

        setLeft(tabListRef.current.scrollLeft === 0)
        setRight(isRightDisbbaled)
    }

    function onClickLeftArrow() {
        const tabwidth = tabListRef.current.clientWidth / 5
        const scrollLeft = tabListRef.current.scrollLeft

        if (!left) {
            tabListRef.current.scrollTo({
                top: 0,
                left: scrollLeft - tabwidth,
                behavior: 'smooth',
            })
        }
    }

    function onClickRightArrow() {
        const tabwidth = tabListRef.current.clientWidth / 5
        const scrollLeft = tabListRef.current.scrollLeft

        if (!right)
            tabListRef.current.scrollTo({
                top: 0,
                left: scrollLeft + tabwidth,
                behavior: 'smooth',
            })
    }
    function addTab() {
        if (maxLength <= children.length) return
        add()
        checkActiveArrows()
    }

    return (
        <div className="tablist-wrapper">
            <span
                className={cx('chevron', {
                    'chevron--disabled': left,
                })}
            >
                <i
                    onClick={() => onClickLeftArrow()}
                    className="fas fa-chevron-left"
                ></i>
            </span>

            <div
                className="tab-list-scroller"
                ref={tabListRef}
                onScroll={checkActiveArrows}
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={cx('tab-list', {
                                    'tab-list__dragging':
                                        snapshot.isDraggingOver,
                                })}
                                {...provided.droppableProps}
                            >
                                {React.Children.map(children, (child, index) =>
                                    React.cloneElement(child, {
                                        key: index,
                                        activeTab: activeTab,
                                        tabIndex: index,
                                        ...rest,
                                    })
                                )}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <span
                className={cx('chevron', {
                    'chevron--disabled': right,
                })}
            >
                <i
                    onClick={() => onClickRightArrow()}
                    className="fas fa-chevron-right"
                ></i>
            </span>
            <span className="add-tab" onClick={addTab}>
                +
            </span>
        </div>
    )
}

export default TabList
