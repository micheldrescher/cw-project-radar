//
// IMPORTS
//
// libraries
import '@babel/polyfill'
// app modules
import showAlert from '../util/alert'

//
// EXPORTS
//
export { linkupRadar as default }

//
// FUNCTIONS
//
const linkupRadar = async radarRootDOM => {
    // 1) Animate interactive quadrants
    interactiveQuadrants()
    // 2) Popover texts for blips
    interactiveBlips()
}

const interactiveQuadrants = () => {
    d3.selectAll('.segment')
        .on('mouseover', mouseOverQuadrant)
        .on('mouseout', mouseOutQuadrant)
        .on('click', clickQuadrant)
}

const interactiveBlips = () => {
    // 1) Configure the tooltip
    const bliptip = configureBliptip()

    d3.selectAll('.blip')
        .on('mouseover', (d, i, a) => mouseOverBlip(bliptip, i, a))
        .on('mouseout', (d, i, a) => mouseOutBlip(bliptip, i, a))
        .on('click', clickBlip)
}

// highlight the selected quadrant,
// dim the others
const mouseOverQuadrant = (d, i) => {
    d3.select(`.segment-${i}`).style('opacity', 1)
    // dim the non-selected segments
    d3.selectAll(`.segment:not(.segment-${i})`).style('opacity', 0.3)
    // TODO highlight the segment's button
    // d3.select('.button.' + order + '.full-view').style('opacity', 1)
    // dim all other buttons
    // d3.selectAll('.button.full-view:not(.' + order+')').style('opacity', 0.3)
}

// highlight all segments again
const mouseOutQuadrant = (d, i) => {
    d3.selectAll(`.segment:not(.segment-${i})`).style('opacity', 1)
    // TODO reset all dimming for the buttons
    // d3.selectAll('.button.full-view').style('opacity', 1)
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
        d3.select(`g.segment.segment-${i}`)
            .style('transform', undefined)
            .classed('zoomed', false)
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

const configureBliptip = () => {
    const svg = d3.select('#rendering > svg')
    const bliptip = d3
        .tip()
        .attr('id', 'bliptip')
        .offset([-8, 0])
        .html(function(d) {
            return d
        })
    svg.call(bliptip)
    return bliptip
}

const mouseOverBlip = (tip, i, a) => {
    tip.show()
    tip.show(d3.select(`#${a[i].id}`).attr('label'))
}

const mouseOutBlip = (tip, i, a) => {
    tip.hide()
}

const clickBlip = (d, i, a) => {
    d3.event.stopPropagation() // stop the event bubbling up the hierarchy
    console.log('Blip click event handling!')
    // TODO do something useful, i.e. showing the blip's description as a model
}
