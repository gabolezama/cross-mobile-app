import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function CarMarket(props) {
  return (
    <Svg
      id="_x31_0"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{
        width: 38,
        height: 38
      }}
      xmlSpace="preserve"
      opacity={1}
      {...props}
    >
      <Path
        className="st0"
        d="M191.984 164.645h128.043c7.863 0 13.09-8.164 9.778-15.309l-15.309-33.114c-4.465-9.644-14.222-15.878-24.855-15.878h-67.282c-10.637 0-20.375 6.234-24.84 15.878l-15.324 33.098c-3.317 7.161 1.915 15.325 9.789 15.325zM279.152 226.41h-46.305a1.956 1.956 0 00-1.957 1.961v13.582h50.219v-13.582a1.956 1.956 0 00-1.957-1.961zM209.445 195.094l-25.75-6.008h-8.418a5.825 5.825 0 00-4.082 1.692 5.741 5.741 0 00-1.484 2.566 5.333 5.333 0 00-.203 1.511c0 6.954 4.492 12.898 10.71 15.07 1.645.574 3.398.891 5.23.891h21.73a5.82 5.82 0 004.082-1.688 5.78 5.78 0 001.691-4.086c0-3.746-1.309-7.219-3.492-9.95h-.014zM340.805 190.778a5.771 5.771 0 00-4.082-1.692h-8.418l-25.75 6.008a15.83 15.83 0 00-3.508 9.95c0 1.582.657 3.031 1.692 4.086a5.82 5.82 0 004.082 1.688h21.73c1.832 0 3.586-.317 5.23-.891 6.219-2.172 10.711-8.117 10.711-15.07 0-.523-.062-1.035-.203-1.511a5.778 5.778 0 00-1.484-2.568z"
      />
      <Path
        className="st0"
        d="M256 0C152.043 0 67.461 84.578 67.461 188.539 67.461 352.699 256 512 256 512s188.539-159.301 188.539-323.461C444.539 84.578 359.969 0 256 0zm99.539 152.355h-.176l1.207 2.68 3.015 6.515a23.437 23.437 0 012.168 9.852V268.406c0 4.312-3.531 7.844-7.843 7.844h-14.286c-4.316 0-7.844-3.532-7.844-7.844v-16.961l-.16.042v-.038l-.16.078-.703.176a42.363 42.363 0 01-11.781 1.683H193.023c-3.942 0-7.718-.617-11.344-1.617-.414-.137-.867-.184-1.277-.336v.035c-.051-.016-.11-.019-.16-.035l-.024 3.84v13.133c0 4.312-3.527 7.844-7.843 7.844H158.09c-4.312 0-7.844-3.532-7.844-7.844v-97.003c0-3.402.738-6.766 2.168-9.852l2.965-6.402 1.274-2.598h-.074l.078-.164-2.91-.031h-7.121c-8.914 0-16.183-7.41-15.953-16.374.082-3.024 2.742-5.356 5.77-5.356h21.73c2.758 0 5.359.711 7.629 1.958l.648-1.387 9.356-20.234a51.29 51.29 0 0146.554-29.766h67.278a51.29 51.29 0 0146.558 29.766l9.996 21.622c.051-.028.106-.043.156-.066a15.801 15.801 0 017.485-1.891h21.726c3.027 0 5.691 2.332 5.77 5.356.234 8.965-7.035 16.374-15.95 16.374h-6.996l-2.871-.062.027.059z"
      />
    </Svg>
  )
}

export default CarMarket