import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars,words" });

    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.1,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -200 }, 0)
      .to(".right-leaf", { y: 200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "bottom 0%" : "bottom 0%";

    const handleVideoLoaded = () => {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: "#hero",
          start: startValue,
          end: endValue,
          scrub: 1,
          onUpdate: (self) => {
            if (videoRef.current && videoRef.current.duration) {
              videoRef.current.currentTime =
                self.progress * videoRef.current.duration;
            }
          },
        },
        scale: 1.1,
        opacity: 0.6,
        duration: 1,
      });
    };

    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        handleVideoLoaded();
      } else {
        videoRef.current.addEventListener("loadedmetadata", handleVideoLoaded);
      }
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener(
          "loadedmetadata",
          handleVideoLoaded,
        );
      }
    };
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body md:mt-60 lg:mt-102">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on the menu is a blend of premium ingredients,
                creative flair and timeless recipes - designed to delight your
                senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video fixed inset-0 w-screen h-screen pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </>
  );
};

export default Hero;
