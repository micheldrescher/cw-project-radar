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
    let result = {
        num: 0,
        avg_bud: 0,
        tot_bud: 0,
        avg_dur: 0,
        tot_dur: 0,
    }

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
        result.num = res.count
        result.avg_dur = res.avg_dur
        result.tot_dur = res.tot_dur
        result.avg_bud = res.avg_bud
        result.tot_bud = res.tot_bud
    }
    // now display the result
    document.querySelector('simple-metric[name="num_prj"] > span[slot="value"]').innerHTML =
        result.num
    document.querySelector(
        'simple-metric[name="avg_dur"] > span[slot="value"]'
    ).innerHTML = millify(result.avg_dur, {
        units: ['m'],
        space: true,
    })
    document.querySelector(
        'simple-metric[name="tot_dur"] > span[slot="value"]'
    ).innerHTML = millify(result.tot_dur, {
        units: ['m'],
        space: true,
    })
    document.querySelector(
        'simple-metric[name="avg_bud"] > span[slot="value"]'
    ).innerHTML = millify(result.avg_bud, {
        units: ['€', 'k€', 'M€'],
        space: true,
    })
    document.querySelector(
        'simple-metric[name="tot_bud"] > span[slot="value"]'
    ).innerHTML = millify(result.tot_bud, {
        units: ['€', 'k€', 'M€'],
        space: true,
    })

    // TODO - how to visualise tha there was an error?
}
