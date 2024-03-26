<template>
   <div>Test.vue</div>
</template>


<script setup>


const  fai=ref(2222)


onMounted(()=>{
  const attrs=useAttrs()
  console.log(666,attrs);
  const instance=getCurrentInstance()
  console.log("我进入了2",fai);
  console.log("install",instance);
})

</script>


<style scoped lang="scss">

</style>
