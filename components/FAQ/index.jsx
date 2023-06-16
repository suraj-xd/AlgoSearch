import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import classNames from "classnames";
import { faqs } from "@/config/FAQs.mjs";

const Icon = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const FAQ = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <div className={classNames({
      "relative w-fit h-fit py-[12.5rem]": true,
      "flex flex-col justify-center items-center gap-6": true,
    })}>
      {/* Title ... */}
      <div className={classNames({
          "relative w-fit h-fit": true,
          "flex flex-col justify-center items-center gap-2": true,
        })}>
        {/* Text ... */}
        <div className={classNames({
          "relative w-fit h-fit": true,
          "monu text-3xl lg:text-5xl md:text-4xl": true,
          "flex justify-center items-center gap-4": true,
        })}>
          <span>FAQs</span>
          <img 
            src={"/question.png"}
            alt={"faqs"}
            className="pb-[0.5rem] w-10 md:w-4 lg:w-16"
          />
        </div>
        {/* Underline ... */}
        <img 
          src={"/underline.png"}
          alt={"underline"}
          className="pb-[0.5rem] w-[60%] lg:w-full"
        />
      </div>

      {/* FAQS Accordion ... */}
      {faqs.map((el, i) => {
        return (
          <Accordion
            key={i}
            open={open === i+1}
            animate={customAnimation}
            icon={<Icon id={i+1} open={open} />}
          >
            <AccordionHeader 
              onClick={() => handleOpen(i+1)} 
              className={"h-[12.5vh] sm:w-[60vw] max-sm:w-[90vw] max-sm:ml-4"}
            >
              <div className={classNames({
                  "relative w-fit h-fit": true,
                  "flex justify-center items-center gap-2": true,
                })}>
                <p className={classNames({
                  "monu anti-mobile:text-xl mobile:text-md transition-all": true,
                  "dark:text-[#fafafa]": open !== i+1 ? true : false,
                  "dark:text-blue-500 hover:!text-blue-700": open === i+1 ? true : false,
                  "text-blue-500 hover:!text-blue-700": open === i+1 ? true : false,
                })}>
                  {el.title}
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody className={"h-fit sm:w-[60vw] max-sm:w-[90vw] max-sm:ml-4"}>
              <p className={"comfort anti-mobile:text-lg mobile:text-md dark:text-[#fafafa]"}>
                {el.description}
              </p>
            </AccordionBody>
          </Accordion>
        )
      })}
    </div>
  );
}

export default FAQ;