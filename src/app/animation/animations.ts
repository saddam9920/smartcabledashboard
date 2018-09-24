import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('fadeInOut', [
        transition('void => *', [
          style({opacity:0}), //style only for transition transition (after transiton it removes)
          animate(500, style({opacity:1})) // the new state of the transition(after transiton it removes)
        ]),
        transition('* => void', [
          animate(500, style({opacity:0})) // the new state of the transition(after transiton it removes)
        ])
      ])
    ]