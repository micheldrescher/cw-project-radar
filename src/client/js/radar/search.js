//
// IMPORTS
//
// libraries
// modules
// app modules
import showProjectData from './projectInfo'

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
    if (searchStr.length > 1) {
        // find blips
        const blips = document.querySelectorAll(
            `g.segment:not([style*='scale(0)']) g.blip[label*=${searchStr} i]`
        )
        //remove all buttons
        resultDiv.innerHTML = ''
        // add buttns
        blips.forEach((blip) => {
            const blipData = JSON.parse(blip.getAttribute('data'))
            // create a button and add to search result
            const resultBtn = document.createElement('button')
            resultBtn.addEventListener('click', (e) => {
                showProjectData(blipData)
            })
            resultBtn.innerHTML = blipData.prj_name
            resultDiv.appendChild(resultBtn)
        })
    }
}

const clearProjects = () => {
    resultDiv.innerHTML = ''
}
