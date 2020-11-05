//
// EXPORTS
//
export { showBliptip, hideBliptip, highlightTableEntry, lowlightTableEntry }

const showBliptip = (blip) => {
    // 1) get the tooltip, set text, and display
    const tt = document.getElementById('tooltip')
    tt.innerHTML = blip.dataset.tooltip
    tt.style.display = 'block'
    // 2) get blip and tooltip position and dimensions
    const blipBox = blip.getBoundingClientRect()
    const ttBox = tt.getBoundingClientRect()
    // 3) move tooltip top of blip, horizontally centered
    tt.style.left = window.scrollX + blipBox.left + blipBox.width / 2 - ttBox.width / 2 + 'px'
    tt.style.top = window.scrollY + blipBox.top - ttBox.height - 5 + 'px'
}

const hideBliptip = () => {
    document.getElementById('tooltip').style.display = 'none'
}

const highlightTableEntry = (tEntry) => {
    tEntry.classList.add('highlight')
}

const lowlightTableEntry = (tEntry) => {
    tEntry.classList.remove('highlight')
}
