//
// IMPORTS
//
// libraries
// app modules
import showProjectData from './projectInfo'
import {
    showBliptip,
    hideBliptip,
    highlightTableEntry,
    lowlightTableEntry,
} from '../util/blipTooltip'

//
// EXPORTS
//
export { linkupTables as default }

//
// FUNCTIONS
//
const linkupTables = () => {
    // 1) Linkup all segment tables
    document.querySelectorAll('#tables > .segment-table').forEach((segTable) => {
        // 2) for all ring tables in the segment
        segTable.querySelectorAll('.ring-table').forEach((ringTable) => linkupRingTable(ringTable))
    })
}

const linkupRingTable = (ringTable) => {
    // 1) Check if blips are in the ring
    if (ringTable.querySelectorAll('li').length > 0) {
        addFlicker(ringTable)
        linkupEntries(ringTable)
    }
}

const addFlicker = (ringTable) => {
    // 2) Add the flicker
    const flickerDiv = document.createElement('div')
    flickerDiv.classList.add('flicker')
    flickerDiv.innerHTML = '⌃'
    ringTable.querySelector('.rtHeader').appendChild(flickerDiv)
    // 3) Add the action hand to the flicker
    // 3) Add mouse click event to the flicker
    flickerDiv.addEventListener('click', (e) => {
        // 3.1) Hide or show?
        const list = e.target.parentNode.nextSibling
        if (list.classList.contains('hide')) {
            // 3.1.1) show
            list.classList.remove('hide')
            flickerDiv.classList.remove('closed')
        } else {
            // 3.1.2) hide
            list.classList.add('hide')
            flickerDiv.classList.add('closed')
        }
    })
}

const linkupEntries = (ringTable) => {
    ringTable.querySelectorAll('li div').forEach((e) => {
        e.addEventListener('mouseenter', (e) => {
            e.preventDefault()
            e.stopPropagation()
            showBliptip(document.getElementById(e.target.dataset.blipId))
            highlightTableEntry(e.target)
        })
        e.addEventListener('mouseout', (e) => {
            e.preventDefault()
            e.stopPropagation()
            hideBliptip(document.getElementById(e.target.dataset.blipId))
            lowlightTableEntry(e.target)
        })
        e.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const dataSet = document.getElementById(e.target.dataset.blipId).dataset
            showProjectData(
                dataSet.cwId,
                dataSet.segment,
                dataSet.ring,
                JSON.parse(dataSet.performance),
                dataSet.jrcTags
            )
        })
    })
}
