> React Native

- Their are two ways to build react native apps
  - [x] Expo CLI (set of tools and framework on top of react native hiding a lot of complexity)
  - [x] React Native CLI (for people with prior experience in mobile development, as this approach offers lot of extra flexibilty and customize or tweak native components one can eject from expo and use the underlying React native cli)

> Complete Blueprint

- [x] 🎢 Initiate

  - [x] make sure node --v 12 or higher
  - [x] node -v
  - [x] npm i -g expo-cli
  - [x] expo-cli -V
  - [x] install expo client from playstore , by this the app we built can be tested on a physical device.
  - [x] vscode extensions to make your life easier
  - [x] React Native tools (for debugging react native apps)
  - [x] React-Native/React/Redux snippets (code snippets for code generation)
  - [x] Prettier code formatter
    - [x] make sure to tick the formatonsave in preference->settings so that preetier makes the code pretty each time you save your code.
  - [x] Material icon theme (pretty icons for project)

- [x] 🎪 React native app boilerplate

  - [x] expo init TakeMyStuff
  - [x] choosing workflow for building app

    - [x] go with blank managed workflow
    - [x] managed or bared workflows, managed the expo takes care of all the complexity behind the scenes i.e we dont see the anderiod and ios dir's and we have pure javascript project, On the other hand the bare workflow a barebone react native project with ios and anderiod dir's

                    assets
                    // all the images,audiofiles,videos goes here

                    App.js
                    // basic react-native component

**Inside App.js**

- [x] **View is like div in the web world**
- [x] Text is used to display text on screen
- [x] **unlike web dev where we have html,body ,p,anchor tags their are predefined components provided by react-native that we use like StyleSheet ,Text,View**
- [x] **by default react native uses functional components that returns jsx expressions**
- [x] **If we build/comile this app for ios then View-> UIView , for anderiod then View is mapped with AnderiodView**

**Serving the app**

                    cd TakeMyStuff
                    npm start

- **metro bundler bundles all the js code into one single file**

- [x] 🎆 Running on IOS simulator

  - install xcode in app store
  - xcode->preferences->locations-> install latest command line tools
  - xcode->opendevelopertool->simulator
  - to change sizes and configs go to file->opendevice->ios13.4 for various ios devices
  - go to terminal and press i
  - a pop message shows up inside of simulator open in Expo-> open
  - go to vs code change the text to hello world and hit save the changes are reflected on the ios simulator.
  - inside of simulator press ctrl+d then cmd+d to manually reload if automatice refresh wont work or navigate the expo client

- [x] 🎇 Running on Android virtual device/emulator

  - [x] install android studio
  - [x] select standard setup
  - [x] configure -> sdk manager
  - [x] under sdk platforms latest anderiod version will already be installed
  - [x] under sdk tools their must be anderiod sdk build tools,anderiod emulator,anderiod sdk platform tools and intel emulator accelerator

  - [x] 💡 additional configs for macos or linux users

    - [x] go to docs.expo.io
    - [x] add anderiod sdk locations to path using ~/.bash_profile or ~//bash_rc

      - [x] add line export ANDROID_SDK=/Users/myuser/Library/Android/sdk
      - [x] use vim or your personal vs code to configure .bash_profile
      - [x] go to android studio->configure->sdk manager copy path andriod sdk location

                  code ~/.bash_profile

                  # at the end
                  export ANDROID_SDK=android sdk location path

- [x] ✨ Setting up Andriod Virtual Device

  - [x] open android studio configure->avd manager
  - [x] create virtual device choose pixel3a with play store installed hit next
  - [x] install latest os image i.e Q Download second item in the list hit next after image is installed on emulator.
  - [x] give device a name and hit finish
  - [x] run it by clicking play button under actions
  - [x] go back to terminal and press a make sure the anderiod emulator is up and running before you press a in terminal
  - [x] open developer menu by ctrl+m inside anderiod virtual device

- [x] ✔ RECOMMENDED 🐱‍🚀 Running on physical device or via web bundler in web

  - [x] as the simulator is just a simulation not the real device.
  - [x] expo from app store or google play
  - [x] while the the metro bundler is running point the phone(with expo from playstore) to the qr code at the web make sure phone and the metro bundler are connected to same wireless network.
  - [x] bring up developer menu by shaking device

- [x] ✔ Debugging react-native applications (Logging)

  - [x] the good old console.log statements , though the console.log have negative impacts in production use only development and testing make sure to remove console.log statements
  - [x] debug with chrom dev tools, shake the phone or ctrl+m on windows for anderiod emulator
  - [x] debug remote js
  - [x] localhost:19001/debugger-ui/ -> sources-> dont pause an exception -> pause on caught exception , this will stop execution and chrome will highlight the line that is casuing the exception.
  - [x] make sure to close the debug remote js once you are done debugging inside physical device

- [ ] 🙌 Publishing
