// controllers/filter_controller.js
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = ['all', 'js', 'react', 'bootstrap']

    connect() {
        console.log('Filter controller connected')

        // Apply the "All" filter by default
        this.activateDefaultFilter()
    }

    filter(event) {
        const filterType = event.target.dataset.filterTarget
        const items = this.element.querySelectorAll('[data-filter]')
        const filters = this.element.querySelectorAll('[data-filter-target]')

        // Add active class to the chosen filter
        filters.forEach((filter) => filter.classList.remove('font-bold'))
        event.target.classList.add('font-bold')

        // Show/hide items based on the selected filter
        items.forEach((item) => {
            if (filterType === 'all' || item.dataset.filter === filterType) {
                item.classList.remove('hidden')
            } else {
                item.classList.add('hidden')
            }
        })
    }

    activateDefaultFilter() {
        const filters = this.element.querySelectorAll('[data-filter-target]')
        const items = this.element.querySelectorAll('[data-filter]')

        // Set "All" as the default active filter
        filters.forEach((filter) => filter.classList.remove('font-bold'))
        const defaultFilter = this.element.querySelector(
            '[data-filter-target="all"]'
        )
        if (defaultFilter) defaultFilter.classList.add('font-bold')

        // Show all items by default
        items.forEach((item) => {
            item.classList.remove('hidden')
        })
    }
}
