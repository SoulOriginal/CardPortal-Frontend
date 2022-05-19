<template>
  <div>
    <div class="password-field">
      <input type="password" placeholder="Password" />
      <input class="clear" type="text" placeholder="Password" />
      <button>
        <svg viewBox="0 0 21 21">
          <circle class="eye" cx="10.5" cy="10.5" r="2.25" />
          <path
            class="top"
            d="M2 10.5C2 10.5 6.43686 5.5 10.5 5.5C14.5631 5.5 19 10.5 19 10.5"
          />
          <path
            class="bottom"
            d="M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5"
          />
          <g class="lashes">
            <path d="M10.5 15.5V18" />
            <path d="M14.5 14.5L15.25 17" />
            <path d="M6.5 14.5L5.75 17" />
            <path d="M3.5 12.5L2 15" />
            <path d="M17.5 12.5L19 15" />
          </g>
        </svg>
      </button>
    </div>

    <a class="dribbble" href="https://dribbble.com/ai" target="_blank"
      ><img
        src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
        alt=""
    /></a>
    <a class="twitter" target="_top" href="https://twitter.com/aaroniker_me"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        viewBox="0 0 72 72"
      >
        <path
          d="M67.812 16.141a26.246 26.246 0 0 1-7.519 2.06 13.134 13.134 0 0 0 5.756-7.244 26.127 26.127 0 0 1-8.313 3.176A13.075 13.075 0 0 0 48.182 10c-7.229 0-13.092 5.861-13.092 13.093 0 1.026.118 2.021.338 2.981-10.885-.548-20.528-5.757-26.987-13.679a13.048 13.048 0 0 0-1.771 6.581c0 4.542 2.312 8.551 5.824 10.898a13.048 13.048 0 0 1-5.93-1.638c-.002.055-.002.11-.002.162 0 6.345 4.513 11.638 10.504 12.84a13.177 13.177 0 0 1-3.449.457c-.846 0-1.667-.078-2.465-.231 1.667 5.2 6.499 8.986 12.23 9.09a26.276 26.276 0 0 1-16.26 5.606A26.21 26.21 0 0 1 4 55.976a37.036 37.036 0 0 0 20.067 5.882c24.083 0 37.251-19.949 37.251-37.249 0-.566-.014-1.134-.039-1.694a26.597 26.597 0 0 0 6.533-6.774z"
        ></path></svg
    ></a>
  </div>
</template>

<script>
export default {
  mounted() {
    const { to, set, timeline, registerPlugin } = this.gsap;

    registerPlugin(MorphSVGPlugin);

    document.querySelectorAll(".password-field").forEach((field) => {
      let input = field.querySelectorAll("input"),
        button = field.querySelector("button"),
        time = timeline({
          paused: true,
        })
          .to(field.querySelector("svg .top"), {
            morphSVG:
              "M2 10.5C2 10.5 6.43686 15.5 10.5 15.5C14.5631 15.5 19 10.5 19 10.5",
            duration: 0.2,
          })
          .to(
            field,
            {
              keyframes: [
                {
                  "--eye-s": 0,
                  "--eye-background": 1,
                  duration: 0.2,
                },
                {
                  "--eye-offset": "0px",
                  duration: 0.15,
                },
              ],
            },
            0
          );
      button.addEventListener("click", (e) => {
        if (field.classList.contains("show")) {
          field.classList.remove("show");
          time.reverse(0);
          return;
        }
        field.classList.add("show");
        time.play(0);
      });
      field.addEventListener("pointermove", (e) => {
        const rect = button.getBoundingClientRect();
        const fullWidth = rect.width;
        const halfWidth = fullWidth / 2;
        const fullHeight = rect.height;
        const halfHeight = fullHeight / 2;
        let x = e.clientX - rect.left - halfWidth,
          y = e.clientY - rect.top - halfHeight;

        field.style.setProperty(
          "--eye-x",
          (x < -halfWidth ? -halfWidth : x > fullWidth ? fullWidth : x) / 15 +
            "px"
        );
        field.style.setProperty(
          "--eye-y",
          (y < -halfHeight ? -halfHeight : y > fullHeight ? fullHeight : y) /
            25 +
            "px"
        );
      });
      field.addEventListener("pointerleave", (e) => {
        field.style.setProperty("--eye-x", "0px");
        field.style.setProperty("--eye-y", "0px");
      });
      input.forEach((single) =>
        single.addEventListener("input", (e) =>
          input.forEach((i) => (i.value = e.target.value))
        )
      );
    });
  },
};
</script>

