import { Application } from '@hotwired/stimulus'

import NavbarController from './controllers/navbar_controller'
import HeroController from './controllers/hero_controller'
import FilterController from './controllers/filter_controller'
import ProgressController from './controllers/progress_controller'
import StageController from './controllers/stage_controller'
import ScrollController from './controllers/scroll_controller'

window.Stimulus = Application.start()
Stimulus.register('navbar', NavbarController)
Stimulus.register('hero', HeroController)
Stimulus.register('filter', FilterController)
Stimulus.register('progress', ProgressController)
Stimulus.register('stage', StageController)
Stimulus.register('scroll', ScrollController)
