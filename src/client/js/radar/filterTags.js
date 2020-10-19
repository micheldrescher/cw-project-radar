//
// IMPORTS
//
// libraries
// modules
// app modules
import { jrcTaxonomy, getName } from '../../../common/datamodel/jrc-taxonomy'
import { getTags, getProjectIDs, updateTags } from '../util/localStore'

//
// EXPORTS
//
export { showFilterTagForm, updateFilterList, filterRadar }

/*****************
 *               *
 *   FUNCTIONS   *
 *               *
 *****************/

//
// JRC FILTER TAGS FORM
//
// Show the filter tags form using client-side PUG
const showFilterTagForm = () => {
    // get filter tags
    const filter = getTags()
    console.log(filter)
    // compile HTML from the template
    const modalString = jrctaxonomyfiltermodalTemplate({
        modalID: 'filterTags',
        header: 'Filter by JRC Cybersecurity taxonomy terms',
        jrcTaxonomy,
        filterTags: filter,
        okButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel',
    })
    // add to DOM and display
    document.getElementById('modals').innerHTML = modalString

    // wire up buttons
    wireupButtons(filter)

    // wireup checkboxes
    wireupCheckboxes()
}

// connect the buttons in the Modal dialogue
const wireupButtons = (filter) => {
    // link up the close button - DELETES the modal! (it is recreated anyway)
    document.querySelector('#filterTags .closeBtn').onclick = () => {
        document.getElementById('filterTags').remove()
    }
    // link up the Cancel button - simply do nothing, just like the modal's cross out "button"
    document.getElementById('modalCancel').onclick = () => {
        document.getElementById('filterTags').remove()
    }
    // link up the Ok button
    document.getElementById('modalOK').onclick = async () => {
        filter.tags = []
        // add the tags
        document.querySelectorAll('.term:checked,.dimension-header:checked').forEach((c) => {
            filter.tags.push(c.value)
        })
        // TODO add the operator

        // store tags in local storage
        await updateTags(filter)

        // update the UI & filter projects
        // TODO how can I make this generic the JRC is currently hardcoded!
        updateFilterList(document.getElementById('jrctagsfilter'), filter, getName)
        filterRadar()

        // close modal
        document.getElementById('filterTags').remove()
    }
}
// interactive checkboxes
const wireupCheckboxes = () => {
    // when selecting a dimension header, unselect al the dimension's terms
    const dimensionHeaders = document.querySelectorAll('.dimension-header')
    dimensionHeaders.forEach((box) => {
        box.addEventListener('click', (event) => {
            const termBoxes = box.parentNode.parentNode.querySelectorAll('.term')
            termBoxes.forEach((tB) => (tB.checked = false))
        })
    })
    // when selecting a dimension's term, unselect the dimension header
    const dimensionTerms = document.querySelectorAll('.term')
    dimensionTerms.forEach((termBox) => {
        termBox.addEventListener('click', (event) => {
            const parentBox = termBox.parentNode.parentNode.parentNode.parentNode.querySelector(
                '.dimension-header'
            )
            parentBox.checked = false
        })
    })
}

//
// UPDATE FILTER UI
//
// Given the list of tags, update the filter UI with the actual term names
const updateFilterList = (filterNode, filter, getNameFunc) => {
    // 1) Update filter operation
    const anyRadio = filterNode.childNodes[1].childNodes[2]
    const allRadio = filterNode.childNodes[1].childNodes[3]
    if (filter.union === 'any') {
        anyRadio.checked = true
        allRadio.checked = false
    } else {
        anyRadio.checked = false
        allRadio.checked = true
    }
    // 2) Update filter tag list
    const tags = filterNode.lastChild
    // remove all tags
    tags.innerHTML = ''
    // now add new list of tags
    filter.tags.forEach((tag) => {
        const tagNode = document.createElement('div')
        tagNode.setAttribute('class', 'tag')
        const tagText = document.createTextNode(getNameFunc(tag))
        tagNode.appendChild(tagText)
        tags.appendChild(tagNode)
    })
}

const filterRadar = async () => {
    // 1) Get the tags as a quick check
    const tags = getTags()
    // 2) Fetch all projects from the server that have the filter tags set
    const matchingProjects = await getProjectIDs()

    // 3) Test all document blips whether they match or not
    const allBlips = document.querySelectorAll('g.blip')
    allBlips.forEach((blip) => {
        // 3.1) get the CW ID from the blip
        const cwID = JSON.parse(blip.getAttribute('data')).cw_id
        // 3.2) check if cwID is in the matching projects array.
        //      If it is, mark as visible. If not, mark it invisible.
        if (matchingProjects.includes(cwID)) {
            blip.setAttribute('display', 'inherit')
        } else {
            blip.setAttribute('display', 'none')
        }
    })
}
