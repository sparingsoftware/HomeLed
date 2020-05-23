

![home_led_logo](https://github.com/SparingSoftware/HomeLed/blob/master/images/home_led_logo.png)

# Home LED
 **React Native + Arduino + LED**


![home_led_video](https://github.com/SparingSoftware/HomeLed/blob/master/images/home_led.gif)


## Scheme
![home_led_video](https://github.com/SparingSoftware/HomeLed/blob/master/images/scheme.png)

## Install and run
1. Setup iOS/Android SDK
2. Setup RN CLI
3. Install dependencies `yarn install`
4. Eventually install ios dependencies `cd ios && pod install`
5. Run `yarn ios` / `yarn android`

You can find all details here: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

## TODO
   

 - Handle onDisconnect
 - Splashscreen
 - Option to change favourites colors order
 - Enable multiple connection with device (Arduino set as Central / Master or enable multiple connections as Peripheral (Slave))
 - Refactor BLE communication / protocol (handle fast color change)
 - Add and remove item animation Android
 - Picker animation (scroll) when color is selected from favourites
 - Debug mode (without physical BLE)
 - Claps detector to turn on/off lights
 - Audio volume detect and auto adjust brightness
