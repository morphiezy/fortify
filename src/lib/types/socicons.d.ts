declare module "socicons" {
  interface SociconsProps {
    icon: string;
    size?: number;
    color?: string;
  }

  export function Socicons(props: SociconsProps): JSX.Element;
}
