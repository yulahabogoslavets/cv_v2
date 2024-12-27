import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["menuItems", "menu", "dropdownMenu", "hamburgerIcon", "closeIcon"];

    connect() {
      this.isMenuVisible = false; // Tracks menu visibility
    }
    
    
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;

    if (this.isMenuVisible) {
      this.dropdownMenuTarget.classList.remove("hidden");
      this.dropdownMenuTarget.classList.add("opacity-0");
      setTimeout(() => {
        this.dropdownMenuTarget.classList.remove("opacity-0");
        this.dropdownMenuTarget.classList.add("opacity-100", "scale-100");
      }, 10);

      this.hamburgerIconTarget.classList.add("hidden");
      this.closeIconTarget.classList.remove("hidden");

    } else {
      this.dropdownMenuTarget.classList.remove("opacity-100", "scale-100");
      this.dropdownMenuTarget.classList.add("opacity-0");
      setTimeout(() => {
        this.dropdownMenuTarget.classList.add("hidden");
      }, 300); // Match the duration of `duration-300`

        // Toggle icons
        this.hamburgerIconTarget.classList.remove("hidden");
        this.closeIconTarget.classList.add("hidden");
    }    
  }
}

