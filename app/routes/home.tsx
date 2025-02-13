import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Container } from "~/components/Marketing/Container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  

  return <Container className="mt-24 sm:mt-32 md:mt-56">
          <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-7xl">
            Award-winning development studio based in Denmark.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            We are a development studio working at the intersection of design
            and technology. It’s a really busy intersection though — a lot of
            our staff have been involved in hit and runs.
          </p>
      </Container>
}
