//
// IMPORTS
//
// libraries
// modules
// app modules
import showProjectData from './projectInfo'
import { showBliptip, hideBliptip } from '../util/blipTooltip'

//
// EXPORTS
//
export { searchProjects, clearProjects }

/*****************
 *               *
 *   FUNCTIONS   *
 *               *
 *****************/

//
// JRC FILTER TAGS FORM
//
// Show the filter tags form using client-side PUG
const resultDiv = document.getElementById('search_results')
const searchProjects = (searchStr) => {
    // return fast if no search string
    if (searchStr.length <= 1) {
        resultDiv.innerHTML = ''
        return
    }

    // find blips that:
    // - are in currently displayed segments, AND
    // - are displayed (JRC tax filter applies)
    const blips = document.querySelectorAll(
        `g.segment:not([style*='scale(0)']) g.blip:not([style*='display: none;'])[data-tooltip*=${searchStr} i]`
    )
    //remove all buttons
    resultDiv.innerHTML = ''
    // add buttns
    blips.forEach((blip) => {
        // create a button and add to search result
        const resultBtn = document.createElement('button')
        resultBtn.addEventListener('click', () => {
            // showProjectData()
            // cw_id, segment, ring, perf
        })
        resultBtn.addEventListener('mouseenter', () => {
            showBliptip(document.querySelector(`#${blip.id}`))
        })
        resultBtn.addEventListener('mouseout', () => {
            hideBliptip()
        })

        resultBtn.innerHTML = blip.dataset.tooltip
        resultDiv.appendChild(resultBtn)
    })
}

const clearProjects = () => {
    resultDiv.innerHTML = ''
}
