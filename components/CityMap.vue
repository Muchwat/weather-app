<template>
  <GMap
    ref="gMap"
    language="en"
    :center="{ lat: locations[0].lat, lng: locations[0].lng }"
    :options="{ fullscreenControl: true, mapTypeControl: false }"
    :zoom="6"
    style="width: 100%; height: 100%;"
    :key="cKey"
  >
    <GMapMarker
      v-for="location in locations"
      :key="location.id"
      :position="{ lat: location.lat, lng: location.lng }"
      :options="{
        icon: location === currentLocation ? pins.selected : pins.notSelected
      }"
      @click="currentLocation = location"
    >
      <GMapInfoWindow :options="{ maxWidth: 200 }">
        <code> lat: {{ location.lat }}, lng: {{ location.lng }} </code>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>
<script>
export default {
  data() {
    return {
      cKey: Math.random(),
      currentLocation: {},
      locations: [
        {
          lat: 44.933076,
          lng: 15.629058
        }
      ],
      pins: {
        selected:
          "data:image/png;base64,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",
        notSelected:
          "data:image/png;base64,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"
      }
    };
  },
  computed: {
    coordinates() {
      return this.$store.state.coordinates;
    }
  },
  watch: {
    coordinates(newCoord, oldCoord) {
      this.locations = [
        {
          lat: newCoord.lat,
          lng: newCoord.lon
        }
      ];
      this.cKey = Math.random();
    }
  }
};
</script>