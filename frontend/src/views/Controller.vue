<template>
  <div class="lg:w-1/3 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
    <div class="flex animate__animated animate__backInDown animate__slow">
      <img src="../assets/Logo.png" alt="logo" class="w-60 mx-auto drop-shadow-md">
    </div>
    
    <div class="absolute top-0 right-0 mr-8 mt-8 lg:mr-20 animate__animated animate__fadeIn animate__slow animate__delay-2s">
      <span v-if="this.online" class="inline-flex justify-center items-center rounded-full h-2 w-2 mx-auto bg-green-600">
        <span class="animate-ping h-2 w-2 p-2 rounded-full bg-green-400 opacity-75 duration-2s"></span>
      </span>
      <span v-else class="inline-flex justify-center items-center rounded-full h-2 w-2 mx-auto bg-red-600">
        <span class="animate-ping duration-100 h-2 w-2 p-2 rounded-full bg-red-400 opacity-75 duration-2s"></span>
      </span>
    </div>

    <div class="absolute top-0 left-0 ml-4 mt-5 lg:ml-20 animate__animated animate__fadeIn animate__slow animate__delay-2s">
      <button v-if="!this.online" v-on:click="this.reconnectWs()" class="flex justify-center items-center rounded-lg border-black bg-white border-4 p-2 drop-shadow-md antialiased font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" id="reconnectSvg" class="" height="1em" viewBox="0 0 512 512"><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
      </button>
    </div>

    <!-- MODAL -->
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-show="this.confirmAnswerModal">
      <div class="fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity"></div>
      <div class="absolute top-50 transform -translate-x-0 z-40 ">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg outline outline-gray-900/50 outline-offset-2 outline-4 bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <!-- <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div> -->
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-100" id="modal-title">Confirmar Respuesta</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-300">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button v-on:click="this.confirmAnswerModal = !this.confirmAnswerModal" type="button" class="mt-3 sm:ml-3 inline-flex w-full justify-center rounded-md bg-green-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-green-600 hover:bg-green-50 sm:mt-0 sm:w-auto">Confirmar</button>
              <button v-on:click="this.confirmAnswerModal = !this.confirmAnswerModal" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-red-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-2 ring-inset ring-red-600 hover:bg-red-50 sm:mt-0 sm:w-auto">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full animate__animated animate__fadeIn animate__slow animate__delay-2s">
      <div class="row">
        <div class="grid relative left-1/2 transform -translate-x-1/2 grid-cols-2 gap-4 mb-4 p-4 rounded-2xl w-11/12" style="background-color: rgba(0, 0, 0, 0.25);">
          <!-- PREGUNTA -->
          <div class="flex justify-center items-center select-none rounded-full border-black border-4 bg-white drop-shadow-md col-span-2 text-xl antialiased font-bold min-h-[3rem]">
            PREGUNTA
          </div>
          
          <!-- RESPUESTAS -->
          <button id="respuestaA" v-on:click="this.selectAnswer('A')" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[3rem]">
            <span id="subrespuestaA" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">A</span>
            RESPUESTA 1
          </button>
          <button id="respuestaB" v-on:click="this.selectAnswer('B')" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[3rem]">
            <span id="subrespuestaB" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">B</span>
            RESPUESTA 2
          </button>
          <button id="respuestaC" v-on:click="this.selectAnswer('C')" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[3rem]">
            <span id="subrespuestaC" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">C</span>
            RESPUESTA 3
          </button>
          <button id="respuestaD" v-on:click="this.selectAnswer('D')" class="rounded-tl-full rounded-bl-full rounded-br-full border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[3rem]">
            <span id="subrespuestaD" class="absolute -bottom-50 -left-4 z-20 bg-white px-2 rounded-full border-black border-4 text-lg">D</span>
            RESPUESTA 4
          </button>
        </div>
      </div>
      
      <div class="row">
        <div class="grid relative left-1/2 transform -translate-x-1/2 grid-cols-2 gap-4 mb-4 p-4 rounded-2xl w-9/12" style="background-color: rgba(0, 0, 0, 0.25);">
          <!-- ACCIONES -->
          <button v-on:click="this.confirmAnswer()" class="flex justify-center items-center rounded-lg border-green-400 bg-green-100 border-4 p-2 drop-shadow-md antialiased font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
          </button>
          <button v-on:click="this.unselectAnswer()" class="flex justify-center items-center rounded-lg border-yellow-400 bg-yellow-100 border-4 p-2 drop-shadow-md antialiased font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </button>
        </div>
      </div>
      
      <div class="row">
        <div class="grid relative left-1/2 transform -translate-x-1/2 grid-cols-3 gap-4 mb-4 p-4 rounded-2xl w-9/12" style="background-color: rgba(0, 0, 0, 0.25);">
          <!-- COMODINES -->
          <button class="flex justify-center items-center rounded-lg border-rose-500 border-4 p-2 bg-white drop-shadow-md antialiased font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 align-middle" height="1.5em" viewBox="0 0 512 512"><path d="M459.1 52.4L442.6 6.5C440.7 2.6 436.5 0 432.1 0s-8.5 2.6-10.4 6.5L405.2 52.4l-46 16.8c-4.3 1.6-7.3 5.9-7.2 10.4c0 4.5 3 8.7 7.2 10.2l45.7 16.8 16.8 45.8c1.5 4.4 5.8 7.5 10.4 7.5s8.9-3.1 10.4-7.5l16.5-45.8 45.7-16.8c4.2-1.5 7.2-5.7 7.2-10.2c0-4.6-3-8.9-7.2-10.4L459.1 52.4zm-132.4 53c-12.5-12.5-32.8-12.5-45.3 0l-2.9 2.9C256.5 100.3 232.7 96 208 96C93.1 96 0 189.1 0 304S93.1 512 208 512s208-93.1 208-208c0-24.7-4.3-48.5-12.2-70.5l2.9-2.9c12.5-12.5 12.5-32.8 0-45.3l-80-80zM200 192c-57.4 0-104 46.6-104 104v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-75.1 60.9-136 136-136h8c8.8 0 16 7.2 16 16s-7.2 16-16 16h-8z"/></svg>
          </button>
          <button class="flex justify-center items-center rounded-lg border-rose-500 border-4 p-2 bg-white drop-shadow-md antialiased font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 align-middle" height="1.5em" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
          </button>
          <button class="flex justify-center items-center rounded-lg border-rose-500 border-4 p-2 bg-white drop-shadow-md antialiased font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 align-middle" height="1.5em" viewBox="0 0 448 512"><path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"/></svg>
          </button>
          <button class="flex justify-center items-center rounded-lg border-rose-500 border-4 p-2 bg-white drop-shadow-md antialiased font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 align-middle" height="1.5em" viewBox="0 0 512 512"><path d="M347.1 24.6c7.7-18.6 28-28.5 47.4-23.2l88 24C499.9 30.2 512 46 512 64c0 247.4-200.6 448-448 448c-18 0-33.8-12.1-38.6-29.5l-24-88c-5.3-19.4 4.6-39.7 23.2-47.4l96-40c16.3-6.8 35.2-2.1 46.3 11.6L207.3 368c70.4-33.3 127.4-90.3 160.7-160.7L318.7 167c-13.7-11.2-18.4-30-11.6-46.3l40-96z"/></svg>
          </button>
          <button v-on:click="this.confetti()" class="flex justify-center items-center rounded-lg border-4 border-indigo-500 p-2 bg-white drop-shadow-md antialiased font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 align-middle" height="1.5em" viewBox="0 0 512 512"><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 11 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>
          </button>
          <button class="flex justify-center items-center disabled rounded-lg border-4 border-indigo-500 p-2 bg-white drop-shadow-md antialiased font-bold">
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute lg:w-1/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 bottom-0 w-full animate__animated animate__fadeIn animate__slow animate__delay-2s">
    <div class="row">
      <div class="grid relative left-1/2 transform -translate-x-1/2 grid-cols-3 gap-4 mb-4 p-4 rounded-2xl w-11/12" style="background-color: rgba(0, 0, 0, 0.25);">
        <!-- RESPUESTAS -->
        <a href="/" class="flex justify-center items-center rounded-lg border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[4rem]">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
        </a>
        <a href="/stats" class="flex justify-center items-center rounded-lg border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[4rem]">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>
        </a>
        <a href="/config" class="flex justify-center items-center rounded-lg border-black border-4 p-2 bg-white drop-shadow-md antialiased font-bold min-h-[4rem]">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg> 
        </a>
      </div>
    </div>
  </div>
