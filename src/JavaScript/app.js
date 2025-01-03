import { Application } from '@hotwired/stimulus'

import NavbarController from './controllers/navbar_controller'
import HeroController from './controllers/hero_controller'
import FilterController from './controllers/filter_controller'

window.Stimulus = Application.start()
Stimulus.register('navbar', NavbarController)
Stimulus.register('hero', HeroController)
Stimulus.register('filter', FilterController)
