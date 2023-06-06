<template>
  <div id="autoplay-unlock-overlay" class="flex justify-center">
    <button id="confettiButton" class="button hidden"></button>
  </div>

  <div id="pregame" class="transition-all">
    <img src="../assets/Logo.png" alt="logo" class="w-64 mx-auto drop-shadow-md animate__animated animate__backInDown animate__slow">

    <div  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="mx-auto">
        <div id="qrcode" class="flex items-center justify-center mx-auto"></div>
        <div class="font-sans text-center font-bold mb-12">#{{this.serverid}}</div>
      </div>
      
      <div class="flex items-center justify-center mx-auto px-6 py-4 rounded-xl" style="background-color: rgba(0, 0, 0, 0.15);">
        <div v-for="player in this.players">
          <div id="player1" class="px-3">
            <svg xmlns="http://www.w3.org/2000/svg" v-if="player.admin" class="fill-yellow-700 flex items-center justify-center mx-auto drop-shadow-sm" height="0.75em" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-orange-600 drop-shadow-sm" height="2em" viewBox="0 0 640 512"><path d="M0 369.4v2.8C0 431.7 48.3 480 107.8 480c49.5 0 92.6-33.7 104.6-81.7L216 384H424l3.6 14.3c12 48 55.1 81.7 104.6 81.7C591.7 480 640 431.7 640 372.2v-2.8c0-6.3-.5-12.5-1.6-18.7L605.7 159.8c-8.6-50.2-40.9-93.2-90.3-105.5C469.5 42.9 403.8 32 320 32s-149.5 10.9-195.3 22.3C75.2 66.6 42.9 109.6 34.3 159.8L1.6 350.7C.5 356.9 0 363.1 0 369.4zM432 232a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm24-56a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-240-8v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
            <span class="font-bold flex items-center justify-center">{{player.controllername}}</span>
          </div>
        </div>
