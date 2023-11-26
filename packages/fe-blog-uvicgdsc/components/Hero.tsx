import React from 'react'
import Button from '@mui/material/Button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div
      className="tw-h-[400px] tw-mx-auto"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),url('/uvic.jpeg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        // dim background image by 70%
      }}
    >
      <div className="tw-w-full tw-h-full tw-text-center tw-max-w-6xl tw-mx-auto tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div className="tw-text-[#fff] tw-text-4xl tw-font-semibold tw-flex tw-items-center tw-justify-center tw-flex-col">
          <div className="tw-m-2 tw-text-5xl">
            <span className=" tw-text-[#4285F4]">G</span>oogle&nbsp;
            <span className=" tw-text-[#DB4437]">D</span>eveloper&nbsp;
            <span className=" tw-text-[#F4B400]">S</span>tudent&nbsp;
            <span className=" tw-text-[#4285F4]">C</span>lub
          </div>
          <div>
            <span className="tw-p-2 hover:tw-underline hover:tw-text-[#005393] hover:tw-bg-white hover:tw-rounded-xl">
              <Link target="_blank" href="https://www.uvic.ca/">
                University of Victoria
              </Link>
            </span>
          </div>
        </div>
        <Button
          style={{ marginTop: '20px', width: '200px' }}
          variant="contained"
          size="large"
          href="https://linktr.ee/uvic.gdsc"
          target="_blank"
        >
          Join Us
        </Button>
      </div>
    </div>
  )
}

export default Hero
