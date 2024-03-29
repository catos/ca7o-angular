# Ca7o

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## References & Tools
- Migrating to HttpClient: http://brianflove.com/2017/07/21/migrating-to-http-client/
- MEAN App Unplugged: https://github.com/blove/mean-material-reactive
- https://www.json-generator.com/

## TODO
- Consider merging projects: https://stackoverflow.com/a/42907043
- Merge user-edit and user-create into user-details
- Fix routerLinkActive on admin-submenu
- Fix filter on users
- Add Register User component
- Forgot password
- Authentication:
 - https://blog.angular-university.io/angular-jwt-authentication/
- Create user must check is email already exist!
- Notifications on user edit type required
- http://brianflove.com/2017/07/17/angular-delete-confirmation/
- Chat
 - https://github.com/avatsaev/kawachat2-client/blob/master/src/app/modules/chat/services/chat.service.ts
- Wesketch
 - http://teropa.info/blog/2016/12/12/graphics-in-angular-2.html
 - http://embed.plnkr.co/LFhOuepJrnPVlwUXmkUt/
 - https://github.com/catos/ca7o-wesketch-vue/blob/master/src/components/painter/Painter.vue
- Socket IO with RxJs: https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/
- WebSocketService
 - RPC vs. GameStateSync
 - Create minimal overhead emit to use for drawing-function


## Deploy
- git push heroku master
- Go to: https://ca7o.herokuapp.com/

### Deploy setup
- heroku login
- Add heroku remote as a remote in your current repository: `heroku git:remote -a ca7o`
- Check how many dynos are running: `heroku ps`
- Run app locally: `heroku local -p 1337`
- "postinstall": "ng build --aot --prod"

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
