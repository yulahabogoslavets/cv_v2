import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['item', 'bar', 'percentage']

    connect() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.75,
            }
        )

        this.barTargets.forEach((bar) => {
            this.observer.observe(bar)
        })
    }

    disconnect() {
        this.observer.disconnect()
    }

    handleIntersection(entries, observer) {
        entries.forEach((entry) => {
            const bar = entry.target

            // Find the corresponding percentage text for the current progress bar
            const percentageText =
                this.percentageTargets[this.barTargets.indexOf(bar)]

            const progressValue = parseInt(bar.dataset.value, 10)

            if (entry.isIntersecting) {
                this.animateProgressBar(bar, progressValue)
                this.animatePercentage(percentageText, progressValue)
            } else {
                this.resetProgressBar(bar, percentageText)
            }
        })
    }

    animateProgressBar(bar, targetValue) {
        let currentWidth = 0
        const interval = setInterval(() => {
            if (currentWidth < targetValue) {
                currentWidth++
                bar.style.width = `${currentWidth}%`
            } else {
                clearInterval(interval) // Stop the animation once the target is reached
            }
        }, 50)
    }

    animatePercentage(percentageText, targetValue) {
        let currentPercentage = 0
        const interval = setInterval(() => {
            if (currentPercentage < targetValue) {
                currentPercentage++
                percentageText.textContent = `${currentPercentage}%`
            } else {
                clearInterval(interval)
            }
        }, 50)
    }

    resetProgressBar(bar, percentageText) {
        bar.style.width = '0%' // Reset the progress bar width
        percentageText.textContent = '0%' // Reset the percentage text
    }
}
