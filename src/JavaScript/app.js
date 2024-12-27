import { Application } from "@hotwired/stimulus"

import NavbarController from "./controllers/navbar_controller"

window.Stimulus = Application.start()
Stimulus.register("navbar", NavbarController)