<template>
  <div class="file-info">
    <div class="file-info-preview"></div>
    <div class="file-info-describe">
      <span class="file-info-describe-name">Some-long-file-name.png</span>
      <span class="file-info-describe-size">2,14 MB</span>
    </div>
    <v-icon class="file-info-remove" size="20" color="#ec9aa4">remove_circle</v-icon>
  </div>
</template>

<script>
export default {
  name: 'FileInfo',
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.file-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: $bright-grey;
  border-top: 1px solid #eeeeef;
  padding: 8px 5px;
  margin-top: 8px;
}

.file-info-preview {
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 4px;
  border: solid 1px #979797;
}

.file-info-describe {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 9px;
  justify-content: center;
}

.file-info-remove {
  align-self: center;
}

.file-info-describe-name {
  margin-bottom: 4px;
}
</style>
