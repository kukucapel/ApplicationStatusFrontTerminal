import crypto from 'crypto';
import { unserialize } from 'php-serialize';

export function normalizeAddress(raw: string) {
  if (!raw) return '';
  const parts = raw.split(',');

  let final = '';
  let part = parts[0].split(' ');
  final += part[0] + ' ' + part[1] + ', ';

  part = parts[1].split(' ');

  if (part[1] !== '-') {
    final += part[1] + ' ' + part[2] + ', ';
  }
  part = parts[2].split(' ');

  final += part[1] + ' ' + part[2] + ', ';

  part = parts[3].split(' ');

  if (part[1] !== '-') {
    final += part[1] + ' ' + part[2] + ', ';
  }

  part = parts[5].split(' ');

  final += part[1] + ' ' + part[2] + ', ';

  part = parts[7].split(' ');

  final += part[4] + ', ' + part[5];

  return final;
}

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
    address1: normalizeAddress(obj.E_ADR) || '',
    address2: normalizeAddress(obj.E_ADR) || normalizeAddress(obj.E_ADR),
    postal_code1: obj.E_ZIP || '',
    postal_code2: obj.E_ZIP_FACT || obj.E_ZIP,
  };
  return person;
}

export function encryptJson(data: any) {
  const key = normalizeKey(process.env.KEY || '');
  const iv = normalizeIv(process.env.IV || '');

  const json = JSON.stringify(data);

  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(json, 'utf-8'),
    cipher.final(),
  ]);

  return encrypted.toString('base64');
}
