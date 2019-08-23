class LazyLoad {

    constructor(times = 200, nodeList = 'lazy-load', height = 100) {
        this.times = times
        this.nodeList = nodeList
        this.height = height
    }

    showPic(nodeList, height) {
        const picArr = document.querySelectorAll('.' + nodeList)
        const body = document.documentElement || document.body
        const bodyH = body.scrollTop + body.clientHeight
        picArr.forEach(item => {
            if ((bodyH - item.offsetTop) > -height && !item.getAttribute('data-lazy-show')) {
                let src = item.getAttribute('data-src')
                item.setAttribute('src', src)
                item.setAttribute('data-lazy-show', true)
                item.removeAttribute('data-src')
            }
        })
    }

    throttle(callback, times, nodeList, height) {
        let timer = null
        return () => {
            if (timer) {
                return
            }
            timer = setTimeout(() => {
                callback(nodeList, height)
                timer = null
            }, times)
        }
    }

    run() {
        this.showPic(this.nodeList, 0)
        window.addEventListener('scroll', this.throttle(this.showPic, this.times, this.nodeList, this.height))
    }
}