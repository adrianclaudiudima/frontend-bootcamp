import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const wishlistDetailsLeft = trigger('wishlistDetailsLeft', [
  state(
    'shown',
    style({
      opacity: 0.5,
    })
  ),
  state(
    'hidden',
    style({
      opacity: 0,
    })
  ),
  transition('shown => hidden', animate(300)),
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(
      '300ms 300ms',
      style({
        opacity: 0.5,
      })
    ),
  ]),
]);
export const wishlistDetailsRight = trigger('wishlistDetailsRight', [
  state(
    'shown',
    style({
      opacity: 1,
      transform: 'translateX(0)',
    })
  ),
  state(
    'hidden',
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    })
  ),
  transition('shown => hidden', animate('300ms 300ms')),
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(100%)',
    }),
    animate(
      300,
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
  ]),
]);
