<template>
  <ion-app>
    <router-view></router-view>
  </ion-app>
</template>

<script setup lang="ts">
// IonRouterOutlet has a bug, not rendering the pages correctly.
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
