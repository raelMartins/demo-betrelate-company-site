// import Papa from 'papaparse';
import { toast } from 'vue3-toastify';
import { ImagePickerType } from './custom_types';

//using this to format the time a post was made, relative to now
export const formatDate = (date: string, type: string = `long`) => {
  const timeZoneOffset = new Date(date).getTimezoneOffset() * 60000;
  const properDate = Date.parse(date) + timeZoneOffset;

  const timeDiff = Date.now() - properDate;
  const TDSecs = Math.floor(timeDiff / 1000);
  const TDMins = Math.floor(timeDiff / (1000 * 60));
  const TDHrs = Math.floor(timeDiff / (1000 * 60 * 60));
  const TDDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const TDWks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
  const TDMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));

  if (TDSecs < 1) {
    return type === `short` ? `now` : 'just now';
  } else if (TDSecs === 1) {
    return type === `short` ? `1s` : 'a second ago';
  } else if (TDSecs < 60) {
    return type === `short` ? TDSecs + `s` : TDSecs + ' seconds ago';
  } else if (TDMins === 1) {
    return type === `short` ? `1m` : 'a minute ago';
  } else if (TDMins < 60) {
    return type === `short` ? TDMins + `m` : TDMins + ' minutes ago';
  } else if (TDHrs === 1) {
    return type === `short` ? `1h` : 'an hour ago';
  } else if (TDHrs < 24) {
    return type === `short` ? TDHrs + `h` : TDHrs + ' hours ago';
  } else if (TDDays === 1) {
    return type === `short` ? `1d` : 'a day ago';
  } else if (TDDays < 7) {
    return type === `short` ? TDDays + `d` : TDDays + ' days ago';
  } else if (TDWks === 1) {
    return type === `short` ? `1wk` : 'a week ago';
  } else if (TDWks < 5) {
    return type === `short` ? TDWks + `wks` : TDWks + ' weeks ago';
  } else if (TDMonths === 1) {
    return type === `short` ? `1mnth` : 'a month ago';
  } else if (TDMonths < 12) {
    return type === `short` ? TDMonths + `mnths` : TDMonths + ' months ago';
  } else {
    return type === `short` ? `>1yr` : new Date(properDate).toDateString();
  }
};
//using this to format the time a post was made, relative to now
export const formatChatDate = (date: string, dateFromDatabase: string) => {
  const timeZoneOffset = new Date(date).getTimezoneOffset() * 60000;
  const properDate = Date.parse(date) + timeZoneOffset;
  const timeDifference = Date.now() - properDate;
  const timeDifferenceInDays = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  );

  const todaysDay = new Date(Date.now()).getDay();
  const chatDay = new Date(properDate).getDay();

  if (timeDifferenceInDays < 1) {
    if (todaysDay === chatDay) {
      return dateFromDatabase;
    } else {
      return `yesterday`;
    }
  } else if (timeDifferenceInDays < 3 && todaysDay === chatDay + 1) {
    return 'yesterday';
  } else if (date) {
    return new Date(date).toLocaleDateString();
  } else {
    return `now`;
  }
};

// this will return an object with th selected image file
// and an image src you can use to previ\
export const uploadImageWithPreview = (
  getImage = (obj: ImagePickerType) => {}
) => {
  let input: any = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    let files = Array.from(input.files);
    const newImage: any = files[0];
    if (newImage) {
      const reader = new FileReader();

      reader.onload = function () {
        const img: any = new Image();
        img.src = this.result;
        let height = '';
        let width = '';
        img.onload = function () {
          console.log(this.width + 'x' + this.height);
          height = this.height;
          width = this.width;
          getImage({
            imageFile: newImage,
            imagePreview: this.src,
            dimensions: {
              height,
              width
            }
          });
        };
      };

      reader.readAsDataURL(newImage);
    } else {
      getImage({
        imageFile: null,
        imagePreview: '',
        dimensions: {
          height: '',
          width: ''
        }
      });
    }
  };
  input.click();
};

//this dynamically adjusts the height of a
//textarea field when typing
export const dynamicTextareaHeight = (e: any) => {
  const el = e.target;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
  return e.target.value;
};

// a basic error catcher for wrapping functions
// containing ajax requests
export function catchAsyncError(fn: any) {
  return async function (e: any) {
    //using a normal function rather than an arrow function
    //in order to have access to
    //this particular functions arguments
    await fn(...arguments).catch((err: any) => {
      console.error(err);
      console.error(err.message);
      console.log(err.response);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      e && e.target ? (e.target.disabled = false) : null;
    });
  };
}
// This method catches errors in the getServerSideProps aspect
// of a page, taking them to the login page if they're logged out
// or to the site landing page if it is a server error
export function catchServerSideError(err: any) {
  console.log(err);
  if (
    err.message === 'loggedout' ||
    (err.response && err.response.status === 401)
  ) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  } else if (
    err.code === 404 ||
    err.code === 403 ||
    (err.response && err.response.status === 403) ||
    (err.response && err.response.status === 404)
  ) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  } else {
    return {
      redirect: {
        destination: '/error',
        permanent: false
      }
    };
  }
}

//this is to enable desktop notifications
export function notifyMe(notification: any) {
  if (!window.Notification) {
    console.log('Browser does not support notifications.');
  } else {
    // check if permission is already granted
    if (Notification.permission === 'granted') {
      // show notification here
      const notify = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon
          ? notification.icon
          : '/images/betrelate-icon.png'
      });
    } else {
      // request permission from user
      Notification.requestPermission()
        .then(function (permission) {
          if (permission === 'granted') {
            // show notification here
            const notify = new Notification(notification.title, {
              body: notification.body,
              icon: '/images/betrelate-icon.png'
            });
          } else {
            console.log('User blocked notifications.');
          }
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  }
}

export const simpleDateFormat = (date: string, slash: boolean = false) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return slash
    ? `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`
    : `${day < 10 ? `0${day}` : day}-${
        month < 10 ? `0${month}` : month
      }-${year}`;
};

export const monthFirstDateFormat = (date: string, slash: boolean = false) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return slash
    ? `${month < 10 ? `0${month}` : month}/${
        day < 10 ? `0${day}` : day
      }/${year}`
    : `${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }-${year}`;
};

export const yearFirstDateFormat = (date: string, slash: boolean = false) => {
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return slash
    ? `${year}/${month < 10 ? `0${month}` : month}/${
        day < 10 ? `0${day}` : day
      }`
    : `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`;
};
