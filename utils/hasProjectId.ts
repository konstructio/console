export function hasProjectId(arg: unknown): arg is { project_id: string } {
  return (
    !!arg && typeof arg === 'object' && 'project_id' in arg && typeof arg.project_id === 'string'
  );
}
