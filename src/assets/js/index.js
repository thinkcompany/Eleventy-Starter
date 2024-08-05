import { executeWhenReady } from "./_utils.js";

const ioHome = () => {
  const container = document.querySelector(".io-hero");
  const outerRing = container.querySelector(".ring-outer");
  const centerIcon = container.querySelector(".center-group");
  const animationClassA = "io-is-animating-a";
  const animationClassB = "io-is-animating-b";
  const ringChangeClass = "io-ring-change";
  let isAnimating = false;
  let animationStep = 0;

  const setCloneAnimation = (animationNameOuter, animationNameMiddle) => {
    const cloneOuter = container.querySelector('.clone-outer');
    const cloneMiddle = container.querySelector('.clone-middle');

    cloneOuter.style.setProperty('--animation-name', animationNameOuter);
    cloneMiddle.style.setProperty('--animation-name', animationNameMiddle);

    if (animationNameOuter === "none" || animationNameMiddle === "none") {
      container.classList.remove(animationClassB);
    } else {
      container.classList.add(animationClassB);
    }
  };

  const handleHeroAnimationClick = () => {
    if (!isAnimating && animationStep === 0) {
      container.classList.add(animationClassA);
      container.classList.remove(animationClassB);
      isAnimating = true;
      animationStep = 1;

    } else if (!isAnimating && animationStep === 1) {
      container.classList.add(animationClassB);
      setCloneAnimation("outerRingReverse", "middleRingReverse");
      isAnimating = true;
      animationStep = 0;
    }
  };

  const handleInitialAnimationEnd = (event) => {
    if (event.animationName === "outerRingUp") {
      container.classList.remove(animationClassA);
      container.classList.add(ringChangeClass);
      setCloneAnimation("none", "none");
      isAnimating = false;
    }
  };

  const handleSecondaryAnimationEnd = (event) => {
    if (event.animationName === "fadeIn") {
      container.classList.remove(animationClassB);
      container.classList.remove(ringChangeClass);
      isAnimating = false;
      animationStep = 0;
    }
  };

  container.addEventListener("click", handleHeroAnimationClick);
  outerRing.addEventListener("animationend", (event) => {
    handleInitialAnimationEnd(event);
  });

  centerIcon.addEventListener("animationend", (event) => {
    handleSecondaryAnimationEnd(event);
  });

};


executeWhenReady(() => {
  ioHome();
});