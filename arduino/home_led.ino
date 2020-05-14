/*
    HOME LED v0.1

    Works as perhiperal (server)

*/

#include <FastLED.h>


#define NUM_PIXELS 50

#define LED_PIN 4

CRGB leds[NUM_PIXELS];


//
// Color format: ${r}-${g}-${b}-${a}-
// e.g. 112-3-150-20
//


int readNum() {
  char val = '_';
      
  String txt = ""; 
  
  while(val != '-' && Serial.available()) {
    if (val != '_') {
      txt += val;
    }
  
    // read the incoming byte
    val = Serial.read();
    
    //slow looping to allow buffer to fill with next character
    delay(2);
  }

  return txt.toInt();
}

//
// MAIN
//

void setup() {
  // power-up safety delay
  delay( 3000 ); 
  
  // initial the Serial
  Serial.begin(115200);  

  FastLED.addLeds<WS2811, LED_PIN, RGB>(leds, NUM_PIXELS);
}

//

void loop() {
  // new colors
  if (Serial.available())  { 

    Serial.println("NEW COLOR");

    int r = readNum();
    int g = readNum();
    int b = readNum();
    int a = readNum();

    // fill all pixels with color
    for (int i=0; i<NUM_PIXELS; i++) {
      leds[i].r = r;
      leds[i].g = b;
      leds[i].b = g;
    }

    FastLED.show();

    // say what you got:
    Serial.print("R:");
    Serial.println(r, DEC);
    Serial.print("G:");
    Serial.println(g, DEC);
    Serial.print("B:");
    Serial.println(b, DEC);
    Serial.print("a:");
    Serial.println(a, DEC);
    Serial.println(); 
  }
}
