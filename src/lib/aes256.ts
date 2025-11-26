import crypto from 'crypto';
import { unserialize } from 'php-serialize';

function normalizeFIO(fio: string): string {
  return fio
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function normalizeKey(key: string) {
  const buf = Buffer.from(key, 'utf8');
  if (buf.length === 32) return buf;

  const out = Buffer.alloc(32);
  buf.copy(out);
  return out;
}

function normalizeIv(iv: string) {
  const buf = Buffer.from(iv, 'utf8');
  if (buf.length === 16) return buf;

  const out = Buffer.alloc(16);
  buf.copy(out);
  return out;
}

export function decrypt(encryptedBase64: string) {
  const key = normalizeKey(process.env.KEY || '');
  const iv = normalizeIv(process.env.IV || '');

  const encrypted = Buffer.from(encryptedBase64, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  const decryptedString = decrypted.toString('utf8');
  const obj = unserialize(decryptedString);
  const person = {
    fio: normalizeFIO(obj.E_FIO) || '',
    email: obj.E_MAIL || '',
    phone: obj.E_PHONE || '',
    address1: obj.E_ADR || '',
    address2: obj.E_ADR_FACT || obj.E_ADR,
    postal_code1: obj.E_ZIP || '',
    postal_code2: obj.E_ZIP_FACT || obj.E_ZIP,
  };
  return person;
}
