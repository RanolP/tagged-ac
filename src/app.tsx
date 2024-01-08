// @refresh reload
import { createSignal } from "solid-js";
import "./app.css";

export default function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main
      text-center
      p-4
      mx-auto
    >
      <h1
        text="16 [#335d92] uppercase"
        lh="[1.1]"
        font-100
        mx-auto
        my-16
        max-w="[14rem] sm:none"
      >
        Hello world!
      </h1>
      <button
        class="increment"
        px-8 py-4
        text="[#335d92]"
        font="inherit size-inherit tabular-nums"
        bg="[rgba(68, 107, 158, 0.1)] active:[rgba(68, 107, 158, 0.2)]"
        border="2 rounded-8 solid [rgba(68, 107, 158, 0)] focus:[#335d92]"
        outline-none
        w="[200px]"
        onClick={() => setCount(count() + 1)}
      >
        Clicks: {count()}
      </button>
      <p
        mx-auto my-8
        lh="[1.35]"
        max-w="[14rem] sm:[none]"
      >
        Visit{" "}
        <a
          href="https://start.solidjs.com"
          target="_blank"
          mr-4
        >
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
