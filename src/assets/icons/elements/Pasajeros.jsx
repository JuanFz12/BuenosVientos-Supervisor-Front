export function Pasajeros ({ color = '#4C64A6', size = 16, className, ...props }) {
  return (
    <svg {...props} className={className} width={size} height={size} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_8744_3074)'>
        <path fillRule='evenodd' clipRule='evenodd' d='M7.03495 7.25929C7.33629 7.38651 7.65984 7.45279 7.98693 7.45431V7.45271C8.31233 7.45443 8.63487 7.39204 8.93615 7.2691C9.23743 7.14617 9.51155 6.9651 9.74285 6.73623C9.97415 6.50735 10.1581 6.23516 10.2842 5.9352C10.4103 5.63523 10.4761 5.31336 10.4778 4.98797C10.4796 4.66258 10.4172 4.34004 10.2942 4.03876C10.1713 3.73747 9.99022 3.46336 9.76135 3.23206C9.53248 3.00075 9.26029 2.8168 8.96033 2.69069C8.66036 2.56458 8.33849 2.49879 8.0131 2.49707C6.66632 2.48372 5.53207 3.59713 5.52139 4.94445C5.51709 5.27152 5.5776 5.5962 5.69943 5.89976C5.82126 6.20332 6.002 6.47974 6.23122 6.71309C6.46045 6.94643 6.73361 7.13207 7.03495 7.25929ZM3.44888 12.7234C4.9138 13.2395 6.45568 13.5031 8.00882 13.5031C9.54451 13.502 11.0691 13.2431 12.5191 12.7373C12.9271 12.5953 13.0531 12.4174 13.0531 11.9785C13.0531 11.8372 13.0519 11.6955 13.0506 11.5537C13.0481 11.2695 13.0456 10.9845 13.0531 10.6995C13.0761 9.84563 12.7172 9.18185 12.0572 8.66706C11.3768 8.13678 10.5844 7.85162 9.75825 7.64709C9.681 7.63754 9.60274 7.65368 9.53557 7.69302C8.5092 8.23291 7.48603 8.23558 6.46125 7.68875C6.39339 7.6509 6.31483 7.6368 6.23804 7.6487C5.48294 7.83186 4.75882 8.09193 4.11587 8.53836C3.34902 9.07131 2.90953 9.77781 2.94638 10.7433C2.95654 11.0122 2.95403 11.2824 2.95151 11.5531L2.95151 11.5531C2.95006 11.7092 2.94861 11.8655 2.94958 12.0217C2.95225 12.4084 3.08896 12.5963 3.44888 12.7234ZM3.45316 4.67691C3.6683 4.67712 3.88128 4.71987 4.07983 4.80272C4.27838 4.88557 4.45858 5.00687 4.61006 5.15964C4.76155 5.31241 4.88131 5.49364 4.96248 5.69289C5.04364 5.89213 5.08458 6.10547 5.08296 6.3206C5.08014 6.75502 4.90563 7.17069 4.5975 7.47692C4.28937 7.78315 3.87263 7.95509 3.4382 7.95522C3.00381 7.9503 2.58886 7.77439 2.28328 7.46561C1.9777 7.15684 1.80612 6.74007 1.80572 6.30565C1.80827 5.87122 1.98325 5.45559 2.29219 5.15016C2.60113 4.84472 3.01873 4.6745 3.45316 4.67691ZM13.4674 4.95149C13.1973 4.77173 12.8799 4.67617 12.5554 4.67691C12.1214 4.67748 11.7054 4.85028 11.3987 5.15737C11.092 5.46446 10.9197 5.88072 10.9197 6.31473C10.9194 6.6392 11.0154 6.95647 11.1955 7.22637C11.3756 7.49626 11.6318 7.70663 11.9315 7.83085C12.2313 7.95507 12.5612 7.98755 12.8794 7.92417C13.1976 7.86079 13.4899 7.7044 13.7192 7.47481C13.9484 7.24523 14.1044 6.95276 14.1674 6.63446C14.2304 6.31615 14.1975 5.98632 14.0729 5.68673C13.9483 5.38713 13.7375 5.13126 13.4674 4.95149ZM2.30823 12.1173C2.18674 12.0935 2.06807 12.0713 1.95148 12.0495L1.95144 12.0495C1.68883 12.0004 1.43679 11.9533 1.1868 11.8941C0.919554 11.8307 0.657495 11.7469 0.395176 11.663L0.395168 11.663L0.307818 11.6351C0.0605697 11.5566 0.00289608 11.4701 0.00182805 11.2132C0.00182805 11.1178 0.00295542 11.0224 0.00408278 10.9269C0.0063375 10.7359 0.00859222 10.545 0.00182805 10.3545C-0.0259406 9.70731 0.264029 9.23311 0.777749 8.87052C1.19214 8.58001 1.65887 8.4086 2.14429 8.2831C2.20123 8.26931 2.26095 8.27228 2.31624 8.29165C2.50351 8.36447 2.68851 8.44216 2.87907 8.52219L2.87911 8.52221L3.0425 8.59069C3.02796 8.61653 3.01191 8.64149 2.99444 8.66545C2.55082 9.19727 2.3083 9.86812 2.3093 10.5607V11.8583L2.30823 12.1173ZM13.6918 11.578V12.0693C13.7183 12.0775 13.7458 12.0827 13.7735 12.0847C14.4676 12.0052 15.1492 11.8402 15.8028 11.5935C15.9501 11.5384 15.9993 11.4087 15.9993 11.2544C15.999 11.2313 15.9987 11.2083 15.9984 11.1852C15.9949 10.8958 15.9914 10.606 15.9993 10.3166C16.0148 9.75377 15.783 9.31268 15.352 8.96771C14.9077 8.61099 14.3855 8.41714 13.8397 8.28043C13.7955 8.26845 13.7488 8.26938 13.7051 8.2831C13.5387 8.3496 13.3735 8.41917 13.2058 8.48977C13.1217 8.52519 13.0369 8.56088 12.9511 8.59657C13.3463 9.05528 13.6133 9.5909 13.6667 10.2018C13.6959 10.5207 13.6939 10.8424 13.6919 11.1643C13.691 11.3022 13.6902 11.4402 13.6918 11.578Z' fill={color} />
      </g>
      <defs>
        <clipPath id='clip0_8744_3074'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}