import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some(
    (match) => match.handle?.hydrate
  );
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}
