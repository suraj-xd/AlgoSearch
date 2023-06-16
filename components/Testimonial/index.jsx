import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import Card from "./card";
import classNames from "classnames";
import { testimonials } from "@/config/Testimonials.mjs";

export default function Testimonial() {
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  const [current, setCurrent] = React.useState(!isMobileDevice ? 0 : 2);
  const [client, setClient] = React.useState({
    name: testimonials[current].name,
    img: testimonials[current].img,
    details: testimonials[current].details,
    description: testimonials[current].description,
  })

  const conditionalRenderingOnWindowResize= () => {
      let mql = window.matchMedia("(max-width: 500px)");
      setIsMobileDevice(mql.matches);
      setCurrent(mql.matches ? 0 : 2);
  }

  React.useEffect(() => {
      conditionalRenderingOnWindowResize();
  }, [])

  React.useEffect(() => {
      window.addEventListener('resize', conditionalRenderingOnWindowResize)
  })

  return (
    <div className="pt-20 w-screen h-fit flex flex-col gap-4 items-center justify-center">
      {/* Title ... */}
      <div className={classNames({
        "relative w-fit h-fit": true,
        "flex flex-col justify-center items-center gap-2": true,
      })}>
        {/* Text ... */}
        <div className={classNames({
          "relative w-fit h-fit": true,
          "monu text-xl lg:text-3xl md:text-2xl": true,
          "flex justify-center items-center gap-4": true,
        })}>
          <span>Out Testimonials</span>
          <img
            src={"/testimony.png"}
            alt={"testimony"}
            className="w-10 md:w-4 lg:w-16"
          />
        </div>
        {/* Underline ... */}
        <img
          src={"/underline.png"}
          alt={"underline"}
          className="w-[60%] lg:w-full"
        />
      </div>

      <Card
        name={client.name}
        img={client.img}
        details={client.details}
        description={client.description}
      />

      <img src={'/currvyup.png'} className={"dark:invert"} />

      <Swiper
        slidesPerView={"auto"}
        navigation={false}
        centeredSlides={isMobileDevice}
        spaceBetween={52.75}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        loop={false}
        modules={[Pagination, Navigation]}
        className="w-[80vw] mobile:h-[40vh] h-[35vh]"
      >
        {testimonials.map((el, i) => {
          return (
            <SwiperSlide className={"mobile:overflow-x-scroll"} key={i}>
              <div 
                className={`flex flex-col gap-4 justify-center items-center transition-all ${current === i ? "opacity-100" : "opacity-50"}`}
                onClick={() => setCurrent(i)}
              >
                <img
                  src={el.img}
                  className="w-20 h-20 rounded-full"
                  onClick={() => setClient(el)}
                />
                <div className="flex flex-col gap-0 justify-center items-center">
                  <span>{el.name}</span>
                  <span className="w-[10rem] text-center">{el.details}</span>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  );
}
