import { Token } from './token';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, filter } from 'rxjs/operators';


/**
 * Holds the state of the ongoing refresh operation.
 */
let isRefreshing = false;

/**
 * The underlying gate. It is realised as a Subject to ensure
 * all subsequent observables are basing their login on the
 * same singleton observable.
 */
const gate$ = new BehaviorSubject(true);
/**
 * This observable waits until the underlying gate is open. It
 * emits exactly one event, then completes.
 */
const openGate$ = gate$.pipe(
	filter(x => x === true),
	take(1)
);

/**
 * Simulates the token or token-store.
 */
const token = new Token();

/**
 * Simulates the refresh function.
 */
const refresh$: Observable<Token> = Observable.create(observer => {
	console.log('Refresh: start');
	setTimeout(
		() => {
			token.refresh();
			console.log('Refresh: finish');
			observer.next(token);
		},
		2000
	);

})

/**
 * The observable returns a non-expired token. If the token
 * in the underlying token store is expired, it requests a refresh
 * or waits until an ongoing refresh is completed, before emiting
 * the new token.
 */
const token$: Observable<Token> = Observable.create(observer => {
	if (!token.isExpired()) {
		console.log('Refresh not needed');
		observer.next(token);
	} else {
		console.log('Need to request a refresh');

		if (!isRefreshing) {
			console.log('Starting a refresh and closing the gate');
			isRefreshing = true;
			gate$.next(false);

			refresh$.subscribe(token => {
				console.log('Ending the refresh and opening the gate again');
				isRefreshing = false;
				observer.next(token);
				gate$.next(true);
			});
		} else {
			console.log('Refresh already in progress');
			// Wait here, until the gate opens again.
			openGate$.subscribe(() => {
				console.log('Gate is open');
				observer.next(token);
			});
		}
	}
});

let i = 1;
setInterval(() => {
	let me = 'Requestor ' + i++;
	console.log(me, 'wants to get a token');
	token$.subscribe((token: Token) => console.log(me, 'got token: ', token.getkey()));
}, 1000);
