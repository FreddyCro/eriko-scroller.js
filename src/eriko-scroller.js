/**
 * Common scroll event methods.
 */
import observableEvent from './utils/observableEvent.js';

class ErikoScroller {
  constructor() {
    this.ticking = false;
    this.target = null;
    this.option = null;
    this.debugMode = false;
    this.executeEvent = null;
  }

  handleScroll(customEvent) {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        customEvent();
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  addScrollEvent(customEvent = null) {
    if (!customEvent) {
      console.error('Scroll event cannot be empty.');
      return;
    }

    this.executeEvent = () => this.handleScroll(customEvent);
    document.addEventListener('scroll', this.executeEvent, true);
  }

  removeScrollEvent() {
    if (!this.customEvent) {
      console.error('Scroll event cannot be empty.');
      return;
    }
    
    document.removeEventListener('scroll', this.executeEvent, true);
  }

  addObservableScrollEvent(target, option = null, debugMode = false) {
    if (!target) {
      console.error('Target cannot be empty.');
      return;
    }

    const customOption = {
      type: option.type || 'w',
      top: option.top || 0,
      bottom: option.bottom || 0,
      enterEvent: option.enterEvent || null,
      leaveEvent: option.leaveEvent || null,
      aboveEvent: option.aboveEvent || null,
      underEvent: option.underEvent || null,
    };

    this.target = target;
    this.option = customOption;
    this.debugMode = debugMode;

    this.executeEvent = () => this.handleScroll(() => observableEvent(...params, this.debugMode));

    const params = [this.target, this.option];

    document.addEventListener('scroll', this.executeEvent, true);
  }

  removeObservableScrollEvent() {
    document.removeEventListener('scroll', this.executeEvent, true);
  }
}

export { ErikoScroller };