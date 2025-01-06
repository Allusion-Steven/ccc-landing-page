import { writable } from 'svelte/store';

export const contactFormStore = writable({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  consent: false
});
