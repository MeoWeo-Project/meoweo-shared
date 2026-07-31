/** Trigger a browser download of the file at `url`, named `name` + the URL's real extension. */
export function downloadFile(name: string, url: string): void {
  const ext = url.split('?')[0]?.split('.').pop() ?? '';
  const a = document.createElement('a');
  a.href = url;
  a.download = ext ? `${name}.${ext}` : name;
  a.click();
}

/** Download in-memory bytes under `fileName` (extension included – a blob URL carries none). */
export function downloadBlob(fileName: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
