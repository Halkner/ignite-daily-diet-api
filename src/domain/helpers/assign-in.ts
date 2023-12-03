export function assignIn<T extends Record<string, any>>(
  target: T,
  input: Record<string, any>,
) {
  Object.assign(target, ...Object.entries(input)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => ({ [key]: value }))
  );
}
