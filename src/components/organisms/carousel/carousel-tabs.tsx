import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { PiArrowFatLineRightDuotone, PiArrowFatLineLeftDuotone } from 'react-icons/pi';

export const CarouselTab = ({ children }: { children: React.ReactNode }) => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [beforeSlide, setBeforeSlide] = useState({ current: 0, next: 0 });
  const onNext = () => {
    slider?.slickGoTo(beforeSlide.next + 1);
  };
  const settings = {
    infinite: false,
    variableWidth: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
      <React.Fragment>
        <div className="absolute -right-10 inset-y-0 flex items-center">
          <button
            onClick={onNext}
            className="w-8 h-8 flex justify-center items-center rounded-full shadow-md text-primary"
          >
            <PiArrowFatLineRightDuotone />
          </button>
        </div>
      </React.Fragment>
    ),
    // prevArrow: (
    //   <React.Fragment>
    //     <div className="absolute -left-10 inset-y-0 flex items-center">
    //       <button className="w-8 h-8 flex justify-center items-center rounded-full shadow-md text-primary">
    //         <PiArrowFatLineLeftDuotone />
    //       </button>
    //     </div>
    //   </React.Fragment>
    // ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider
      ref={(e) => setSlider(e)}
      beforeChange={(current, next) => {
        setBeforeSlide({ current, next });
      }}
      {...settings}
    >
      {children}
    </Slider>
  );
};
