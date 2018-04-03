import * as d3 from 'd3';
import scroll_controller from './scroll.js';
import ScrollMagic from 'scrollmagic';
import HistogramGraphic from './histogram.js';

const ndrops = 20;

class HistogramAccordionGraphic extends HistogramGraphic {

  constructor(rootsel, to_drop) {
    super(rootsel, to_drop,
        {hide_title: true, H: 480,
          xmax_ratio: .9,
        }
        );
    this.controller = scroll_controller;
    //this.setScene();
    // Use clicks to trigger (delayed) accordion animation, rather than scroll.
    d3.select(rootsel).on('click', () => {
      let nsecs = 15;
      setTimeout( ()=>(console.log(5)), 10*1000);
      setTimeout( ()=>(console.log(4)), 11*1000);
      setTimeout( ()=>(console.log(3)), 12*1000);
      setTimeout( ()=>(console.log(2)), 13*1000);
      setTimeout( ()=>(console.log(1)), 14*1000);

      setTimeout( () => (this.toggleAccordion()), nsecs * 1000);
    });
  }

  toggleAccordion() {
    let drops = (this.to_drop == ndrops) ? 0 : ndrops;
    this.updateToDrop(drops);
  }

  setScene() {
    let scene = new ScrollMagic.Scene({
        triggerElement: this.rootsel,
        triggerHook: 'onLeave',
        offset: -200,
    })
      .on('enter', () => {
        this.updateToDrop(0);
        //console.log('enter the accordion');
      })
      .on('leave', () => {
        this.updateToDrop(ndrops);
        //console.log('leave the accordion');
      })
      .addTo(this.controller);
  }

  updateToDrop(td) {
    if (td === this.to_drop) {
      return;
    }
    this.to_drop = td;
    this.updateData();
  }

  vlineData() {
    let v = super.vlineData();
    if (true || this.to_drop === 0) {
      v = v.concat([
          {text: 'Most Repetitive Song',
            rscore: 5.419096,
          }]);
    }
    return v;
  }

  static init() {
    let h = new HistogramAccordionGraphic('#histogram-full', ndrops);
    h.updateData();
  }
}

export default HistogramAccordionGraphic;
