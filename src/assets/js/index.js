import { executeWhenReady } from './_utils';
import { coolFunction } from './_somejs';

const root = document.querySelector(".site-main");

executeWhenReady( () => {
  root ? coolFunction() : null;
});
