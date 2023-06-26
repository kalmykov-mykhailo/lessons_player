<script setup lang="ts">
import { onMounted, reactive, computed, ref, ComputedRef, Ref } from 'vue';
import { fetchLessons } from './api';

interface Lesson {
  title: string;
  subtitle: string;
  video_url: string;
  video_time: number;
  description: string[];
}

interface disabledItem {
  [key: number]: boolean;
}

const formData = reactive<{
  lessonsList: Lesson[];
  activeIndexVideo: number;
  videoUserWatches: number;
  disabledList: disabledItem;
  popupWindow: boolean;
}>({
  lessonsList: [],
  activeIndexVideo: 0,
  videoUserWatches: 0,
  disabledList: {0: true},
  popupWindow: false
});
const video: Ref<HTMLVideoElement | null> = ref(null);
function resetDisableList() {
  formData.lessonsList.forEach((_, index: number) => {
    if (index === 0) {
      formData.disabledList[index] = true;
    } else {
      formData.disabledList[index] = false;
    }
  })
}

const mainVideo: ComputedRef<Lesson> = computed(() => formData.lessonsList[formData.activeIndexVideo]);

onMounted(async () => {
  formData.lessonsList = await fetchLessons();
  resetDisableList();
});


function changeIndex(e: Event) {
  const valueEl = (e.currentTarget as HTMLElement).getAttribute('value');
  formData.activeIndexVideo = Number(valueEl);
  formData.videoUserWatches = 0;
  formData.popupWindow = false;

  setTimeout(() => {
    if (video.value !== null) {
      video.value.play();
    }
  }, 300);
}

function nextTiltle(title:string) {
  const list = formData.lessonsList;
  let newTitle = 'Відкрити настпуний ';
  list.find((el, index) => {
    if (el.title === title) {
      if (!list[index + 1]) {
        return
      }
      newTitle +=  list[index + 1].title.toLowerCase() + ': ' + list[index + 1].subtitle;
      return
    }
  })

  return newTitle;
};

let timer: number;

function timerVideo() {
  formData.videoUserWatches++

  if (formData.videoUserWatches === mainVideo.value.video_time) {
    formData.lessonsList.forEach((el, index) => {
      if (el.title === mainVideo.value.title) {
        if (Object.keys(formData.disabledList).length - 1 === index) {
          formData.popupWindow = false;
          return;
        }
        formData.popupWindow = true;
        formData.disabledList[index + 1] = true;
      }
    });
  }
}

function playVideo() {
  timer = setInterval(() => {
    timerVideo();
  }, 980);
}

function pauseVideo() {
  clearInterval(timer);
}


</script>
<template>
  <div class="container">
    <div class="player">
      <div class="player-wrapper" v-if="mainVideo">
        <div class="video-container">
          <video 
            class="video" 
            controls 
            :src="mainVideo.video_url" 
            @play="playVideo"
            @pause="pauseVideo" 
            ref="video"
            :id="mainVideo.title" 
            :videoTime="mainVideo.video_time"
          >
          </video>

          <div 
            class="player__popup" 
            :class="{
            'player__popup--active': formData.popupWindow
            }"
            :value="+formData.activeIndexVideo+1"
            @click="changeIndex"
          >
            {{ nextTiltle(mainVideo.title) }}
          </div>
        </div>

        <div class="descrition" v-if="mainVideo">
          <p v-for="(text, index) in mainVideo.description" :key="index">
            {{ text }}
          </p>
        </div>
      </div>

      <ul class="lesson-list">
        <template  v-for="(lesson, index) in formData.lessonsList" :key="index">
          <input
            class="lesson-item__input"
            type="radio"
            name="lesson"
            :checked="index === 0"
            :id="lesson.title"
            :value="index"
            @input="changeIndex"
            v-model="formData.activeIndexVideo"
            :disabled="formData.disabledList[index] === false"
          >
          <label
            class="lesson-item__label"
            :class="{
              'lesson-item__label--disabled': formData.disabledList[index] === false
            }"
            :for="lesson.title">
            <span>{{ ` ${lesson.title} ${lesson.subtitle}` }}</span>

        </label>
      </template>
      </ul>
    </div>

  </div>
</template>

<style lang="scss">
@import './scss/reset';

.player {
  &__popup {
    opacity: 0;
    position: absolute;
    padding: 5px;
    font-size: 14px;
    bottom: 10%;
    right: 0;
    z-index: -1;
    height: 100px;
    width: 30%;
    background-color: greenyellow;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &--active {
        opacity: 1;
        z-index: 2;
        cursor: pointer;
      }
  }
}

.player-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.container {
  padding: 20px 20px 20px 20px;
  display: flex;
  flex-direction: column;
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56%;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.player {
  display: flex;
  gap: 40px;
  justify-content: space-between;
}

.lesson-list {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 5px;
}

.lesson-item {
  margin: 0;
  

  
  &__label {
    cursor: pointer;
    padding: 10px 10px 10px 10px;
    background-color: orange;
    width: 100%;
    // max-width: 100px;
      &.lesson-item__label--disabled {
        opacity: 0.4;
        cursor: default;

        &:hover {
          background-color: orange; 
        }
      }

      &:hover {
        background-color: blueviolet;

        .lesson-item__input:disabled & {
          background-color: orange;

        }
      }
  }

  &__input {
    display: none;

    &:disabled .lesson-item__label:hover {
      background-color: orange;
    }

    &:checked + .lesson-item__label {
      background-color: red;
      z-index: 200000000;
    }

    &:checked {
      background-color: yellowgreen;
    }
  }
}

</style>
