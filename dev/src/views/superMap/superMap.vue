<template>
    <div class="superMap" fill jc>
        <div id="mapContainer" wd-xl ht-xl foo mt-xl>

        </div>
    </div>
</template>

<script>
export default {
    name: "superMap",
    mounted() {
        let s = document.createElement('script')
        s.src = 'http://www.supermapol.com/resources/api/libs/SuperMap.Include.js'
        document.body.appendChild(s)

        let url = "http://www.supermapol.com";
        let viewer = new SuperMap.Cloud.MapViewer(url,"mapContainer");
        viewer.previewMapById(493);
    }
}
</script>

<style scoped>

</style>