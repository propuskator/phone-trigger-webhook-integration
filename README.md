# Phone Trigger Webhook

## Project run (development)

1. Install dependencies:

    ```
    npm ci
    ```

2. Configure project via envs or use defaults if you run in standard development environment

3. Run project from source code (for development)

    ```
    npm run nodemon
    ```

4. Run project (for production running inside docker container)

    ```
    npm start
    ```

5. Use [ngrok](https://ngrok.com/download) service to provide global domain:

    ```
    ## in first terminal
    npm run nodemon

    ## in second teerminal
    ngrok http 51609

    ## output

    ngrok by @inconshreveable                                                                                                                                                                                                                     (Ctrl+C to quit)

    Session Status                online
    Account                       (Plan: Free)
    Version                       2.3.40
    Region                        United States (us)
    Web Interface                 http://127.0.0.1:4040
    Forwarding                    http://d57c-176-105-25-72.ngrok.io -> http://localhost:51609
    Forwarding                    https://d57c-176-105-25-72.ngrok.io -> http://localhost:51609

    Connections                   ttl     opn     rt1     rt5     p50     p90
                                0       0       0.00    0.00    0.00    0.00
    ```

6. Then use endpoint from `ngrok` it in Zadarma API integration configuration: https://my.zadarma.com/marketplace/ (choose Notifications). In case of production setup use your domain here.

    ![Zadarma API Notifications](./pics/Zadarma%20API%20notifications.png)
## Configuration

- `APP_PORT` - port on which express server will be listening
- `AUTH_LOGIN` - authentication login of `phone-trigger-webhook` to trigger it when call notification received
- `AUTH_PASSWORD` - authentication password of `phone-trigger-webhook` to trigger it when call notification received
- `HANDLER_BASE_URL` - URL where `phone-trigger-handler` is running (by default correct values if they ran in same docker-compose)
- `HANDLER_BASE_API_PREFIX` - API prefix of `phone-trigger-handler`
- `HANDLER_BASE_ENDPOINT` - endpoint of `phone-trigger-handler` which handles phone calls
- `PHONE_TRIGGER_NUMBERS` - numbers which are processed, other will be ignored

## Description

This service is integration with Zadarma platform to handle phone calls to phone numbers to use this event as trigger for some change in platform. This change could be configured by user from mobile app. Service itself is transparent proxy which receives calls from Zadarma platform and transfer them to handler. API is described in Swagger. 