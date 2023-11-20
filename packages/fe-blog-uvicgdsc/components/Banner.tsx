import React, { useEffect, useRef, useState } from 'react'
import styles from './Banner.module.css'
import { Typography } from '@mui/material'
const Banner = () => {
  return (
    <div>
      <div className={styles.bannerPage}>
        <div className={styles.logo}>
          <img
            className="tw-align-middle align-middle tw-object-contain tw-h-[75px] tw-w-auto tw-p-2"
            src="https://firebasestorage.googleapis.com/v0/b/uvicgdscblog.appspot.com/o/GDSC%20Logo%20chapter%20lockup%20template.png?alt=media&token=a7ca35c4-653c-4709-acb4-aee7710b70ea"
            width="auto"
            height="50px"
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
