import { MenuBistrokort } from "./MenuBistrokort";

export function MenuPageBody() {
  return (
    <section aria-label="Menukortet" className="on-light relative isolate bg-ivory px-3 py-16 sm:px-5 md:px-10 md:py-24">
      <div className="relative mx-auto max-w-[76rem]">
        <MenuBistrokort />
      </div>
    </section>
  );
}
