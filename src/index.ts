import { Observable, range } from 'rxjs';

const numbers = range(0, 10);

numbers.subscribe(x => console.log(x));

console.log("done");