/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Banner = () => {
  const router = useRouter()
  return (
    <div>
      <div className="tw-flex tw-justify-between tw-p-3 tw-w-full tw-h-auto tw-max-w-6xl tw-mx-auto">
        {/* <div className="flex flex-row"> */}
        {/* <div className="basis-1/2">
                        hi
                        <img className="tw-align-middle align-middle tw-object-contain tw-h-[75px] tw-w-auto tw-p-2" src="https://firebasestorage.googleapis.com/v0/b/uvicgdscblog.appspot.com/o/GDSC%20Logo%20chapter%20lockup%20template.png?alt=media&token=a7ca35c4-653c-4709-acb4-aee7710b70ea" width="auto" height="50px"/>
                    </div>
                    <div className="basis-1/2">
                        <Typography>UVic GDSC Blog Post</Typography>
                    </div> */}
        <div className="tw-container tw-max-w-[394px]">
          <Link href="/">
            <img
              className="tw-h-[75px] tw-w-[394px] tw-pt-2"
              src="https://firebasestorage.googleapis.com/v0/b/uvicgdscblog.appspot.com/o/GDSC%20Logo%20chapter%20lockup%20template.png?alt=media&token=a7ca35c4-653c-4709-acb4-aee7710b70ea"
              width="auto"
              height="30px"
              alt="GDSC Logo"
            />
          </Link>
        </div>
        <div className="tw-h-[75px] tw-flex">
          <Link
            className={`${
              router.pathname.includes('/post')
                ? ' tw-border-b-4 tw-border-b-[#4285F4]'
                : ''
            } tw-text-center tw-flex tw-flex-col tw-justify-center tw-h-full`}
            href="/post"
          >
            <h1>Posts</h1>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner
