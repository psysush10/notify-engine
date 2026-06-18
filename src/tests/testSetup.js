import app from "../server.js";

let server;

export const startTestServer =
  async () => {

    return new Promise(
      resolve => {

        server =
          app.listen(
            3001,
            () => {

              console.log(
                "Test server started"
              );

              resolve();

            }
          );

      }
    );

  };

export const stopTestServer =
  async () => {

    return new Promise(
      resolve => {

        server.close(
          () => {

            console.log(
              "Test server stopped"
            );

            resolve();

          }
        );

      }
    );

  };