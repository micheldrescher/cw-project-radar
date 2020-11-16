//
// IMPORTS
//
// libraries
import axios from 'axios'
// modules

//
// EXPORTS
//

export { fetchRendering }

//
// fetch the rendering of an edition, or the live radar
//
const fetchRendering = async (url) => {
    if (url.endsWith('radar') || url.endsWith('radar/')) {
        return await axios.get('/api/v1/radar/graph/')
    } else {
        const slug = url.substring(url.lastIndexOf('/') + 1)
        return await axios.get(`/api/v1/radar/graph/${slug}`)
    }
}
