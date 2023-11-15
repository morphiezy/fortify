import { useScramble } from "use-scramble";

export function Loading(): JSX.Element {
  const { ref } = useScramble({
    text: "Loading",
    speed: 0.5,
  });

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] bg-onyx grid place-items-center z-40">
      <div className="absolute inset-0 bg-transparent w-screen h-[100dvh] z-50"></div>
      <h1
        ref={ref}
        className="text-base lg:text-xl xl:text-3xl font-bold text-white font-fira-code animate-bounce"
      ></h1>
      <div className="w-full space-y-1 absolute bottom-0 left-1/2 -translate-x-1/2 py-5 font-inter font-medium text-xs text-slate-100/20 text-center">
        <p>© 2023 Fortify - Generate & Manage Credential</p>
        <p>
          <a href="https://github.com/morphiezy" target="_blank">
            Develop By @yardan
          </a>
        </p>
      </div>
    </div>
  );
}
