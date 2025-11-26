export async function gos() {
  const response = await fetch(`https://app.kaluga-gov.ru/v2/index.php`, {
    method: 'POST',
    body: JSON.stringify({ name: 'url', value: 'http://192.168.8.12:3001' }),
  });
}
