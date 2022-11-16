<template>
  <div id="app">
      <header class="headbar">Playground-vue2-element / {{ $router.currentRoute.name }}</header>
      <aside class="sidebar">
        <ul>
            <li v-for="route in routes">
                <router-link :to="route.path" :class="{ current: $router.currentRoute.name === route.name }">
                    {{ route.name }}
                </router-link>
            </li>
        </ul>
      </aside>
      <main class="content">
          <router-view/>
      </main>
  </div>
</template>
<script>
import routes from '@/router/routes'
export default {
    data(){
        return {
            routes
        }
    }
}
</script>
<style>
html,body{
    height: 100vh;
    width: 100vw;
    padding: 0!important;
    margin: 0;
}
</style>
<style lang="scss" scoped>
#app{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;padding: 0;
    height: 100vh;
    width: 100vw;
    --width: 200px;
    @media (max-width: 800px) {
        --width:80px;
    }
    header.headbar{
        height: 60px;
        color: white;
        background-color: rgba(0,0,0,.7);
        display: flex;align-items: center;justify-content: center;
    }
    aside.sidebar{
        width: var(--width);height: calc(100% - 60px);
        background-color: rgba(0,0,0,.6);
        overflow-x: hidden;
        overflow-y: auto;
        ul{
            padding: 0;
            li{
                padding: 5px 0 5px 40px;
                list-style: none;
                &:hover{
                    background-color: rgba(0,0,0,.1);
                }
                a{
                    display: inline-block;
                    width: 100%;height: 100%;
                    color: white;letter-spacing: 2px;
                    text-decoration: none;
                    &.current{
                        color: skyblue;
                    }
                }
            }
        }
        @media (max-width: 800px) {
            ul{
                li{
                    padding: 3px 0;
                    a{
                        font-size: 12px;
                    }
                }
            }
        }
    }
    main.content{
        position: absolute;top: 60px;left: var(--width);
        width: calc(100% - var(--width));
        height: calc(100% - 60px);
        overflow: hidden;
    }
}

</style>