<!--         <div id="player2" class="px-3 m-auto">
          
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-emerald-600 drop-shadow-sm" height="2em" viewBox="0 0 640 512"><path d="M0 369.4v2.8C0 431.7 48.3 480 107.8 480c49.5 0 92.6-33.7 104.6-81.7L216 384H424l3.6 14.3c12 48 55.1 81.7 104.6 81.7C591.7 480 640 431.7 640 372.2v-2.8c0-6.3-.5-12.5-1.6-18.7L605.7 159.8c-8.6-50.2-40.9-93.2-90.3-105.5C469.5 42.9 403.8 32 320 32s-149.5 10.9-195.3 22.3C75.2 66.6 42.9 109.6 34.3 159.8L1.6 350.7C.5 356.9 0 363.1 0 369.4zM432 232a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm24-56a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-240-8v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <span class="font-bold">Player2</span>
        </div>
        <div id="player3" class="px-3 m-auto">
          
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-red-600 drop-shadow-sm" height="2em" viewBox="0 0 640 512"><path d="M0 369.4v2.8C0 431.7 48.3 480 107.8 480c49.5 0 92.6-33.7 104.6-81.7L216 384H424l3.6 14.3c12 48 55.1 81.7 104.6 81.7C591.7 480 640 431.7 640 372.2v-2.8c0-6.3-.5-12.5-1.6-18.7L605.7 159.8c-8.6-50.2-40.9-93.2-90.3-105.5C469.5 42.9 403.8 32 320 32s-149.5 10.9-195.3 22.3C75.2 66.6 42.9 109.6 34.3 159.8L1.6 350.7C.5 356.9 0 363.1 0 369.4zM432 232a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm24-56a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-240-8v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <span class="font-bold">Player3</span>
        </div>
        <div id="player4" class="px-3 m-auto">
          
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-indigo-600 drop-shadow-sm" height="2em" viewBox="0 0 640 512"><path d="M0 369.4v2.8C0 431.7 48.3 480 107.8 480c49.5 0 92.6-33.7 104.6-81.7L216 384H424l3.6 14.3c12 48 55.1 81.7 104.6 81.7C591.7 480 640 431.7 640 372.2v-2.8c0-6.3-.5-12.5-1.6-18.7L605.7 159.8c-8.6-50.2-40.9-93.2-90.3-105.5C469.5 42.9 403.8 32 320 32s-149.5 10.9-195.3 22.3C75.2 66.6 42.9 109.6 34.3 159.8L1.6 350.7C.5 356.9 0 363.1 0 369.4zM432 232a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm24-56a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-240-8v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <span class="font-bold">Player4</span>
        </div>
        <div id="player5" class="px-3 m-auto">
          
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-gray-600 drop-shadow-sm" height="2em" viewBox="0 0 640 512"><path d="M0 369.4v2.8C0 431.7 48.3 480 107.8 480c49.5 0 92.6-33.7 104.6-81.7L216 384H424l3.6 14.3c12 48 55.1 81.7 104.6 81.7C591.7 480 640 431.7 640 372.2v-2.8c0-6.3-.5-12.5-1.6-18.7L605.7 159.8c-8.6-50.2-40.9-93.2-90.3-105.5C469.5 42.9 403.8 32 320 32s-149.5 10.9-195.3 22.3C75.2 66.6 42.9 109.6 34.3 159.8L1.6 350.7C.5 356.9 0 363.1 0 369.4zM432 232a40 40 0 1 1 0 80 40 40 0 1 1 0-80zm24-56a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zm-240-8v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V248H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V168c0-13.3 10.7-24 24-24s24 10.7 24 24z"/></svg>
          <span class="font-bold">Player5</span>
        </div> -->
      </div>
      
      <!-- <div class="font-sans text-center font-bold my-6">Esperando al admin 😈🤑</div> -->

    </div>
  </div>

  <div id="game" class="transition-all" hidden="true">
    <div class="flex justify-between py-8 px-4">
      <img src="../assets/Logo.png" alt="logo" class="w-80 drop-shadow-md">
      <!-- <div class="px-2 py-4 mt-4 h-fit w-fit rounded-full" style="background-color: rgba(0, 0, 0, 0.6);">
        <span class="bg-white rounded-full font-bold px-3 py-2 border-black border-4 text-lg">60</span>
      </div> -->
      <div class="flex">
        <div class="px-2 py-2 mt-4 me-4 h-fit w-fit rounded-full" style="background-color: rgba(0, 0, 0, 0.6);">
          <div class="relative">
            <button id="flash" class="rounded-full border-black border-4 p-2 bg-white drop-shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/></svg>
            </button>
            <!-- <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" class="fill-white" height="0.75em" viewBox="0 0 448 512"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>
            </span> -->
          </div>
        </div>
        <div class="flex items-start px-2 py-2 mt-4 me-4 h-fit rounded-full" style="background-color: rgba(0, 0, 0, 0.6);">
          <button class="rounded-full border-black border-4 p-2 me-2 bg-white drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg>
          </button>
          <button class="rounded-full border-black border-4 p-2 mx-2 bg-white drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          </button>
          <button class="rounded-full border-black border-4 p-2 mx-2 bg-white drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/></svg>
          </button>
          <button class="rounded-full border-black border-4 p-2 ms-2 bg-white drop-shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M347.1 24.6c7.7-18.6 28-28.5 47.4-23.2l88 24C499.9 30.2 512 46 512 64c0 247.4-200.6 448-448 448c-18 0-33.8-12.1-38.6-29.5l-24-88c-5.3-19.4 4.6-39.7 23.2-47.4l96-40c16.3-6.8 35.2-2.1 46.3 11.6L207.3 368c70.4-33.3 127.4-90.3 160.7-160.7L318.7 167c-13.7-11.2-18.4-30-11.6-46.3l40-96z"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="this.modal">
      <div class="fixed inset-0 transition-opacity"></div>
      <div class="fixed inset-x-0 z-40 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg outline outline-gray-900/50 outline-offset-2 outline-4 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-100" id="modal-title">Deactivate account</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-300">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button v-on:click="this.modal = !this.modal" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="inline justify-between absolute w-full bottom-0 py-8 px-6">
      <div class="grid absolute bottom-0 left-1/2 transform -translate-x-1/2 grid-cols-2 w-9/12 gap-4 mb-4 p-8 rounded-2xl" style="background-color: rgba(0, 0, 0, 0.6);">
        <!-- STEPS -->
        <div class="flex items-center col-span-2">
          <div class="flex items-center">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-white bg-gray-900 border-gray-600">
              1
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-gray-600"></div>
          <div class="flex items-center text-black relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black bg-yellow-400 border-yellow-600">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 border-x-8 border-x-transparent border-t-[12px] border-t-yellow-600"></div>
              2
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-indigo-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-indigo-500">
              3
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-indigo-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-indigo-500">
              4
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-orange-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-orange-500">
              5
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-orange-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-orange-500">
              6
            </div>
          </div>
          <div class="flex-auto border-t-4 parent transition duration-500 ease-in-out border-orange-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-orange-500">
              7
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-red-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-red-500">
              8
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-red-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-red-500">
              9
            </div>
          </div>
          <div class="flex-auto border-t-4 transition duration-500 ease-in-out border-red-500"></div>
          <div class="flex items-center text-gray-500 relative">
            <div class="text-center align-middle rounded-full transition duration-500 ease-in-out px-4 py-2 border-4 font-black text-black bg-white border-red-500">
              10
            </div>
          </div>
        </div>

        <!-- PREGUNTA -->
        <button class="rounded-full border-black border-4 py-2 px-4 bg-white drop-shadow-md col-span-2 text-2xl antialiased font-bold min-w-[40vw] min-h-[4rem]">
          PREGUNTA
        </button>
        
        <!-- RESPUESTAS -->
        <button id="respuestaA" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md text-xl antialiased font-bold min-h-[2rem]">
          <span id="subrespuestaA" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">A</span>
          RESPUESTA 1
        </button>
        <button id="respuestaB" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md text-xl antialiased font-bold min-h-[2rem]">
          <span id="subrespuestaB" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">B</span>
          RESPUESTA 2
        </button>
        <button id="respuestaC" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md text-xl antialiased font-bold min-h-[2rem]">
          <span id="subrespuestaC" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">C</span>
          RESPUESTA 3
        </button>
        <button id="respuestaD" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md text-xl antialiased font-bold min-h-[2rem]">
          <span id="subrespuestaD" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">D</span>
          RESPUESTA 4
        </button>
      </div>
    </div>
  </div>

  <div id="endgame" hidden="true">
    <img src="../assets/Logo.png" alt="logo" class="w-64 mx-auto drop-shadow-md animate__animated animate__backInDown animate__slow">

    <div  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">     
      <div class="flex px-6 py-4 rounded-xl">
        <div id="puesto3" class="px-3 m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-amber-700 drop-shadow-sm" height="2em" viewBox="0 0 576 512"><path xmlns="http://www.w3.org/2000/svg" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
          <span class="font-bold">Player2</span>
        </div>
        <div id="puesto1" class="px-3 mb-24 m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-yellow-500 drop-shadow-sm" height="2em" viewBox="0 0 576 512"><path xmlns="http://www.w3.org/2000/svg" d="M176 0H400c26.5 0 48.1 21.8 47.1 48.2c-.2 5.3-.4 10.6-.7 15.8H552c13.3 0 24 10.7 24 24c0 92.6-33.5 157-78.5 200.7c-44.3 43.1-98.3 64.8-138.2 75.8c-23.4 6.5-39.4 26-39.4 45.6c0 20.9 17 37.9 37.9 37.9H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32h26.1c20.9 0 37.9-17 37.9-37.9c0-19.6-15.9-39.2-39.4-45.6c-39.9-11-93.9-32.7-138.1-75.8C33.5 245 0 180.6 0 88C0 74.7 10.7 64 24 64H129.6c-.3-5.2-.5-10.4-.7-15.8C127.9 21.8 149.5 0 176 0zM133.2 112H48.9c5.1 66.3 31.1 111.2 63 142.3c22.4 21.8 48.3 37.3 73.2 48.3c-22.7-40.3-42.8-100.5-51.9-190.6zM390.8 302.6c24.9-11 50.8-26.5 73.2-48.3c32-31.1 58-76 63-142.3H442.7c-9.1 90.1-29.2 150.3-51.9 190.6zM295.2 86.5c-2.9-5.9-11.4-5.9-14.3 0l-19.2 38.9c-1.2 2.4-3.4 4-6 4.4L212.7 136c-6.6 1-9.2 9-4.4 13.6l31 30.2c1.9 1.8 2.7 4.5 2.3 7.1l-7.3 42.7c-1.1 6.5 5.7 11.5 11.6 8.4L284.3 218c2.3-1.2 5.1-1.2 7.4 0l38.4 20.2c5.9 3.1 12.7-1.9 11.6-8.4L334.4 187c-.4-2.6 .4-5.2 2.3-7.1l31-30.2c4.7-4.6 2.1-12.7-4.4-13.6l-42.9-6.2c-2.6-.4-4.9-2-6-4.4L295.2 86.5z"/></svg>
          <span class="font-bold">Player3</span>
        </div>
        <div id="puesto2" class="px-3 mb-16 m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto fill-gray-400 drop-shadow-sm" height="2em" viewBox="0 0 576 512"><path xmlns="http://www.w3.org/2000/svg" d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/></svg>
          <span class="font-bold">Player5</span>
        </div>
      </div>
      
      <!-- <div class="font-sans text-center font-bold my-6">Esperando al admin 😈🤑</div> -->

    </div>
  </div>
