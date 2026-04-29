import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { onMount } from 'svelte';

export const totalPoints = writable(0);
export const rebusPoints = writable(0);
export const riddlePoints = writable(0);
export const storyPoints = writable(0);