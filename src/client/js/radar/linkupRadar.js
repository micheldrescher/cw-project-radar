//
// IMPORTS
//
// libraries
// app modules
import showAlert from '../util/alert'
import showProjectData from './projectInfo'
import { SimpleMetric } from '../../../common/web-components/simple-metric/simple-metric'

//
// EXPORTS
//
export { linkupRadar as default }

//
// FUNCTIONS
//
const linkupRadar = async (radarRootDOM) => {
    // register custom HTML elements for this radar
    customElements.define('simple-metric', SimpleMetric)

    // 1) Animate interactive quadrants
    interactiveQuadrants()
    // 2) Popover texts for blips
    interactiveBlips()
}

/*****************
 *               *
 *   QUADRANTS   *
 *               *
 *****************/
const interactiveQuadrants = () => {
    document.querySelectorAll('.segment').forEach((s, i) => {
        s.addEventListener('mouseover', mouseOverQuadrant(i))
        s.addEventListener('mouseout', mouseOutQuadrant(i))
    //     b.addEventListener('click', clickBlip())
    })
}

// highlight the selected quadrant,
// dim the others
const mouseOverQuadrant = (i) => {
    return (e) => {
        document.querySelectorAll(`.segment-${i}`).forEach((s) => s.style.opacity = 1)
        document.querySelectorAll(`.segment:not(.segment-${i})`).forEach((s) => s.style.opacity = 0.3)
    }
}

// highlight all segments again
const mouseOutQuadrant = (i) => {
    return (e) => {
        document.querySelectorAll(`.segment:not(.segment-${i})`).forEach((s) => s.style.opacity = 1)
    }
    // d3.selectAll(`.segment:not(.segment-${i})`).style('opacity', 1)
}

// click the quadrant:
// 1. scales up the selected quadrant and hides all other
// 2. shows the quadrant's table and hides the others
const clickQuadrant = (d, i, a) => {
    console.log('Quadrant click event handling!')

    const zoomed = d3.select(`g.segment.segment-${i}`).classed('zoomed')
    // if we are in zoom mode, unzoom
    if (zoomed) {
        // unzoom segments
        d3.select(`g.segment.segment-${i}`).style('transform', undefined).classed('zoomed', false)
        d3.selectAll(`.segment:not(.segment-${i})`).style('transform', undefined)
        // "un"rotate blips & performance ring
        d3.selectAll(`g.segment.segment-${i} .blip text`).style('transform', undefined)
        // hide the segment table
        d3.selectAll(`.segment-table.segment-${i}`).style('display', 'none')
        return
    }

    const theta = 360 / a.length
    const offset = theta / 2
    const rotateLeft = i * theta + offset > 180
    let angle = -i * theta - offset
    if (rotateLeft) angle = 360 + angle

    // clicked segment gets rotated, shifted down and scaleed by two
    d3.select(`g.segment.segment-${i}`)
        .style('transform', `scale(2) translateY(25%) rotate(${angle}deg)`)
        .classed('zoomed', true)
    // rotate the blip text by inverse angle
    d3.selectAll(`g.segment.segment-${i} .blip text`).style('transform', `rotate(${-angle}deg)`)
    // hide the other segments
    d3.selectAll(`.segment:not(.segment-${i})`).style('transform', 'scale(0)')

    // select the corresponding table
    d3.selectAll(`.segment-table.segment-${i}`).style('display', 'block')
    // hide the other tables
    d3.selectAll(`.segment-table:not(.segment-${i})`).style('display', 'none')
}

/*************
 *           *
 *   BLIPS   *
 *           *
 *************/
const interactiveBlips = () => {
    document.querySelectorAll('.blip').forEach((b) => {
        b.addEventListener('mouseenter', mouseOverBlip())
        b.addEventListener('mouseout', mouseOutBlip())
        b.addEventListener('click', clickBlip())
    })
}

const mouseOverBlip = () => {
    return (e) => {
        // get the tooltip, set text, and display.
        const tt = document.getElementById('tooltip')
        tt.innerHTML = e.target.getAttribute('label')
        tt.style.display = 'block'
        //get blip and tooltip position and dimensions
        const blipBox = e.target.getBoundingClientRect()
        const ttBox = tt.getBoundingClientRect()
        // move tooltip top of blip, horizontally centered
        tt.style.left = (window.scrollX+blipBox.left)+blipBox.width/2-ttBox.width/2+'px'
        tt.style.top = (window.scrollY+blipBox.top-ttBox.height-5)+'px'
    }
}

const mouseOutBlip = () => {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        document.getElementById('tooltip').style.display = 'none'
    }
}

const clickBlip = () => {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        showProjectData(JSON.parse(e.target.parentNode.getAttribute('data')))
    }
}
