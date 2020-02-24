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
    console.log(radarRootDOM)

    // 1) Mouse over quadrants hghlight
    highlightQuadrants()
}

const highlightQuadrants = () => {
    d3.selectAll('.segment')
        .on('mouseover', mouseOverQuadrant)
        .on('mouseout', mouseOutQuadrant)
    // .on('click', selectQuadrant.bind({}, quadrant.order, quadrant.startAngle))
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

function mouseoverQuadrant(order) {
    d3.select('.quadrant-group-' + order).style('opacity', 1)
    d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 0.3)
}

function mouseoverQuadrant(order) {
    // highlight the selected segment
    d3.select('.quadrant-group-' + order).style('opacity', 1)
    // dim the non-selected segments
    d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 0.3)
    // highlight the segment's button
    // d3.select('.button.' + order + '.full-view').style('opacity', 1)
    // dim all other buttons
    // d3.selectAll('.button.full-view:not(.' + order+')').style('opacity', 0.3)
}

function mouseoutQuadrant(order) {
    d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 1)
}
// function mouseoutQuadrant(order) {
//     // reset all dimming/highlighting on the segment
//     d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 1)
//     // reset all dimming for the buttons
//     // d3.selectAll('.button.full-view').style('opacity', 1)
// }
