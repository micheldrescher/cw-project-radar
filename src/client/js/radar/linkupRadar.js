//
// IMPORTS
//
// libraries
// app modules
import showAlert from '../util/alert'
import showProjectData from './projectInfo'
import { RadarCoordinates } from '../../../common/widgets/radar-location/radar-coords'
import { RadarLocation } from '../../../common/widgets/radar-location/radar-location'
import { SimpleMetric } from '../../../common/widgets/simple-metric/simple-metric'
import { SDLCPosition } from '../../../common/widgets/sdlc-position/sdlc-position'
import { MTRLPerformance } from '../../../common/widgets/mtrl-performance/mtrl-performance'

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
    customElements.define('sdlc-position', SDLCPosition)
    customElements.define('radar-coords', RadarCoordinates)
    customElements.define('mtrl-performance', MTRLPerformance)
    customElements.define('radar-location', RadarLocation)

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
    document.querySelectorAll('.segment').forEach((s, i, a) => {
        s.addEventListener('mouseover', mouseOverQuadrant(i))
        s.addEventListener('mouseout', mouseOutQuadrant(i))
        s.addEventListener('click', clickQuadrant(i, a.length))
    })
}

// highlight the selected quadrant,
// dim the others
const mouseOverQuadrant = (i) => {
    return (e) => {
        document.querySelectorAll(`.segment-${i}`).forEach((s) => (s.style.opacity = 1))
        document
            .querySelectorAll(`.segment:not(.segment-${i})`)
            .forEach((s) => (s.style.opacity = 0.3))
    }
}

// highlight all segments again
const mouseOutQuadrant = (i) => {
    return (e) => {
        document
            .querySelectorAll(`.segment:not(.segment-${i})`)
            .forEach((s) => (s.style.opacity = 1))
    }
}

const clickQuadrant = (i, l) => {
    return (e) => {
        const zoomed = document.querySelector(`.segment.segment-${i}.zoomed`)
        if (zoomed) zoomOut(i, l)
        else zoomIn(i, l)
    }
}

const zoomIn = (i, l) => {
    // some calculations
    const theta = 360 / l
    const offset = theta / 2
    const rotateLeft = i * theta + offset > 180
    let angle = -i * theta - offset
    if (rotateLeft) angle = 360 + angle

    // Rotate and transform clicked segment
    const seg = document.querySelector(`.segment.segment-${i}`)
    seg.style.transform = `scale(2) translateY(25%) rotate(${angle}deg)`
    seg.classList.add('zoomed')
    // text in clicked segment rotates at inverse angle (to level them again)
    seg.querySelectorAll('.blip text').forEach((t) => (t.style.transform = `rotate(${-angle}deg)`))

    // hide all other segments
    document
        .querySelectorAll(`.segment:not(.segment-${i})`)
        .forEach((s) => (s.style.transform = 'scale(0)'))

    // show table for clicked segment
    document
        .querySelectorAll(`.segment-table.segment-${i}`)
        .forEach((t) => (t.style.display = 'block'))
    // hide all other tables
    document
        .querySelectorAll(`.segment-table:not(.segment-${i})`)
        .forEach((t) => (t.style.display = 'none'))
}

const zoomOut = (i) => {
    document.querySelectorAll('.segment').forEach((s) => {
        s.style.transform = '' // remove all transformtion styles from the segments
        s.classList.remove('zoomed') // remove zoomed class
    })
    document.querySelectorAll(`.segment.segment-${i} .blip text`).forEach((t) => {
        t.style.transform = '' // unrotate blips and rings
    })
    document.querySelectorAll('.segment-table').forEach((t) => {
        t.style.display = 'none' // hide the segment table
    })
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
        tt.style.left = window.scrollX + blipBox.left + blipBox.width / 2 - ttBox.width / 2 + 'px'
        tt.style.top = window.scrollY + blipBox.top - ttBox.height - 5 + 'px'
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