</template>

<script>
  import 'animate.css';

  function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }
  
  export default {
    data() {
      return {
        "modal": false,
        "comodines": true,
        "game-status": 'ended',
        "admin": null,
        "qr": null,
        "serverid": null,
        "players": []
			}
		},
    mounted() {
      var ctx = this;

      // Confetti Init
      let confetti = new Confetti("confettiButton");
      confetti.setCount(550);
      confetti.setSize(1.75);
      confetti.setPower(35);

      //WebSocket Connection
      let wsSocket = new WebSocket('ws://localhost:9594')
      let lastSelected = null
      let lastsubSelected = null

      setInterval(() => {
        wsSocket.send('ping')
      }, 45000);

      wsSocket.onmessage = (event) => {
        let data = event.data

        if (data == 'A' || data == 'B' || data == 'C' || data == 'D') {
          if (lastSelected != null) {
            lastSelected.classList.remove("border-yellow-600", "bg-yellow-200");
            lastSelected.classList.add("border-black", "bg-white");
          }
          if (lastsubSelected != null) {
            lastsubSelected.classList.remove("border-yellow-600", "bg-yellow-200");
            lastsubSelected.classList.add("border-black", "bg-white");
          }

          let _res = document.getElementById('respuesta'+String(data))
          _res.classList.add("border-yellow-600", "bg-yellow-200");
          _res.classList.remove("border-black", "bg-white");
          
          let _subres = document.getElementById('subrespuesta'+String(data))
          _subres.classList.add("border-yellow-600", "bg-yellow-200");
          _subres.classList.remove("border-black", "bg-white");

          lastSelected = _res
          lastsubSelected = _subres
        } else if (data == 'unselect') {
          if (lastSelected != null) {
            lastSelected.classList.remove("border-yellow-600", "bg-yellow-200");
            lastSelected.classList.add("border-black", "bg-white");
          }
          if (lastsubSelected != null) {
            lastsubSelected.classList.remove("border-yellow-600", "bg-yellow-200");
            lastsubSelected.classList.add("border-black", "bg-white");
          }

          lastSelected = null
          lastsubSelected = null
        } else if (data == 'confetti') {
          ctx.confetti();
        } else if (data == 'start') {
          ctx.startGame();
        } else if (isJson(data)) {
          let dataJson = JSON.parse(data)
          console.log(dataJson)
          if (dataJson.event == 'connectedserver') {
            this.serverid = dataJson.serverid;
            //QR Code Init
            this.qr = new QRCode("qrcode", {
              text: 'http://'+location.hostname+':'+location.port+'/controller?type=admin&id='+String(ctx.serverid),
              width: 128,
              height: 128,
              colorDark : "#000000",
              colorLight : "#ffffff",
              correctLevel : QRCode.CorrectLevel.H
            });
          } else if (dataJson.event == 'connectedcontroller') {
            this.players.push(dataJson);
          }
        }

        
        else if (event.data != 'pong') {
          console.log(event.data);
        }
      };

      wsSocket.onopen = (event) => {
        wsSocket.send(JSON.stringify({
          action: 'connection',
          type: 'master'
        }));
      };
    },
    methods: {
      confetti() {
        document.getElementById('confettiButton').click();
        var audio = new Audio('/correct.mp3');
        audio.play()     
      },
      startGame() {
        //Init Game Steps
        var pregame = document.getElementById("pregame")
        var game = document.getElementById("game")

        pregame.setAttribute("hidden", true); // Hide
        game.removeAttribute("hidden"); // Show
      }
    }

  }
</script>