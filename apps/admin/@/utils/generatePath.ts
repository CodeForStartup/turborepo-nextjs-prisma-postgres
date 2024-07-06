// Original source: https://github.com/remix-run/react-router/blob/7a2e9f65a6b1aa62dc1d6568ada046395128b6a9/packages/router/utils.ts
import querystring from "qs"

export function warning(cond: boolean, message: string) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message)

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience, so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message)
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

export interface Path {
  /**
   * A URL pathname, beginning with a /.
   */
  pathname: string

  /**
   * A URL search string, beginning with a ?.
   */
  search: string

  /**
   * A URL fragment identifier, beginning with a #.
   */
  hash: string
}

// Recursive helper for finding path parameters in the absence of wildcards
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : // find params after `:`
      Path extends `:${infer Param}`
      ? Param extends `${infer Optional}?`
        ? Optional
        : Param
      : // otherwise, there aren't any params present
        never

export function invariant(value: boolean, message?: string): asserts value
export function invariant<T>(value: T | null | undefined, message?: string): asserts value is T
export function invariant(value: string | boolean, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message)
  }
}

/**
 * Examples:
 * "/a/b/*" -> "*"
 * ":a" -> "a"
 * "/a/:b" -> "b"
 * "/a/blahblahblah:b" -> "b"
 * "/:a/:b" -> "a" | "b"
 * "/:a/b/:c/*" -> "a" | "c" | "*"
 */
export type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends "*" | "/*"
    ? "*"
    : // look for wildcard at the end of the path
      Path extends `${infer Rest}/*`
      ? "*" | _PathParam<Rest>
      : // look for params in the absence of wildcards
        _PathParam<Path>

export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null
  } = {} as Record<PathParam<Path>, string | null>
): string {
  let path: string = originalPath
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were ` +
        `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
        `always follow a \`/\` in the pattern. To get rid of this warning, ` +
        `please change the route path to "${path.replace(/\*$/, "/*")}".`
    )
    path = path.replace(/\*$/, "/*") as Path
  }

  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : ""

  const stringify = (p: string) => (p == null ? "" : typeof p === "string" ? p : String(p))

  const segments = path
    .split(/\/+/)
    .map((segment, index, array) => {
      const isLastSegment = index === array.length - 1

      // only apply the splat if it's the last segment
      if (isLastSegment && segment === "*") {
        const star = "*" as PathParam<Path>
        // Apply the splat
        return stringify(params[star])
      }

      const keyMatch = segment.match(/^:(\w+)(\??)$/)
      if (keyMatch) {
        const [, key, optional] = keyMatch
        const param = params[key as PathParam<Path>]
        invariant(optional === "?" || param != null, `Missing ":${key}" param`)
        return stringify(param)
      }

      // Remove any optional markers from optional static segments
      return segment.replace(/\?$/g, "")
    })
    // Remove empty segments
    .filter((segment) => !!segment)

  return prefix + segments.join("/")
}

export function generateApi<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string | null
  } = {} as Record<PathParam<Path>, string | null>,
  searchParams: Record<string, string | number | boolean> = {}
): string {
  return `${process.env.NEXT_PUBLIC_FRONTEND_URL}${generatePath<Path>(originalPath, params)}${
    searchParams ? `?${querystring.stringify(searchParams)}` : ""
  }`
}
