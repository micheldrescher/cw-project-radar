//
// IMPORTS
//
// libraries
// modules
// app modules
import { jrcTaxonomy } from './../../../common/datamodel/jrc-taxonomy'
import filterProjects from './filterProjects'

//
// EXPORTS
//
export { showFilterTagForm as default }

//
// GLOBAL VARS
//
const storageID = 'eu.cyberwatching.radar.user.jrcFilter'

//
// FUNCTIONS
//

// Show the filter tags form using client-side PUG
const showFilterTagForm = filterTags => {
    // compile HTML from the template
    const modalString = jrctaxonomyfiltermodalTemplate({
        modalID: 'filterTags',
        header: 'Filter by JRC Cybersecurity taxonomy terms',
        jrcTaxonomy,
        filterTags,
        okButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel'
    })
    // add to DOM and display
    document.getElementById('modals').innerHTML = modalString

    // wire up buttons
    wireupButtons()

    // wireup checkboxes
    wireupCheckboxes()
}

const wireupButtons = () => {
    // link up the close button - DELETES the modal! (it is recreated anyway)
    document.querySelector('#filterTags .closeBtn').onclick = () => {
        document.getElementById('filterTags').remove()
    }
    // link up the Cancel button - simply do nothing, just like the modal's cross out "button"
    document.getElementById('modalCancel').onclick = () => {
        document.getElementById('filterTags').remove()
    }
    // link up the Ok button
    document.getElementById('modalOK').onclick = () => {
        const filterTags = []
        document.querySelectorAll('.term:checked,.dimension-header:checked').forEach(c => {
            filterTags.push(c.value)
        })
        // store tags in local storage
        localStorage.setItem(storageID, JSON.stringify(filterTags))
        // filter
        filterProjects(filterTags)
        // close modal
        document.getElementById('filterTags').remove()
    }
}

const wireupCheckboxes = () => {
    // when selecting a dimension header, unselect al the dimension's terms
    const dimensionHeaders = document.querySelectorAll('.dimension-header')
    dimensionHeaders.forEach(box => {
        box.addEventListener('click', event => {
            const termBoxes = box.parentNode.parentNode.querySelectorAll('.term')
            termBoxes.forEach(tB => (tB.checked = false))
        })
    })
    // when selecting a dimension's term, unselect the dimension header
    const dimensionTerms = document.querySelectorAll('.term')
    dimensionTerms.forEach(termBox => {
        termBox.addEventListener('click', event => {
            const parentBox = termBox.parentNode.parentNode.parentNode.parentNode.querySelector(
                '.dimension-header'
            )
            parentBox.checked = false
        })
    })
}
