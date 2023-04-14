<script setup lang="ts">
import { NotificationType } from '../../utils/custom_types';
const show = useState('showNotifs');
const loading = useState('loadingNotifs');
const notifications: any = useState('allNotifications');

const token = useCookie('betrelatecompanytoken').value;

const close = () => {
  show.value = false;
};

const viewNotification = catchAsyncError(async (notif: NotificationType) => {
  try {
    loading.value = true;
    const res = await markNotificationAsRead(token, notif.id);
    console.log(res);
    if (notif.type === 'advert') {
      location.assign(`/adverts/${notif.entityId}`);
    } else if (notif.type === 'wallet') {
      location.assign(`/transaction-history`);
    }
  } catch (err) {
    loading.value = false;
    throw err;
  }
});
</script>

<template>
  <div
    class="notif_sidebar_container"
    id="notif_sidebar_container"
    :style="
      !show
        ? { zIndex: -10, transitionDelay: '.6s' }
        : { zIndex: 10, transitionDelay: '0s' }
    "
  >
    <section
      class="notif_sidebar_overlay"
      @click="close"
      id="notif_sidebar_overlay"
      :style="
        !show
          ? { backgroundColor: 'transparent', backdropFilter: 'blur(0rem)' }
          : {}
      "
    ></section>
    <section
      class="notif_sidebar"
      id="notif_sidebar"
      :style="!show ? { width: '0rem' } : {}"
    >
      <header>
        <div class="header_text">
          <h1>
            <span @click="close" class="close_button">
              <i class="pi pi-angle-left"></i
            ></span>
            Notifications
          </h1>
        </div>
        <hr />
      </header>
      <div class="all_notifications">
        <div
          class="no_notifications"
          :style="notifications.length === 0 ? 'display: none' : ''"
          v-if="notifications.length === 0"
        >
          <span>No notifications</span>
        </div>
        <div v-else>
          <h4>Recent</h4>
          <ul v-for="notif in notifications">
            <li
              :class="`notification ${!notif.read ? `unseen` : ''}`"
              @click="() => viewNotification(notif)"
            >
              <div class="read_receipt">
                <span></span>
              </div>
              <div class="notif_details">
                <div class="notif_title">{{ notif.content }}</div>
                <div class="notif_description">
                  {{ notif.description }}
                </div>
              </div>
              <div class="datetime">
                <span>{{ formatDate(notif.createdAt, `short`) }} ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '~/assets/styles/mixins.module.scss';

.notif_sidebar_container {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  .notif_sidebar_overlay {
    flex: 4;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.3rem);
    transition: 0.5s;
  }
  .notif_sidebar {
    // flex: 1;
    width: 55rem;
    background-color: white;
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    header {
      .header_text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.4rem;
        h1 {
          font-weight: 500;
          font-size: 2.4rem;
          line-height: 180%;
          margin-bottom: 0rem;
          display: flex;
          gap: 2rem;
          align-items: center;
          padding: 2rem 4rem 0rem;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.8rem;
            background-color: #f5ebff;
            border-radius: 0.7rem;
            color: var(--primary-color);
            cursor: pointer;
            opacity: 0.4;
            .pi {
              font-size: 2.4rem;
            }
          }
        }
      }
      hr {
        height: 0.1rem;
        background-color: #ede7f2;
        border: none;
        outline: none;
        border-radius: 0.4rem;
        margin: 2rem 0rem;
      }
    }
    .all_notifications {
      font-size: 1.6rem;
      line-height: 1.9rem;
      font-weight: 500;
      flex: 1;
      overflow: auto;
      @include scrollbar;
      position: relative;
      .no_notifications {
        text-align: center;
        font-size: 1.6rem;
        color: var(--primary-color);
        padding: 1.5rem;
      }
      h4 {
        font-weight: 600;
        color: #000000;
        padding: 2rem 4rem;
      }
      hr {
        background-color: #dadada;
        border: none;
        margin: 0rem;
        height: 0.1rem;
      }
      .loading_notifs {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
      }
      ul {
        margin: 0rem;
        padding: 0rem;
        list-style-type: none;
        .notification {
          padding: 2rem 4rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0.2rem 0rem;
          cursor: pointer;
          .read_receipt {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            background-color: #e1d7e9;
          }

          .notif_details {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            .notif_title {
              font-weight: 600;
            }
            .notif_description {
              color: #89878a;
              font-weight: 500;
            }
          }
          .datetime {
            color: #999999;
          }
        }
        .unseen {
          background-color: #f9f2ff;
          .read_receipt {
            background-color: var(--primary-color);
          }
        }
      }
    }
  }
}
</style>
