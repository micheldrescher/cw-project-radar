/* eslint-disable node/no-unpublished-import */
//
// IMPORTS
//
// libraries
// modules
// app modules
import { jrcTaxonomy, getName } from '../../../common/datamodel/jrc-taxonomy'
import { getTags, updateTags } from '../util/localStore'
import { any, all, partition } from '../util/nodeFilter'
import jrctaxonomyfiltermodalTemplate from '../../views/jrcTaxonomyFilterModal'

//
// EXPORTS
//
export { filterBlips, showFilterTagForm, updateFilterList }

/*****************
 *               *
 *   FUNCTIONS   *
 *               *
 *****************/

//
// based on the tags in the filter show or hide blips
//
const filterBlips = async (userFilter, forced = false) => {
    // 1) If no filter sent, get from localStore
    if (!userFilter) userFilter = getTags()

    // 2) if the filter's tag list is empty, don't filter at all, unless it's forced!
    if (!userFilter.tags || (userFilter.tags.length === 0 && !forced)) {
        return
    }

    // 3) Figure out which nodes to show and which ones to hide
    // 3.1) If this is forced and tags are empty, simply show all blips again
    if (!userFilter.tags || userFilter.tags.length === 0) {
        document.querySelectorAll('g.blip').forEach((b) => (b.style.display = 'inherit'))
        return
    }
    // 3.2) Otherwise apply the filter
    const withoutJRCTags = document.querySelectorAll("g.blip[data-jrc-tags='']")
    const withJRCTags = document.querySelectorAll("g.blip[data-jrc-tags]:not([data-jrc-tags=''])")
    const filterFunc = userFilter.union === 'any' ? any : all
    const [matching, notMatching] = partition(withJRCTags, userFilter.tags, filterFunc)

    // 4) now hide all except those in 'matching'
    matching.forEach((n) => (n.style.display = 'unset'))
    notMatching.forEach((n) => (n.style.display = 'none'))
    withoutJRCTags.forEach((n) => (n.style.display = 'none'))
}

//
// UPDATE FILTER UI
//
// Given the list of tags, update the filter UI with the actual term names
const updateFilterList = (filter, getNameFunc) => {
    const filterNode = document.getElementById('jrctagsfilter')
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
        // create the tag DIV
        const tagNode = document.createElement('div')
        tags.appendChild(tagNode)
        tagNode.setAttribute('class', 'tag')
        // set tag data
        tagNode.dataset.tag = tag
        // set classes and content
        const nameNode = document.createElement('div')
        nameNode.innerHTML = getNameFunc(tag)
        tagNode.append(nameNode)
        // set little cross for deleting
        const deleteNode = document.createElement('div')
        deleteNode.innerHTML = '×'
        tagNode.append(deleteNode)
        // listen for clicks on the little cross
        deleteNode.addEventListener('click', (e) => removeFilterTag(e))
    })
}

//
// JRC FILTER TAGS FORM
//
// Show the filter tags form using client-side PUG
const showFilterTagForm = () => {
    // get filter tags
    const filter = getTags()
    // compile HTML from the template
    const modalString = jrctaxonomyfiltermodalTemplate({
        modalID: 'filterTags',
        header: 'Filter by JRC Cybersecurity taxonomy terms',
        jrcTaxonomy,
        filterTags: filter,
        okButtonLabel: 'Apply',
        cancelButtonLabel: 'Cancel',
        clearButtonLabel: 'Clear all',
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

        // store tags in local storage
        await updateTags(filter)

        // update the UI & filter projects
        // TODO how can I make this generic the JRC is currently hardcoded!
        updateFilterList(filter, getName)
        filterBlips(filter, true) // force an update (for empty filter lists)

        // close modal
        document.getElementById('filterTags').remove()
    }
    // Clear all button
    document.getElementById('modalClearAll').onclick = async () => {
        document
            .querySelectorAll(
                'input.term[type=checkbox]:checked,input.dimension-header[type=checkbox]:checked'
            )
            .forEach((i) => {
                i.checked = false
            })
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
// PRIVATE FUNCTIONS
//
const removeFilterTag = (e) => {
    const { tag } = e.target.parentNode.dataset
    // get the filter tags
    const filterTags = getTags()
    filterTags.tags.splice(filterTags.tags.indexOf(tag), 1)
    updateTags(filterTags)
    updateFilterList(filterTags, getName)
    filterBlips(filterTags, true) // force an update (for empty filter lists)
}
