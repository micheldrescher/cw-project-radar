//
// IMPORTS
//
// libraries
import axios from 'axios'
import millify from 'millify'
import { count } from '../../../server/models/userModel'
// modules

//
// EXPORTS
//

export { fetchRendering, fetchStats }

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

//
// fetch the statistics for the blips that are visible
//
const fetchStats = async (doFetch = false) => {
    // early return if not to fetch
    if (!doFetch) return

    // prep a result map
    let num = 0,
        types = '',
        avgBud = 0,
        totBud = 0,
        avgDur = 0,
        totDur = 0

    // find the nodes that are still visible
    const nodes = document.querySelectorAll(
        "g.segment:not([style*='scale(0)']) g.blip[style*='unset']"
    )

    // only if nodes are visible fetch the data
    if (nodes && nodes.length > 0) {
        const ids = []
        nodes.forEach((n) => ids.push(n.dataset.cwId))
        // call API
        let res = (
            await axios({
                method: 'GET',
                url: `/api/v1/radar/stats`,
                params: {
                    prjs: ids.join(','),
                },
            })
        ).data.data
        // transfer to result
        num = res.count
        types = res.types.sort().join(', ')
        avgDur = res.avg_dur
        totDur = res.tot_dur
        avgBud = res.avg_bud
        totBud = res.tot_bud
    }
    // now display the result
    document.querySelector('simple-metric[name="num_prj"] > span[slot="value"]').innerHTML = num
    document.querySelector('simple-metric[name="prj_types"] > span[slot="value"]').innerHTML = types
    document.querySelector('simple-metric[name="avg_dur"] > span[slot="value"]').innerHTML =
        Math.round(avgDur) + ' m'
    document.querySelector('simple-metric[name="tot_dur"] > span[slot="value"]').innerHTML =
        totDur < 48 ? totDur + ' m' : Math.round(totDur / 12) + ' y'
    document.querySelector(
        'simple-metric[name="avg_bud"] > span[slot="value"]'
    ).innerHTML = millify(avgBud, {
        units: ['€', 'k€', 'M€'],
        space: true,
    })
    document.querySelector(
        'simple-metric[name="tot_bud"] > span[slot="value"]'
    ).innerHTML = millify(totBud, {
        units: ['€', 'k€', 'M€'],
        space: true,
    })

    // TODO - how to visualise tha there was an error?
}
