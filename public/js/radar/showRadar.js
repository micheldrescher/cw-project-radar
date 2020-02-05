//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'
import buildRadar from './buildRadar'

//
// EXPORTS
//
export { showRadar as default }

const showRadar = async slug => {
    const radarSection = await d3.select('#radar-section')

    // 1) remove old radar
    radarSection.html(null)

    // 2) show waiting text
    const waitingDiv = radarSection.append('div').attr('id', 'waiting')
    const radarDiv = radarSection
        .append('div')
        .attr('id', 'radar')
        .style('display', 'none')
    plotLoading(waitingDiv)

    try {
        // 3) construct radar
        const radarData = await fetchRadar(slug)

        // 4) construct radar
        await buildRadar(radarDiv, radarData)

        // 5) clear loading
        waitingDiv.remove()

        // 6) show radar
        radarDiv.style('display', 'block')
    } catch (err) {
        // 7) Otherwise, show error
        showAlert('error', err.response.data.message)
        radarSection.html(null)
    }
}

const plotLoading = waitingDIV => {
    waitingDIV.append('p').html('Please wait while we are building the radar.')
    waitingDIV.append('img').attr('src', '/img/loading.gif')
}

const fetchRadar = async slug => {
    // 1) fetch the radar using the REST API
    const res = await axios({
        method: 'GET',
        url: `/api/v1/radar/${slug}`
    })

    // 2) return the radar
    if (res.data.status === 'success') {
        return res.data.radar
    }

    // 3) Otherwise throw error
    throw new Error('Error fetching radar: ' + res.message)
}
