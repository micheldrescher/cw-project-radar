//
// IMPORTS
//
// libraries
import '@babel/polyfill'
import axios from 'axios'
import { combinationsReplacement } from 'simple-statistics'
// app modules

//
// EXPORTS
//
export { showProjectData as default }

const showProjectData = blip => {
    const modal = d3.select('#projectInfo')

    // set the title
    modal.select('header').html(blip.prj_name)

    // add scale of min, max, median and score
    if (blip.score) {
        if (blip.min !== blip.max) addScoreScale(modal.select('#scoreScale'), blip)
    }

    // finally show the modal
    modal.style('display', 'block')
}

const addScoreScale = (cont, blip) => {
    cont.html(undefined) // erase all previous stuff
    // prepare and adjust scale values
    const shift = blip.min < 0 ? Math.abs(blip.min) : 0
    const values = [blip.min + shift, 0 + shift, blip.max + shift]
    const labels = ['min', 'median', 'max']
    // create the scale
    const scale = d3
        .scaleLinear()
        .domain([0, values[2]])
        .range([0, 450])
    // add the label
    cont.append('div').html('Relative performance:')
    // append the SVG
    const svg = cont
        .append('svg')
        .attr('viewBox', '-25 -20 500 50')
        .style('width', '500px')
        .style('height', '50px')
        .append('g')
        .attr('class', 'data')
    // add scale lines
    svg.selectAll('path')
        .data(values)
        .enter()
        .append('path')
        .attr('d', d => {
            return `M${scale(d)},0L${scale(d)},10`
        })
        .attr('stroke-width', 1)
        .attr('stroke', 'black')
    // the scale's base line
    svg.append('path')
        .attr(
            'd',
            d3.line()([
                [0, 0],
                [450, 0]
            ])
        )
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
    // add scale labels
    svg.selectAll('text')
        .data(labels)
        .enter()
        .append('text')
        .attr('x', d => scale(values[labels.indexOf(d)]))
        .attr('y', 25)
        .text(d => d)
    // add the project performance value in red
    svg.append('path')
        .attr('d', d => {
            return `M${scale(blip.performance + shift)},0L${scale(blip.performance + shift)},-15`
        })
        .attr('stroke-width', 3)
        .attr('stroke', 'red')
}
