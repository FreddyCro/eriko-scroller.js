/**
 * The scroll event to handle that triggering if the target element is obseravle.
 * @method observableEvent
 * @param {String} target - the id of target element
 * 
 * @param {Object} option - option
 * @property {type} string: default: w (p / w)
 * @property {top} number: default: 0
 * @property {bottom} number: default: 0
 * @property {enterEvent} method: default: null
 * @property {leaveEvent} method: default: null
 * @property {aboveEvent} method: default: null
 * @property {underEvent} method: default: null
 */


const typePixel = 'p';
const typeWindowHeight = 'w';
const targetStyle = {
  outline: 'pink solid 1px',
}
const indicatorStyle = {
  position: 'absolute',
  zIndex: 9999,
  color: '#ffffff',
  padding: '3px'
}

const indicatorStartBgColor = 'lightblue';
const indicatorEndBgColor = 'lightgreen';

class OberservableElement {
  constructor(config) {
    this.target = config.target;
    this.top = config.top;
    this.bottom = config.bottom;
  }

  get targetElement() {
    return document.querySelector(this.target);
  }

  addElementStyle(style) {
    Object.keys(style).forEach(e => {
      this.targetElement.style[e] = style[e];
    })
  }
}

class TriggerIndicator extends OberservableElement {
  constructor(config, pos) {
    super(config);
    this.pos = pos;
  }

  get indicatorId() {
    return `${this.target.split('#')[1]}-trigger-indicator-${this.pos}`;
  }

  get isExist() {
    return document.querySelector(`#${this.indicatorId}`) !== null;
  }

  get indicatorElement() {
    return document.querySelector(`#${this.indicatorId}`);
  }

  appendIndicator() {
    const indicator = document.createElement('div');
    indicator.id = this.indicatorId;
    indicator.innerText = `${this.target}-trigger-${this.pos}`;
    document.getElementsByTagName('body')[0].appendChild(indicator);

    this.setIndicatorPos();
    this.addElementStyle(indicatorStyle);
  }

  setIndicatorPos() {
    if (this.pos === 'start') {
      const loc = this.targetElement.getBoundingClientRect().top + window.scrollY - this.top;
      this.indicatorElement.style.top = `${loc}px`;
      this.indicatorElement.style.right = 0;
      this.indicatorElement.style.backgroundColor = indicatorStartBgColor;
    }
    if (this.pos === 'end') {
      const loc = this.targetElement.getBoundingClientRect().top + window.scrollY + this.targetElement.offsetHeight - this.bottom;
      this.indicatorElement.style.top = `${loc}px`;
      this.indicatorElement.style.left = 0;
      this.indicatorElement.style.backgroundColor = indicatorEndBgColor;
    }
  }

  addElementStyle(style) {
    Object.keys(style).forEach(e => {
      this.indicatorElement.style[e] = style[e];
    })
  }
}

function observableEventDebugger(config) {
  const e = new OberservableElement(config);
  e.addElementStyle(targetStyle);

  const indicatorStart = new TriggerIndicator(config, 'start');
  const indicatorEnd = new TriggerIndicator(config, 'end');
  if (!indicatorStart.isExist && !indicatorEnd.isExist) {
    indicatorStart.appendIndicator();
    indicatorEnd.appendIndicator();
  }

  return ;
}

export default function(target, option, debugMode) {
  if (target.split('#').langth <= 1) console.error('OberservableEvent: wrong target format!')

  const slide = document.querySelector(target);
  if (!slide) return;

  const pos = slide.getBoundingClientRect();
  
  let finalTop = 0;
  let finalBottom = 0;
  switch (option.type) {
    case typePixel:
      finalTop = option.top;
      finalBottom = option.bottom;
      break;
    case typeWindowHeight:
      finalTop = window.innerHeight * option.top;
      finalBottom = window.innerHeight * option.bottom;
      break;
    default:
      console.error('OberservableEvent: lack of type parameter!');
      break;
  }

  /*
    | above / leave position
    |———————————————————————
    | enter position
    |———————————————————————
    | under / leave position
  */

  // enter
  if (pos.top < finalTop && pos.bottom > finalBottom) {
    if (option.enterEvent) option.enterEvent();
    else console.error('OberservableEvent: lack of enterEvent parameter!');
  }
  // leave
  else if (option.leaveEvent) {
    option.leaveEvent();
    // above
    if (option.aboveEvent && pos.top >= finalTop) option.aboveEvent();
    // under
    if (option.underEvent && pos.bottom < finalBottom) option.underEvent();
  }

  const debuggerConfig = {target, top: finalTop, bottom: finalBottom};
  if (debugMode) observableEventDebugger(debuggerConfig);
}