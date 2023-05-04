import { createMachine } from 'xstate'

export const videoPlayerMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgWXQGMALASwDswA6Ad3VIBcKoBiAZQFUBhLgUTbYBtAAwBdRCgD2sRqUnkJIAB6IAjABYA7FQCcANgDMAVnVaDe9UZ0AOIwBoQmREYPad51dc3CDN1QCYdAF8ghzQsXAISCmo6WXJWADEAQQBJABleABERcSQQZGlZeUUVBA03QxMzCytbBydy4Rcqcx1NTVcDbq8QsIxsfCIySiocMHQITDGJqZYABXTkgE1cxUKZJhL8su9hKj1hPU1j6z1-K30GtSN9nSNrbr0jf2tVTSNPvoKByOGYmaTabhTDMBbJDhsXhrfIbYoKHaIPYHI4nTRnC46K6ORA6d4HDrCbzqVTtVSeb4gv7RUbjIFUEFggBK-F4ABUYVJNnIEaAymcDFRrMLhP51FiPppVHprghLDoqJYtKpjP4ia8vqEfhEhjTqHSpgyBmDeAA5HJidZFLa85RI4QKrwnALCd6BQKy9QGaxUFXWUXCQOqZr6PSU366kb62bA9AAV1gkAWS1Wlth1p5pUQpkFFyD-v0r3a9hxCEC6ioJje6P8Fj07zDWqpkYBBtjCaTLKhHLTXPhWblXqoeddBfO1mLso6FeEXn8rz0j1r7XDOqiUcBhuQ8cTEBYZoteT7NoHOeHt1HDvHk9Lpj0leDJIemkCOksq8G69bMaoYHIEE7VkeyPAoM22Pl7X2Q5jlOc5LhlUsXArAx3m8AwzDfVwP2pDc21-f8k0WFZOVA7lwLtBBkWgtEMXg2VDH2cVOjON9F38E4Qi1chJAA+BYQjL9KCtMjbTKABaBDGjEsUqEDOT5PkjRsJbUY4iYBJhP7RE5X8WVqiFb0HQ6f0UOlZTBOoAAzehUEgTST202t-FkvENGMcVXmMWVgxaWxjhcCdMSscz-lpGN7MzRzDErNDXk6QMjFJejBS0PFDCxFCvCJEK9U3aY2wi8iyisO5LAMIlnnUCcDG8zRkJ8b1njVOr0Ry3Cf0ZDT0xEgcRV9Qy1SsFwLD0w4DnQ3w9Ay+sLja796W3DsIEK0TEFMmKfDi8rmiS0tukY9RXQanxEveOawvpP8AOW7qtIghAHnvKVjBMUVHnQ1RPSmoVPnUZ4zk+PRjk0TigiAA */
  id: "playerMachine",
  initial: "waiting",
  states: {
    waiting: {
      on: {
        SUCCESS: "ready",
        FAILED: "failed"
      }
    },
    failed: {},
    ready: {
      id: "readyMachine",
      initial: "ready",
      states: {
        ready: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["playVideo"]
            }
          }
        },
        playing: {
          on: {
            PAUSE: {
              target: "paused",
              actions: ["pauseVideo"]
            },
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            END: {
              target: "ended",
              actions: ["stopVideo"]
            }
          }
        },
        paused: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["playVideo"]
            },
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            END: {
              target: "ended",
              actions: ["stopVideo"]
            }
          }
        },
        ended: {
          on: {
            RESET: {
              target: "playing",
              actions: ["resetVideo"]
            },
            PLAY: {
              target: "playing",
              actions: ["resetVideo"]
            }
          }
        }
      }
    }
  }
});