<style lang="scss" scoped>
.password-field {
  --c-text: #5a5a64;
  --c-text-light: #a1a1b6;
  --c-text-selection: #09abc3;
  --c-background: #fff;
  --c-background-selection: rgba(9, 171, 195, 0.15);
  --c-border: #e2e2ed;
  --c-border-hover: #d0d0db;
  --c-border-active: #09abc3;
  --c-shadow: rgba(41, 41, 86, 0.06);
  --c-shadow-active: rgba(9, 171, 195, 0.25);
  --eye-background: 0;
  --eye-offset: 3px;
  --eye-wrapper-y: 0;
  --eye-y: 0;
  --eye-x: 0;
  --eye-s: 1;
  width: 220px;
  position: relative;
  border-radius: 7px;
  background: var(--c-background);
  box-shadow: inset 0 0 0 1px var(--border, var(--c-border)),
    0px 1px 3px var(--shadow, var(--c-shadow));
  transition: box-shadow 0.25s;
  &:hover {
    --border: var(--c-border-hover);
    --eye-duration: 0.05s;
  }
  &:focus-within {
    --border: var(--c-border-active);
    --shadow: var(--c-shadow-active);
  }
  input,
  button {
    -webkit-appearance: none;
    outline: none;
    background: none;
    border: none;
    margin: 0;
  }
  input {
    display: block;
    font-family: inherit;
    font-size: 16px;
    line-height: 21px;
    height: 45px;
    color: var(--c-text);
    padding: 12px 41px 12px 16px;
    transform: translateY(var(--y, var(--default-y, 0))) translateZ(0);
    opacity: var(--o, var(--default-o, 1));
    pointer-events: var(--pe, var(--default-pe, auto));
    transition: filter 0.35s, transform 0.4s, opacity 0.25s;
    &::placeholder {
      color: var(--c-text-light);
      transition: color 0.25s;
    }
    &::selection {
      color: var(--c-text-selection);
      background: var(--c-background-selection);
    }
    &:focus,
    &:hover {
      &::placeholder {
        color: var(--c-text);
      }
    }
    &:not(.clear) {
      width: 100%;
    }
    &.clear {
      --y: var(--clear-y, 12px);
      --o: var(--clear-o, 0);
      --pe: var(--clear-pe, none);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
    }
  }
  button {
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    padding: 11px;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    transform: scale(var(--s, 1));
    color: var(--c-text-light);
    transition: color 0.25s, transform 0.15s;
    &:hover {
      color: var(--c-text);
    }
    &:active {
      --s: 0.95;
    }
    svg {
      display: block;
      width: 23px;
      height: 23px;
      pointer-events: none;
      .top,
      .bottom,
      .lashes {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5px;
        stroke-linecap: round;
      }
      .lashes {
        stroke-dasharray: 3px;
        stroke-dashoffset: var(--eye-offset);
      }
      .top {
        fill: var(--c-background);
        fill-opacity: var(--eye-background);
      }
      .eye {
        fill: currentColor;
        transform-origin: 10.5px 13.5px;
        transform: translate(var(--eye-x), var(--eye-y)) scale(var(--eye-s))
          translateZ(0);
        transition: transform var(--eye-duration, 0.3s);
      }
    }
  }
  &.show {
    --default-y: -12px;
    --default-o: 0;
    --default-pe: none;
    --clear-y: 0;
    --clear-o: 1;
    --clear-pe: auto;
  }
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
  &:before,
  &:after {
    box-sizing: inherit;
  }
}

// Center & dribbble
body {
  font-family: "Poppins", Arial;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbfbfd;
  .dribbble {
    position: fixed;
    display: block;
    right: 20px;
    bottom: 20px;
    img {
      display: block;
      height: 28px;
    }
  }
  .twitter {
    position: fixed;
    display: block;
    right: 64px;
    bottom: 14px;
    svg {
      width: 32px;
      height: 32px;
      fill: #1da1f2;
    }
  }
}
</style>
