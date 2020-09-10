import {animate, state, style, transition, trigger} from '@angular/animations';

export const cartDetailsLeft = trigger('cartDetailsLeft', [
  state('shown', style({
    opacity: 0.5
  })),
  state('hidden', style({
    opacity: 0
  })),
  transition('shown => hidden', animate(300)),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('300ms 300ms', style({
      opacity: 0.5
    }))
  ])
]);
export const cartDetailsRight = trigger('cartDetailsRight', [
  state('shown', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('hidden', style({
    opacity: 0,
    transform: 'translateX(100%)'
  })),
  transition('shown => hidden', animate('300ms 300ms')),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)'
    }),
    animate(300, style({
      opacity: 1,
      transform: 'translateX(0)'
    }))
  ])
]);

