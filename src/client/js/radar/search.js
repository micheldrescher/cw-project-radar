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
        resultBtn.addEventListener('click', (e) => {
            // get the project's CW id
            const cwid = e.target.innerHTML.substring(0, e.target.innerHTML.indexOf('.'))
            // get the project's blip data
            const data = document.getElementById(`blip-${cwid}`).dataset
            showProjectData(
                cwid,
                data.segment,
                data.ring,
                JSON.parse(data.performance),
                data.jrcTags
            )
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
