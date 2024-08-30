<template>
  <qrcode-drop-zone
    ref="qrcodeDropZone"
    @detect="onDetect"
    @load="load"
    @error="logErrors"
    :url="url"
  >
  </qrcode-drop-zone>
</template>

<script>
import {
  QrcodeStream,
  QrcodeDropZone,
  QrcodeCapture,
  setZXingModuleOverrides,
} from "./vue-qrcode-reader.js";
export default {
  components: { QrcodeDropZone },

  data() {
    return {
      result: "",
      src: "",
      dragover: false,
    };
  },
  created() {
    //     let base64Str = "data:image/png;base64,iVBORw0KGgoA.....AAANSUhEUgAA";
    // let ba64 = base64Str.split(",")[1];
    // base64ToUrl(ba64);
  },
  methods: {
    base64ToUrl(base) {
      //需要手动去掉data:image/png;base64,
      //base64-->blob
      const byteCharacters = atob(base);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      //blob-->url
      let binaryData = [];
      binaryData.push(blob);
      let url = URL.createObjectURL(new Blob(binaryData));
      return url;
    },
    load(l,ri) {
      console.log("val----------", l,ri);
      l(ri('https://localhost:9001/2.jpg', ["qr_code"]))
    },
    onDetect(detectedCodes) {
      this.result = JSON.stringify(detectedCodes.map((code) => code.rawValue));
      console.log("this.result------------", detectedCodes);
    },
    logErrors(error) {
      if (error.name === "DropImageFetchError") {
        this.error = "Sorry, you can't load cross-origin images :/";
      } else if (error.name === "DropImageDecodeError") {
        this.error = "Ok, that's not an image. That can't be decoded.";
      } else {
        this.error = "Ups, what kind of error is this?! " + error.message;
      }
    },
    onDragOver(isDraggingOver) {
      this.dragover = isDraggingOver;
    },
  },
};
</script>