export function randomHash(hashLength) {
  const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const hash = [];
  for (let i = 0; i < hashLength; i++) {
    let position = Math.floor(Math.random() * CHARSET.length);
    hash.push(CHARSET[position]);
  }

  return hash.join('');
}