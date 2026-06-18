import { saveLog } from "../sqlite/logRepository.js";

export const logger = {

  info(message, metadata = {}) {

    console.log(

      JSON.stringify({

        level: "INFO",
        timestamp:
          new Date().toISOString(),
        message,
        metadata

      })

    );

    saveLog(

      "INFO",

      message,

      metadata

    );

  },

  warn(message, metadata = {}) {

    console.warn(

      JSON.stringify({

        level: "WARN",
        timestamp:
          new Date().toISOString(),
        message,
        metadata

      })

    );

    saveLog(
      "WARN",
      message,
      metadata
    );

  },

  error(message, metadata = {}) {

    console.error(

      JSON.stringify({

        level: "ERROR",
        timestamp:
          new Date().toISOString(),
        message,
        metadata

      })

    );

    saveLog(
      "ERROR",
      message,
      metadata
    );

  },

  audit(message, metadata = {}) {

    console.log(

      JSON.stringify({

        level: "AUDIT",
        timestamp:
          new Date().toISOString(),
        message,
        metadata

      })

    );

    saveLog(
      "AUDIT",
      message,
      metadata
    );

  }

};