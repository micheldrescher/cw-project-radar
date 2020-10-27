//
// EXPORTS
//
export { showBliptip, hideBliptip }

const showBliptip = (targetNode) => {
    // 1) get the tooltip, set text, and display.
    const tt = document.getElementById('tooltip')
    tt.innerHTML = targetNode.dataset.tooltip
    tt.style.display = 'block'
    // 2) get blip and tooltip position and dimensions
    const blipBox = targetNode.getBoundingClientRect()
    const ttBox = tt.getBoundingClientRect()
    // 3) move tooltip top of blip, horizontally centered
    tt.style.left = window.scrollX + blipBox.left + blipBox.width / 2 - ttBox.width / 2 + 'px'
    tt.style.top = window.scrollY + blipBox.top - ttBox.height - 5 + 'px'
}

const hideBliptip = () => {
    document.getElementById('tooltip').style.display = 'none'
}
