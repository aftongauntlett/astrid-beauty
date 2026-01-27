// Temporary shim for Astro/VS Code diagnostics resolving Node built-ins inside .astro files.
// The project already depends on `@types/node`, but some tooling paths still report
// missing types for these specifiers.

declare module "node:fs" {
  export function existsSync(path: string): boolean;
  export function readdirSync(path: string): string[];
}

declare module "node:path" {
  export function join(...parts: string[]): string;
  export function extname(path: string): string;
}

declare module "node:url" {
  export function fileURLToPath(url: string | URL): string;
}
