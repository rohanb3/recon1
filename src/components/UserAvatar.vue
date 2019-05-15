<template>
  <div class="avatar-container" :style="{ width: size, minWidth: size, height: size }">
    <template v-if="backgroundColor">
      <div :style="{ backgroundColor }" class="avatar" />
      <span :style="{ color: initialsColor, fontSize: initialsSize }" class="initials">
        {{ initials }}
      </span> </template
    >{{ avatarUrl }}
    <img v-if="avatarUrl" :src="avatarUrl" class="avatar" alt="user" />
  </div>
</template>

<script>
import { getInitials } from '@/services/utils';

const AVATAR_BACKGROUND_COLOR = '#f8c37a';
const AVATAR_INITIALS_COLOR = '#b4681f';

export default {
  name: 'UserAvatar',
  props: {
    user: {
      type: Object,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: AVATAR_BACKGROUND_COLOR,
    },
    initialsColor: {
      type: String,
      default: AVATAR_INITIALS_COLOR,
    },
    size: {
      type: String,
      default: '36px',
    },
    initialsSize: {
      type: String,
      default: '14px',
    },
  },
  computed: {
    firstName() {
      return this.user.givenName || '';
    },
    lastName() {
      return this.user.surname || '';
    },
    initials() {
      if (!this.avatarUrl) {
        return getInitials(this.firstName, this.lastName);
      }
      return '';
    },
    avatarUrl() {
      return this.user.avatarLink || null;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.avatar {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.initials {
  position: absolute;
  font-weight: bold;
}
</style>
