<template>
    <el-container direction="vertical">
        <layout-nav-bar></layout-nav-bar>
        <el-main class="main" style="overflow: auto">
            <el-backtop target=".main" :visibility-height="200"/>
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    import LayoutNavBar from "@/module-frame/components/LayoutNavBar";
    export default {
        name: 'index',
        components: {
            LayoutNavBar
        },
        data() {
            return {
                activeIndex: "/meetings",
                showFooter: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.activeIndex = to.path
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.showFooter = (to.path === "/meetings");
            this.activeIndex = to.path;
            next();
        }

    }
</script>
<style scoped>
</style>
