<template>
  <nav class="lhs">
    <div class="lhs-header"></div>
    <a href="ValidatePagekey.aspx?akey=E819C48E-579F-4BBC-82CC-69C1E570E5DE" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
        <v-icon class="item-icon">search</v-icon>
        <span class="item-label">Order Search</span>
      </div>
    </a>
    <a href="ValidatePagekey.aspx?akey=2F5B7A96-0A0B-4AED-B48C-7D96F5C9BD3C" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 1 }" @click="setActive(1)">
        <v-icon class="item-icon">domain</v-icon>
        <span class="item-label">Spectrum Dashboard</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=543AEEBF-D17F-42F5-ACE9-162F87860DE5"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 2 }" @click="setActive(2)">
        <v-icon class="item-icon">home</v-icon>
        <span class="item-label">Home</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=34E7BEA8-F305-4A90-86E2-86A3C609D9AE"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 3 }" @click="setActive(3)">
        <v-icon class="item-icon">dashboard</v-icon>
        <span class="item-label">Dashboard</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=E043B98E-B8A8-4426-8D4B-16F78F639CB7"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 4 }" @click="setActive(4)">
        <v-icon class="item-icon">store</v-icon>
        <span class="item-label">Retailer</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=274F806B-F958-4A96-8A3D-EC98FC10A285"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 5 }" @click="setActive(5)">
        <v-icon class="item-icon">star</v-icon>
        <span class="item-label">My Watchlist</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=322CC64C-2F4B-4BB3-9BB0-C4359D406BA8"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 6 }" @click="setActive(6)">
        <v-icon class="item-icon">video_library</v-icon>
        <span class="item-label">Training Videos</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=0B9409AB-FD78-4FCE-A66D-20251411631F"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 7 }" @click="setActive(7)">
        <v-icon class="item-icon">assignment_turned_in</v-icon>
        <span class="item-label">Orders</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=EDEEF446-FC23-4E2A-8579-C18CFBE9BB07"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 8 }" @click="setActive(8)">
        <v-icon class="item-icon">cast</v-icon>
        <span class="item-label">Marketing</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=D419C515-831A-4D3D-8430-5401E3E0EACF"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 9 }" @click="setActive(9)">
        <v-icon class="item-icon">store</v-icon>
        <span class="item-label">Retailers</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=C776A0F3-9A88-463F-B21D-90DBD3EA40FD"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 10 }" @click="setActive(10)">
        <v-icon class="item-icon">people</v-icon>
        <span class="item-label">SalesReps</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=407E8447-D586-4666-BB06-92D08863D0BB"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 11 }" @click="setActive(11)">
        <v-icon class="item-icon">bar_chart</v-icon>
        <span class="item-label">My Reports</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=608D4A1C-3173-42B8-9021-2BE8B8EE5757"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 12 }" @click="setActive(12)">
        <v-icon class="item-icon">build</v-icon>
        <span class="item-label">System</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=95945ED7-2F34-4B34-AEE8-7EF5CE3824F1"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 13 }" @click="setActive(13)">
        <v-icon class="item-icon">lock</v-icon>
        <span class="item-label">TPP Admin</span>
      </div>
    </a>
    <a
      href="https://173.82.28.90/Reports/ValidatePagekey.aspx?akey=01B74B12-7348-4CE6-ABCC-AD5893D979B7"
      class="lhs-item-link"
    >
      <div class="lhs-item" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
        <v-icon class="item-icon">settings</v-icon>
        <span class="item-label">Configuration</span>
      </div>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'lhs',
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

$lhs-background-color: #297fb8;
$lhs-text: rgba(255, 255, 255, 0.75);

.lhs {
  display: flex;
  flex-flow: column;
  align-items: center;
  a {
    text-decoration: none;
  }
  background-color: $lhs-background-color;
  font-weight: 500;
}

.lhs-header {
  height: 30px;
}

.lhs-item-link {
  width: 100%;
  padding: 0 10px;
}

.lhs-item {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  color: $lhs-text;
  .item-icon {
    color: $lhs-text;
    margin-right: 15px;
  }
}

.lhs-item:hover {
  color: $base-white;
  background-color: rgba(0, 0, 0, 0.1);
  .item-icon {
    color: $base-white;
  }
}
</style>
