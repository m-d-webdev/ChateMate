export const _onClickOutElem = (elem, func) => {
    const clk = e => {
        if (!elem.contains(e.target)) {
            console.log('click Out');
            document.removeEventListener("mousedown", clk)
            func();
        }
    }
    document.addEventListener("mousedown", clk);
}

export const CorrectTime = (t) => {
    const time = new Date(t);
    let deffTime = new Date() - time
    if ((deffTime / (1000 * 60 * 60 * 24)) > 1) {
        return time.toLocaleDateString()
    } else {
        return `${time.getHours()}:${time.getMinutes()}`
    }
}