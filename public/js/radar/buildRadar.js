//
// IMPORTS
//
// libraries
// app modules
import showAlert from '../util/alert'

//
// EXPORTS
//
export { buildRadar as default }

const buildRadar = async (radarDiv, radarData) => {
    // 1) Add a section with the radar's title and summary
    const overviewSection = radarDiv.append('section').attr('id', 'overview')
    overviewSection.append('h1').html(radarData.name)
    overviewSection.append('div').html(radarData.summary)

    // 2) add a radar graph section, and start adding the SVG
    const size = 2000
    const radarGraphSection = radarDiv.append('section').attr('id', 'graph')
    const svg = radarGraphSection.append('svg').attr('viewport', `0 0 ${size} ${size}`)

    // 3) TEST add a circle with full width to it
    svg.html('<circle cx="1000" cy="100" r="1000" stroke="black" stroke-width="2" fill="red" />')

    // await new Promise(r => setTimeout(r, 1000))
    // return svg
    // const SEGMENT_NAMES = [
    //     'Secure Systems',
    //     'Verification & Assurance',
    //     'Operational Risk',
    //     'Identity & Privacy',
    //     'Cybersecurity Governance',
    //     'Human Aspects'
    // ]
    // const numSegments = SEGMENT_NAMES.length
    // // the more segments, the smaller the segment's angular "opening"
    // const arcAngle = 360 / numSegments
    // // draw the segments
    // for (i = 0; i < numSegments; i++) {
    //     plotSegment(radarSVG, i, archAngle)
    // }
}

// plot an individual radar segment
const plotSegment = (parent, index, degrees) => {
    // var quadrantGroup = svg
    //     .append('g')
    //     .attr('class', 'quadrant-group quadrant-group-' + quadrant.order)
    // exports.showRadar = catchAsync(async (req, res, next) => {
    //     // 1) Get the radar by its slug
    //     const radar = await Radar.findOne({ slug: req.params.slug })
    //     if (!radar) {
    //         return next(new AppError(`Radar with the slug ${req.params.slug} not found`), 404)
    //     }
    //     const graph = buildRadarGraph(radar)
    //     res.status(200).render('radar', {
    //         title: 'Cyberwatching Project Radar',
    //         radar: radar
    //     })
    // })
    // const buildRadarGraph = radarData => {}
}
