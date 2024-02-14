import { Storage } from 'aws-amplify';

export async function s3Upload(file: File) {
  const stored = await Storage.vault.put(fileNameStrat(file.name), file, {
    contentType: file.type,
  });
  return stored.key;
}

function fileNameStrat(file: string) {
  return `${Date.now()}-${file}`;
}

export async function s3Delete(fileName: string) {
  return await Storage.vault.remove(fileNameStrat(fileName));
}
