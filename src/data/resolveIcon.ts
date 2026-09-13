export function resolveIcon<T>(registry: Record<string, T>, name: string, jsonFile: string, tsFile: string): T {
  const icon = registry[name];
  if (!icon) {
    throw new Error(`Unknown icon "${name}" in ${jsonFile} — add it to ${tsFile}`);
  }
  return icon;
}
