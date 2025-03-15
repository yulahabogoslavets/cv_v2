import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['stageButtonScroll']

    scroll(event) {
        event.preventDefault()

        // Get the next section after the current one
        const nextSection = document.querySelector('#portfolio')

        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
}
