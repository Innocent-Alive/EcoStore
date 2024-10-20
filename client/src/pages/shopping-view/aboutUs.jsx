import { Upload, Lock, Database } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlogSection from "@/components/ui/blogPosts";

function AboutUs() {
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const imgRef = useRef(null);
  const impactRef = useRef(null);
  const listItemsRef = useRef([]);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(subTitleRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.from(imgRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.from(impactRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: 0.6,
      ease: "power2.out",
    });

    gsap.from(listItemsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="about-us relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute about-us-content inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-secondary[mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-background">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p
                ref={titleRef}
                className="text-base font-semibold leading-7 text-secondary"
              >
                Eco-Friendly Commitment
              </p>
              <h1
                ref={subTitleRef}
                className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
              >
                Sustainability at EcoStore
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                At EcoStore, we believe in a sustainable future. Our products
                are carefully sourced to ensure they are natural and
                biodegradable. We are not just an e-commerce platform but a
                movement towards a greener planet.
              </p>
            </div>
          </div>
        </div>
        <div
          ref={imgRef}
          className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden"
        >
          <img
            alt="EcoStore Products"
            src="https://www.thehorizonfoundation.org/wp-content/uploads/2018/08/iStock-697438336.jpg"
            className="w-[48rem] max-w-none rounded-xl bg-primary shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] object-cover object-center"
          />
        </div>
        <div
          ref={impactRef}
          className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        >
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
                Our Impact
              </h2>
              <p className="mt-6">
                Beyond selling eco-friendly products, we actively participate in
                environmental initiatives. Join us in our camps and missions
                aimed at protecting our planet.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li
                  ref={(el) => (listItemsRef.current[0] = el)}
                  className="flex gap-x-3 hover:bg-background  p-2 rounded-md transition duration-200"
                >
                  <Upload className="mt-1 h-5 w-5 flex-none text-primary" />
                  <span>
                    <strong className="font-semibold text-secondary">
                      Push for Sustainability.
                    </strong>{" "}
                    Every purchase contributes to eco-friendly projects.
                  </span>
                </li>
                <li
                  ref={(el) => (listItemsRef.current[1] = el)}
                  className="flex gap-x-3 hover:bg-background p-2 rounded-md transition duration-200"
                >
                  <Lock className="mt-1 h-5 w-5 flex-none text-primary" />
                  <span>
                    <strong className="font-semibold text-secondary">
                      Secure Transactions.
                    </strong>{" "}
                    Your information is safe with us.
                  </span>
                </li>
                <li
                  ref={(el) => (listItemsRef.current[2] = el)}
                  className="flex gap-x-3 hover:bg-background  p-2 rounded-md transition duration-200"
                >
                  <Database className="mt-1 h-5 w-5 flex-none text-primary" />
                  <span>
                    <strong className="font-semibold text-secondary">
                      Transparent Practices.
                    </strong>{" "}
                    We believe in honesty and openness.
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
                Join Our Initiatives
              </h2>
              <p className="mt-6">
                We organize various camps and missions throughout the year.
                <br />
                Check out our blog to learn more about our latest events:
                <a
                  href="https://ecostore.com/blog"
                  className="text-primary hover:underline"
                >
                  EcoStore Blog
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <BlogSection />
    </div>
  );
}

export default AboutUs;
