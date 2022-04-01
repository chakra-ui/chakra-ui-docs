import { chakra } from '@chakra-ui/react'

export const RangeSliderIllustration = () => {
  return (
    <chakra.svg
      width='400'
      height='300'
      viewBox='0 0 400 300'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='400' height='300' fill='#EDF2F7' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M53 150C53 147.791 54.7909 146 57 146H343C345.209 146 347 147.791 347 150C347 152.209 345.209 154 343 154H57C54.7909 154 53 152.209 53 150Z'
        fill='#CBD5E0'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M123 150C123 147.791 124.791 146 127 146L273 146C275.209 146 277 147.791 277 150C277 152.209 275.209 154 273 154L127 154C124.791 154 123 152.209 123 150Z'
        fill='#38B2AC'
      />
      <g filter='url(#filter0_d_38_560)'>
        <path
          d='M135 150C135 156.627 129.627 162 123 162C116.373 162 111 156.627 111 150C111 143.373 116.373 138 123 138C129.627 138 135 143.373 135 150Z'
          fill='white'
        />
      </g>
      <g filter='url(#filter1_d_38_560)'>
        <path
          d='M289 150C289 156.627 283.627 162 277 162C270.373 162 265 156.627 265 150C265 143.373 270.373 138 277 138C283.627 138 289 143.373 289 150Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_38_560'
          x='107'
          y='138'
          width='32'
          height='32'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_38_560'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_38_560'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_d_38_560'
          x='261'
          y='138'
          width='32'
          height='32'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_38_560'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_38_560'
            result='shape'
          />
        </filter>
      </defs>
    </chakra.svg>
  )
}
