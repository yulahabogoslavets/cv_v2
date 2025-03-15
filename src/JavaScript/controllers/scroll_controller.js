import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['section']

    initialize() {
        this.lastScrollY = window.scrollY
        this.observer = new IntersectionObserver(this.handleScroll.bind(this), {
            threshold: [0, 0.2, 0.5, 0.8, 1],
        })

        this.sectionTargets.forEach((section) => {
            section.classList.add(section.dataset.scrollBg || 'bg-white')
            this.observer.observe(section)
        })
    }

    disconnect() {
        this.sectionTargets.forEach((section) =>
            this.observer.unobserve(section)
        )
    }

    handleScroll(entries) {
        const currentScrollY = window.scrollY
        const scrollingDown = currentScrollY > this.lastScrollY
        this.lastScrollY = currentScrollY

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const section = entry.target
                const rect = section.getBoundingClientRect()
                const middleOfSection = rect.top + rect.height / 2
                const middleOfViewport = window.innerHeight / 2
                const progress = Math.min(
                    1,
                    Math.max(
                        0,
                        1 -
                            Math.abs(middleOfViewport - middleOfSection) /
                                (rect.height / 2)
                    )
                )

                if (scrollingDown) {
                    this.applyTailwindGradient(
                        section,
                        progress,
                        section.dataset.scrollBg,
                        'bg-white'
                    )
                } else {
                    this.applyTailwindGradient(
                        section,
                        progress,
                        'bg-white',
                        section.dataset.scrollBg
                    )
                }
            }
        })
    }

    applyTailwindGradient(element, progress, fromClass, toClass) {
        element.classList.remove(fromClass, toClass)

        if (progress < 0.5) {
            element.classList.add(fromClass)
        } else {
            element.classList.add(toClass)
        }
    }
}