</template>

<style>
  .duration-4s {
    animation-duration: 4s;
  }
  .duration-2s {
    animation-duration: 2s;
  }
</style>

<script>
  import 'animate.css';

  export default {
    data() {
      return {
        "modal": false,
        "ws": null,
        "online": false,
        "lastSelected": null,
        "lastsubSelected": null,
        "confirmAnswerModal": false
			}
		},
    mounted() {
      this.connectWs()
    },
    methods: {
      selectAnswer(respuestaSeleccionada) {
        this.ws.send(respuestaSeleccionada)

        if (this.lastSelected != null) {
          this.lastSelected.classList.remove("border-yellow-600");
          this.lastSelected.classList.add("border-black");
        }
        if (this.lastsubSelected != null) {
          this.lastsubSelected.classList.remove("border-yellow-600");
          this.lastsubSelected.classList.add("border-black");
        }

        let _res = document.getElementById('respuesta'+respuestaSeleccionada)
        _res.classList.add("border-yellow-600");
        _res.classList.remove("border-black");
        
        let _subres = document.getElementById('subrespuesta'+respuestaSeleccionada)
        _subres.classList.add("border-yellow-600");
        _subres.classList.remove("border-black");

        this.lastSelected = _res
        this.lastsubSelected = _subres
      },

      unselectAnswer() {
        if (this.lastSelected != null) {
          this.lastSelected.classList.remove("border-yellow-600");
          this.lastSelected.classList.add("border-black");
        }
        if (this.lastsubSelected != null) {
          this.lastsubSelected.classList.remove("border-yellow-600");
          this.lastsubSelected.classList.add("border-black");
        }

        this.lastSelected = null
        this.lastsubSelected = null

        this.ws.send('unselect')
      },

      confetti() {
        this.ws.send('Confetti!')
      },

      checkWsStatus() {
        if (this.ws.readyState == WebSocket.CLOSED) {
          if (this.online) {
            this.online = !true
          }
        } else if (this.ws.readyState == WebSocket.OPEN) {
          if (!this.online) {
            this.online = true
          }
          this.ws.send('ping')
        }
      },

      async reconnectWs() {
        let reconnectSvg = document.getElementById('reconnectSvg')
        reconnectSvg.classList.add('animate-spin','duration-4s')
        this.connectWs()
      },

      async connectWs() {
        let LocalIP = window.location.hostname
        let ctx = this;
        this.ws = new WebSocket('ws://'+LocalIP+':9594')
 
        let keepAlive = setInterval(() => {
          // KEEP ALIVE
          if (ctx.ws.readyState == WebSocket.OPEN) {
            ctx.ws.send('ping')
          }
        }, 35000);

        this.ws.onmessage = (event) => {
          console.log(event.data);
        };

        this.ws.onopen = () => {
          try {
            ctx.ws.send("Im a controller");
            ctx.online = true
          } catch (error) {
            console.log(error)
          }
        };

        this.ws.onclose = () => {
          ctx.checkWsStatus()
          ctx.ws = null
          clearInterval(keepAlive)
        }
      },

      confirmAnswer() {
        this.confirmAnswerModal = true
      }
    }
  }
</script>