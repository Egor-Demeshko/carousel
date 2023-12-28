import HeroSlider from "/assets/modules/HeroSlider.js";
import AnimatedLinks from "/assets/modules/AnimatedLinks.js";
import createGlide from '/assets/modules/Glide.js';
import {createGalleryController} from "/assets/modules/galleryController.js";
import "/assets/modules/menuButton.js";
import "/assets/modules/goUp.js";
import "/assets/modules/topBar.js";
import "/assets/modules/highContrast.js";
import "/assets/modules/subMenus.js";

export const slider = new HeroSlider();
export const animatedLinks = new AnimatedLinks({elementsClass: ".links"});

createGalleryController(createGlide);