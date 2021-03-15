import React, { useState } from 'react'
import Tabs from './Tabs'
import TabList from './TabList'
import Tab from './Tab'
import PanelList from './PanelList'
import Panel from './Panel'
import { makeData, makeTabData } from './makeData'
import { toast } from 'react-toastify'

const INITIAL_TABS_LENGTH = 3
const MAX_LENGTH = 10

function Usage() {
    const data = makeData(INITIAL_TABS_LENGTH)
    const [tabs, setTabs] = useState(data)
    const [activeTab, setActiveTab] = useState(data[0].id)

    function addTab() {
        const indexArr = tabs.map((tab) => tab.index)
        indexArr.sort((a, b) => a - b)
        const lastItem = indexArr.pop()
        const newObj = makeTabData(lastItem)
        setTabs((state) => [...state, newObj])
    }

    function onClickTab(tab) {
        setActiveTab(tab)
    }

    function removeTab(deletedTab) {
        const tabsLength = tabs.length
        if (tabsLength === 1) {
            toast.error('Tablist must have at least one tab')
            return
        }

        if (activeTab === deletedTab.id) {
            let index = tabs.findIndex((tab) => tab.id === deletedTab.id)
            if (index > 0) setActiveTab(tabs[index - 1].id)
            else setActiveTab(tabs[index + 1].id)
        }

        const list = tabs.filter((tab) => tab.id !== deletedTab.id)
        setTabs(list)
        toast.success(`${deletedTab.title} deleted successfully`)
    }

    function onDragComplete(startIndex, endIndex) {
        let updatedTabList = [...tabs]
        const [removed] = updatedTabList.splice(startIndex, 1)
        updatedTabList.splice(endIndex, 0, removed)
        setTabs(updatedTabList)
    }
    return (
        <Tabs
            activeTab={activeTab}
            onClickTab={onClickTab}
            add={addTab}
            remove={removeTab}
            maxLength={MAX_LENGTH}
            onDragComplete={onDragComplete}
        >
            <TabList>
                {tabs.map((tab) => (
                    <Tab key={tab.id} tab={tab}>
                        {tab.title}
                    </Tab>
                ))}
            </TabList>
            <PanelList>
                {tabs.map((tab, i) => (
                    <Panel key={tab.id} tab={tab}>
                        {tab.content}
                    </Panel>
                ))}
            </PanelList>
        </Tabs>
    )
}

export default Usage
