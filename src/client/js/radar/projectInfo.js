//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import { getModel } from '../util/localStore'
import { getName } from './../../../common/datamodel/jrc-taxonomy'
// eslint-disable-next-line node/no-unpublished-import
import projectinfoTemplate from './../../views/projectInfo'
// eslint-disable-next-line node/no-unpublished-import
import scoreGraphTemplate from './../../views/scoreGraph'

const showProjectData = async (cw_id, segment, ring, perf, tags) => {
    // fetch project info
    const response = await (await axios.get(`/api/v1/project/prj_id/${cw_id}?scores=all`)).data
    // TODO add error message to footer in red

    const model = await getModel()
    // compile HTML from the template
    const modalString = projectinfoTemplate({
        modalID: 'projectInfo',
        footer: '',
        project: response.data,
        model,
        segment,
        ring,
        perf,
        tags: tags.length > 0 ? tags.split(' ').map((t) => getName(t)) : undefined,
    })

    // add to DOM and display
    const aDiv = document.createElement('div')
    aDiv.innerHTML = modalString
    document.getElementById('modals').appendChild(aDiv)
    // link up the close button - DELETES the modal! (it is recreated anyway)
    document.querySelector('#projectInfo .closeBtn').addEventListener('click', () => {
        document.querySelector('#projectInfo').parentNode.remove()
    })
    // linkup the scoregraph link
    const graphBtn = document.getElementById('scoregraph')
    if (graphBtn)
        graphBtn.addEventListener('click', () => {
            // reduce the scores to bare minimum for the graph
            const graphScores = []
            response.data.scores.forEach((s) => {
                const { scoringDate, mrl, trl } = s
                graphScores.push({ scoringDate, mrl, trl })
            })
            const graphModalStr = scoreGraphTemplate({
                modalID: 'mtrlScoreGraph',
                acronym: response.data.acronym,
                scores: JSON.stringify(response.data.scores),
                graphScores: JSON.stringify(graphScores),
                footer: '',
            })
            // add to DOM and display
            const scoreGraphDiv = document.createElement('div')
            scoreGraphDiv.innerHTML = graphModalStr
            document.getElementById('modals').appendChild(scoreGraphDiv)
            // link up the close button - DELETES the modal! (it is recreated anyway)
            document.querySelector('#mtrlScoreGraph .closeBtn').addEventListener('click', () => {
                document.querySelector('#mtrlScoreGraph').remove()
            })
        })
}

const setFailureFooter = (cont, res) => {
    cont.append('div').style('color: red;').html('Failed to load project data')
    console.log('FAILED TO LOAD PROJECT DATA!')
    console.log(res)
    console.og('argh')
}

//
// EXPORTS
//
export { showProjectData as default }
