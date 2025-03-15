import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static targets = [
        'menuItems',
        'menu',
        'dropdownMenu',
        'hamburgerIcon',
        'closeIcon',
    ]

    connect() {
        this.isMenuVisible = false // Tracks menu visibility

        // Select all sections and menu items
        this.sections = document.querySelectorAll('section')
        this.menuItems = Array.from(this.menuItemsTarget.querySelectorAll('a'))

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                root: null,
                threshold: 0.3,
                rootMargin: '0px 0px -50% 0px',
            }
        )

        this.sections.forEach((section) => {
            this.observer.observe(section)
        })
    }

    toggleMenu() {
        this.isMenuVisible = !this.isMenuVisible

        if (this.isMenuVisible) {
            this.dropdownMenuTarget.classList.remove('hidden')
            this.dropdownMenuTarget.classList.add('opacity-0')
            setTimeout(() => {
                this.dropdownMenuTarget.classList.remove('opacity-0')
                this.dropdownMenuTarget.classList.add(
                    'opacity-100',
                    'scale-100'
                )
            }, 10)

            this.hamburgerIconTarget.classList.add('hidden')
            this.closeIconTarget.classList.remove('hidden')
        } else {
            this.dropdownMenuTarget.classList.remove('opacity-100', 'scale-100')
            this.dropdownMenuTarget.classList.add('opacity-0')
            setTimeout(() => {
                this.dropdownMenuTarget.classList.add('hidden')
            }, 300) // Match the duration of `duration-300`

            // Toggle icons
            this.hamburgerIconTarget.classList.remove('hidden')
            this.closeIconTarget.classList.add('hidden')
        }
    }

    handleIntersection(entries, observer) {
        let activeLink = null

        entries.forEach((entry) => {
            const sectionId = entry.target.id
            const correspondingLink = this.menuItems.find(
                (item) => item.getAttribute('href').substring(1) === sectionId
            )

            if (entry.isIntersecting) {
                // If the section is intersecting, mark it as active
                activeLink = correspondingLink // Set the active link to the current intersecting section
            }
        })

        // Remove the active class from all links
        this.menuItems.forEach((item) => {
            item.classList.remove('text-white', 'after:scale-x-100') // Remove active styles and underline animation
        })

        // Add the active class to the currently active link
        if (activeLink) {
            activeLink.classList.add('text-white', 'after:scale-x-100') // Add active color and underline animation
        }
    }

    disconnect() {
        this.observer.disconnect()
    }
}
