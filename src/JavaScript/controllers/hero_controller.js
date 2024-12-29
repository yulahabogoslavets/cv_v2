import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["heading", "subtitle"];

    connect() {
        // Set up Intersection Observer
        const options = {
            root: null,
            threshold: 0.9,
        };

        const observer = new IntersectionObserver(this.handleIntersect.bind(this), options);

        // Observe all targets
        this.headingTargets.forEach(target => observer.observe(target));
        this.subtitleTargets.forEach(target => observer.observe(target));
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;

                // Apply animations to respective targets
                if (this.headingTargets.includes(target)) {
                    target.classList.add("typing-effect");
                }

                if (this.subtitleTargets.includes(target)) {
                    target.classList.add("slide-right");
                }
            } else {
                // Remove animation classes when leaving the viewport
                if (this.headingTargets.includes(entry.target)) {
                    entry.target.classList.remove("typing-effect");
                }

                if (this.subtitleTargets.includes(entry.target)) {
                    entry.target.classList.remove("slide-right");
                }
            }
        });
    }
}