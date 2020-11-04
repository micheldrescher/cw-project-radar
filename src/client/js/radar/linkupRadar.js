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
import { showBliptip, hideBliptip } from '../util/blipTooltip'

//
// EXPORTS
//
export { linkupRadar as default }

//
// FUNCTIONS
//
const linkupRadar = async () => {
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
        s.addEventListener('mouseover', mouseOverSegment(i))
        s.addEventListener('mouseout', mouseOutSegment(i))
        s.addEventListener('click', clickSegment(i, a.length))
    })
}

// highlight the selected segment,
const mouseOverSegment = (i) => {
    return (e) => {
        // dim all non-selected segments
        document
            .querySelectorAll(`.segment:not(.segment-${i})`)
            .forEach((s) => s.classList.add('dimmed'))
    }
}

// highlight all segments again
const mouseOutSegment = (i) => {
    return (e) => {
        document
            .querySelectorAll(`.segment:not(.segment-${i})`)
            .forEach((s) => s.classList.remove('dimmed'))
    }
}

const clickSegment = (i, l) => {
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
        .forEach((t) => t.classList.add('visible'))
    // hide all other tables
    document
        .querySelectorAll(`.segment-table:not(.segment-${i})`)
        .forEach((t) => t.classList.remove('visible'))
}

const zoomOut = (i) => {
    document.querySelectorAll('.segment').forEach((s) => {
        s.style.transform = '' // remove all transformtion styles from the segments
        s.classList.remove('zoomed') // remove zoomed class
    })
    document.querySelectorAll(`.segment.segment-${i} .blip text`).forEach((t) => {
        t.style.transform = '' // unrotate blips and rings
    })
    // hide the table
    document.querySelectorAll('.segment-table.visible').forEach((t) => {
        t.classList.remove('visible')
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
        showBliptip(e.target)
    }
}

const mouseOutBlip = () => {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        hideBliptip()
    }
}

const clickBlip = () => {
    return (e) => {
        e.preventDefault()
        e.stopPropagation()
        const dataSet = e.target.parentNode.dataset
        showProjectData(
            dataSet.cwId,
            dataSet.segment,
            dataSet.ring,
            JSON.parse(dataSet.performance),
            dataSet.jrcTags
        )
    }
}
