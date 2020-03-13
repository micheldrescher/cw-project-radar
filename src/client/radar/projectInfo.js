//
// IMPORTS
//
// libraries
import '@babel/polyfill'
import axios from 'axios'
import { SVG } from '@svgdotjs/svg.js'
// app modules

//
// EXPORTS
//
export { showProjectData as default }

const showProjectData = async blip => {
    // fetch project info
    const response = await (await axios.get('/api/v1/project/' + blip.project)).data
    // TODO add error message to footer in red

    // compile HTML from the template
    const modalString = projectinfoTemplate({
        modalID: 'projectInfo',
        header: blip.prj_name,
        footer: '',
        project: response.data.data,
        blip,
        scale: createScoreScale(blip)
    })
    // add to DOM and display
    d3.select('#modals').html(modalString)
    // link up the close button - DELETES the modal! (it is recreated anyway)
    d3.select('#projectInfo .closeBtn').on('click', () => {
        d3.select('#projectInfo').remove()
    })
}

const setFailureFooter = (cont, res) => {
    cont.append('div')
        .style('color: red;')
        .html('Failed to load project data')
    console.log('FAILED TO LOAD PROJECT DATA!')
    console.log(res)
}

const createScoreScale = blip => {
    // no score scale if no score in project
    if (!blip.score) return undefined

    // prepare and adjust scale values
    const shift = blip.min < 0 ? Math.abs(blip.min) : 0
    const values = [blip.min + shift, 0 + shift, blip.max + shift]
    const labels = ['min', 'median', 'max']
    // create the scale
    const scale = d3
        .scaleLinear()
        .domain([0, values[2]])
        .range([0, 450])

    // create the SVG
    const svg = SVG().attr({
        viewBox: '-25 -20 500 50'
    })
    const g = svg.group().addClass('data')
    // add the base line
    g.line(0, 0, 450, 0)
    // append the vertical scale lines
    values.forEach(v => {
        g.line(scale(v), 0, scale(v), 10)
    })
    // add the project performance line
    const x = scale(blip.performance + shift)
    g.line(x, 0, x, -15).attr('id', 'perf')
    // add the labels
    labels.forEach(l => {
        g.text(l).attr({
            x: scale(values[labels.indexOf(l)]),
            y: 25
        })
    })
    return svg.svg()
    // // add scale labels
    // svg.selectAll('text')
    //     .data(labels)
    //     .enter()
    //     .append('text')
    //     .attr('x', d => scale(values[labels.indexOf(d)]))
    //     .attr('y', 25)
    //     .text(d => d)
    // // add the project performance value in red
    // svg.append('path')
    //     .attr('d', d => {
    //         return `M${scale(blip.performance + shift)},0L${scale(blip.performance + shift)},-15`
    //     })
    //     .attr('stroke-width', 3)
    //     .attr('stroke', 'red')
}
