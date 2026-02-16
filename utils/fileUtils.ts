import fs from 'fs';

export function getTestUser() {

  return JSON.parse(
    fs.readFileSync('utils/test-user.json', 'utf-8')
  );

}
