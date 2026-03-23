void main() {
  vec2 p = uv();
  
  //Tracks for each sine
  vec4 lows_sin = vec4 (0);
  vec4 midLows_sin = vec4 (0);
  vec4 midHighs_sin = vec4 (0);
  vec4 highs_sin = vec4 (0);
  
  float frequency = 1.;
  float gain = .2;
  
  //MODIFIERS
  float wavelength = 5.;
  float offset = 0.;
  float thickness = .015;
  float dir1 = p.x; //dir1 = p.x for horiontal, p.y for vertical
  float dir2 = p.y;
 
  float lows = dir2;
  float midLows = dir2;
  float midHighs = dir2;
  float highs = dir2;
 
  for( float i = 0.; i < 1.; i++ ) { 
     //Defined in this format:
    //sin( (p.x * wavelength) + (time * frequency) ) * gain;
    
    lows += sin( (dir1 * bands[0] * wavelength) + (time * i) ) * bands[0] * gain; 
    lows_sin += vec4( 0, 0, abs( thickness / (lows + (offset * 3.) )) , 0);
 
    midLows += sin( (dir1 * bands[1] * wavelength) + (time * i) ) * bands[1] * gain; 
     midLows_sin += vec4(0, abs( thickness / (midLows + (offset * 0.) )) , 0 , 0);
 
     midHighs += sin( (dir1 * bands[2] * wavelength) + (time * i) ) * bands[2] * gain; 
     midHighs_sin += vec4( abs( thickness / (midHighs - (offset * 3.) )) , 0 , 0 , 0);

     highs += sin( (dir1 * bands[3] * wavelength) + (time  * i) ) * bands[3] * gain; 
     highs_sin += vec4( abs( thickness / (highs - (offset * 0.) ) ) );
     
 }
 
  gl_FragColor = vec4( lows_sin + midLows_sin + midHighs_sin + highs_sin );
 
}

//TIME MARKERS//
/*
0:00: off = .0, thick = .015, count = 1

0:37: off = .2, thick = .###, count = #

0:48: off = .#, thick = .005, count = #

0:59: off = .#, thick = .###, count = 4

1:09: off = .0, thick = .###, count = #
1:09: off = .1, thick = .###, count = #
1:09: off = .15, thick = .###, count = #

1:20: off = .0, thick = .###, count = #

1:22: wavelength = 15.;
1:22: wavelength = 115.;
1:22: wavelength = 5.;

1:31: off = .#, thick = .###, count = 1



*/
