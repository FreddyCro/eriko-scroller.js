/**
 * Common scroll event methods.
 */
import observableEvent from '@/utils/observableEvent.js';

class ScrollEvent {
  constructor() {
    this.ticking = false
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

  addScrollEvent(customEvent) {
    document.addEventListener('scroll', () => this.handleScroll(customEvent), true);
  }

  removeScrollEvent(customEvent) {
    document.removeEventListener('scroll', () => this.handleScroll(customEvent), true);
  }

  addObservableScrollEvent(target, option = null, debugMode = false) {
    const customOption = {
      type: option.type || 'w',
      top: option.top || 0,
      bottom: option.bottom || 0,
      enterEvent: option.enterEvent || null,
      leaveEvent: option.leaveEvent || null,
      aboveEvent: option.aboveEvent || null,
      underEvent: option.underEvent || null
    }
    const params = [target, customOption];
    document.addEventListener('scroll', () => this.handleScroll(() => observableEvent(...params, debugMode)), true);
  }

  removeObservableScrollEvent(target, option = null, debugMode = false) {
    const customOption = {
      type: option.type || 'w',
      top: option.top || 0,
      bottom: option.bottom || 0,
      enterEvent: option.enterEvent || null,
      leaveEvent: option.leaveEvent || null,
      aboveEvent: option.aboveEvent || null,
      underEvent: option.underEvent || null
    }
    const params = [target, customOption];
    document.removeEventListener('scroll', () => this.handleScroll(() => observableEvent(...params, debugMode)), true);
  }
}

export default ScrollEvent;